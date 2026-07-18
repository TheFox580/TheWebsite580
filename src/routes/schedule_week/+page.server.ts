
import type { PageServerLoad } from "./$types";
import { MONGO_DB_URL } from "$env/static/private";
import { MongoClient, ServerApiVersion } from "mongodb";
import type { WeekSchedule } from "$lib/interfaces/schedule/Schedule";

export const load: PageServerLoad = async () => {

  const weeks: WeekSchedule[] = [];

  let client = new MongoClient(MONGO_DB_URL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    await client.connect();

    const db = client.db("twitch_api");

    const schedule_collection = db.collection<WeekSchedule>("schedule_week");

    const week_schedule = schedule_collection.find({start_week : {$lte: new Date()}, end_week: {$gte: new Date()}}).sort({start_week: 1});

    for await (const week_db of week_schedule) {
      const week = (({ _id, ...object }) => object)(week_db);
      weeks.push(week);
    }

  } finally {
    await client.close();
  }

  return { weeks };
};
