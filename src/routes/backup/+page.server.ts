import {
  STEAM_WEB_API_KEY,
  NOXCREW_API,
  AUTH_DISCORD_ID, AUTH_DISCORD_SECRET,
  ALLOWED_EDIT_SCHEDULE, AUTH_TWITCH_SCHEDULE_ID, AUTH_TWITCH_SCHEDULE_SECRET,
  MCSR_RANKED_API,
  AUTH_TWITCH_BOT_ID, AUTH_TWITCH_BOT_SECRET,
  AUTH_TWITCH_ID, AUTH_TWITCH_SECRET,
  AUTH_SECRET,
  MONGO_DB_URL
} from "$env/static/private"
import { redirect } from "@sveltejs/kit";
import { MongoClient, ServerApiVersion } from "mongodb";

export const load: PageServerLoad = async () => {

  const data = {
    STEAM_WEB_API_KEY: STEAM_WEB_API_KEY,
    NOXCREW_API: NOXCREW_API,
    AUTH_DISCORD_ID: AUTH_DISCORD_ID,
    AUTH_DISCORD_SECRET: AUTH_DISCORD_SECRET,
    ALLOWED_EDIT_SCHEDULE: ALLOWED_EDIT_SCHEDULE,
    AUTH_TWITCH_SCHEDULE_ID: AUTH_TWITCH_SCHEDULE_ID,
    AUTH_TWITCH_SCHEDULE_SECRET: AUTH_TWITCH_SCHEDULE_SECRET,
    MCSR_RANKED_API: MCSR_RANKED_API,
    AUTH_TWITCH_BOT_ID: AUTH_TWITCH_BOT_ID,
    AUTH_TWITCH_BOT_SECRET: AUTH_TWITCH_BOT_SECRET,
    AUTH_TWITCH_ID: AUTH_TWITCH_ID,
    AUTH_TWITCH_SECRET: AUTH_TWITCH_SECRET,
    AUTH_SECRET: AUTH_SECRET,
    MONGO_DB_URL: MONGO_DB_URL,
  }

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

        const cached_collection = db.collection("backup");

      await cached_collection.insertOne(data);

    } finally {
        await client.close();
    }

  redirect(304, "/");
};
