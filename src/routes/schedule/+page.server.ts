
import type { PageServerLoad } from "./$types";
import { MONGO_DB_URL } from "$env/static/private";
import { MongoClient, ServerApiVersion } from "mongodb";
import type { DaySchedule } from "$lib/interfaces/schedule/Schedule";

export const load: PageServerLoad = async () => {

  const old_streams: DaySchedule[] = [];
  const current_streams: DaySchedule[] = [];
  const next_streams: DaySchedule[] = [];

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

    const schedule_collection = db.collection<DaySchedule>("schedule");

    const old_streams_db = schedule_collection.find({time: {$lte: new Date()}}).sort({time: 1});

    for await (const old_stream_db of old_streams_db) {
      const old_stream = (({ _id, ...object }) => object)(old_stream_db);
      if (old_stream.time.getTime() + old_stream.estimated_length * 60 * 1000 < new Date().getTime()) {
        if (old_streams.length >= 3) old_streams.shift(); //Only get the last 3 streams
        old_streams.push(old_stream);
      }
      else current_streams.push(old_stream);
    }

    const next_streams_db = schedule_collection.find({time: {$gt: new Date()}}).sort({time: 1});

    for await (const next_stream_db of next_streams_db) {
      const next_stream = (({ _id, ...object }) => object)(next_stream_db);
      next_streams.push(next_stream);
    }

  } finally {
    await client.close();
  }

  return { old_streams, current_streams, next_streams };
};
