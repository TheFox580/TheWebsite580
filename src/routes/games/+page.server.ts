import type { PageServerLoad } from "./$types";
import { MONGO_DB_URL, STEAM_WEB_API_KEY } from "$env/static/private";
import { MongoClient, ServerApiVersion } from "mongodb";
import type { SteamDB, SteamGame } from "$lib/interfaces/games/Steam";

export const load: PageServerLoad = async () => {

    let cached: SteamDB = {};

    let client = new MongoClient(MONGO_DB_URL, {
        serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        },
    });
    try {
        await client.connect();

        const db = client.db("cache");

        const cached_collection = db.collection<SteamDB>("steam");

        let cached_date = new Date();
        cached_date.setTime(cached_date.getTime() - (86400 * 1000));

        const cached_data_db = cached_collection.find({time: {$gte: cached_date}}).limit(1);

        for await (const cached_data of cached_data_db) {
            cached = (({ _id, ...object }) => object)(cached_data);
        }

    } finally {
        await client.close();
    }

    if (Object.keys(cached).length === 0) {
        const steam_id = "76561198363204630";
        const steam_api_req = await fetch("https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" + STEAM_WEB_API_KEY + "&steamid=" + steam_id + "&include_appinfo=true&include_played_free_games=true");
        if (!steam_api_req.ok) {
            return { cached };
        }

        const steam_api_res = await steam_api_req.json();

        cached = { time: new Date(), info: steam_api_res };

        try {
            await client.connect();

            const db = client.db("cache");

            const cached_collection = db.collection<SteamDB>("steam");

            await cached_collection.insertOne(cached);
        } finally {
            await client.close();
        }

    }

    return { cached };
};
