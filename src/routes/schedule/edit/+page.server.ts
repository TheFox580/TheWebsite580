import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Stream } from "$lib/interfaces/schedule/Schedule";
import { MongoClient, ServerApiVersion } from "mongodb";
import { MONGO_DB_URL, ALLOWED_EDIT_SCHEDULE } from "$env/static/private";

export const load: PageServerLoad = async ({ params, locals }) => {
  const session = await locals.auth();

  const allowedIDs: string[] = ALLOWED_EDIT_SCHEDULE.split(" ");

  if (!session?.providerAccountId) {
    redirect(303, "/schedule");
  }

  if (!allowedIDs.includes(session?.providerAccountId)) {
    redirect(303, "/schedule");
  }
  const streams: Stream[] = [];

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

    const schedule_collection = db.collection<Stream>("schedule");

    const streams_db = schedule_collection.find({}).sort({time: 1});

    for await (const stream_db of streams_db) {
      const stream = (({ _id, ...object }) => object)(stream_db);
      streams.push(stream);
    }

  } finally {
    await client.close();
  }

  return {
    session,
    streams
  };
};
