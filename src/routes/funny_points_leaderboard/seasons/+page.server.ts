import type { SeasonDate } from "$lib/interfaces/funny_points_leaderboard/Date";
import type { PageServerLoad } from "./$types";
import { MONGO_DB_URL } from "$env/static/private";
import { MongoClient, ServerApiVersion } from "mongodb";

export const load: PageServerLoad = async () => {
  let seasons: SeasonDate[] = [];

  let client = new MongoClient(MONGO_DB_URL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    await client.connect();

    const db = client.db("funny_points_leaderboard");

    const date_collection = db.collection<SeasonDate>("dates");

    const all_dates = date_collection.find({});

    for await (const date_found of all_dates) {
      seasons.push((({ _id, ...object }) => object)(date_found));
    }
  } finally {
    await client.close();
  }

  return { seasons };
};
