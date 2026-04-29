import { providerMap } from "../../../auth";
import { MongoClient, ServerApiVersion } from "mongodb";
import { MONGO_DB_URL } from "$env/static/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth();

  let res = { created: false };

  if (session?.user?.id) {
    const user_id = session.providerAccountId;

    let client = new MongoClient(MONGO_DB_URL, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    try {
      client.connect();

      const db = client.db("blueprint_trading_cards");

      const streamer_collection = db.collection("streamer_accounts");

      const streamer_find = await streamer_collection.findOne({ id: user_id });

      if (streamer_find !== null) {
        res.created = true;
      } else {
        await streamer_collection.insertOne({
          id: user_id,
          access_token: session.access_token,
          refresh_token: session.refresh_token,
        });
        res.created = true;
      }
    } finally {
      client.close();
    }
  }

  return {
    session,
    providerMap,
    res: res,
  };
};
