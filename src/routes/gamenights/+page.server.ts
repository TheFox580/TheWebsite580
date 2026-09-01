import type { PageServerLoad } from "./$types";
import { providerMap } from "../../auth";
import { MongoClient, ServerApiVersion } from "mongodb";
import type { Game } from "$lib/interfaces/gamenights/Game";
import { MONGO_DB_URL } from "$env/static/private";
import type { DiscordUser } from "$lib/interfaces/gamenights/User";

export const load: PageServerLoad = async ({ params, locals }) => {
    const session = await locals.auth();

    let signed_up: boolean = false;
    let signed_up_amount: number = 0;
    let game: Game = {};

    if (session?.provider === "discord") {

        const client = new MongoClient(MONGO_DB_URL, {
            serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
            },
        });

        try {
            await client.connect();

            const db = client.db("gamenights");

            const games_collection = db.collection<Game>("games");

            const games_db = games_collection.find({ time: { $gte: new Date().getTime() / 1000 } }).sort({time: 1}).limit(1);

            for await (const game_db of games_db) {
                game = (({ _id, ...object }) => object)(game_db);
                break;
            }

            const signed_up_collection = db.collection<DiscordUser>("signed_up");

            const all_signed_up_db = signed_up_collection.find()

            for await (const _ of all_signed_up_db) {
                signed_up_amount++;
            }

            const signed_up_db = signed_up_collection.find({id: session?.providerAccountId});

            for await (const signed_up_user of signed_up_db) {
                signed_up = (({ _id, ...object }) => object)(signed_up_user);
                break;
            }

        } finally {
            await client.close();
        }
    }

  return {
      session,
      providerMap,
      signed_up,
      signed_up_amount,
      game
  };
};
