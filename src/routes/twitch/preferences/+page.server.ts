import type { PageServerLoad } from "./$types";
import { providerMap } from "../../../auth";
import { ADMIN_TWITCH_IDS, AUTH_TWITCH_SUB_ID, MONGO_DB_URL } from "$env/static/private";
import { MongoClient, ServerApiVersion } from "mongodb";
import type { Stream } from "$lib/interfaces/schedule/Schedule";
import type { ChatterPreferences } from "$lib/interfaces/twitch/ChatterPreferences";

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth();

  let preferences: ChatterPreferences = {
    id: "0",
    background_color: "#000000",
    message_color: "#ffffff",
    message_font: "",
    tts_voice: {
      en: "",
      fr: ""
    }
};

  if (!session) {
    return {
      providerMap
   };
  }


  if (!session?.provider === "twitch-sub") {
    return {
      session,
      providerMap
    };
  }

  let is_subbed = 0;

  for (const channel_id of ADMIN_TWITCH_IDS.split(" ")) {
    const check_sub = await fetch("https://api.twitch.tv/helix/subscriptions/user?broadcaster_id=" + channel_id + "&user_id=" + session?.providerAccountId, {
      headers: {
        "Authorization": "Bearer " + session.access_token,
        "Client-Id": AUTH_TWITCH_SUB_ID
      }
    });
    if (check_sub.ok) {
      is_subbed = parseInt((await check_sub.json()).data[0].tier[0]);

      if (is_subbed >= 3) break;
    }
  }

  const client = new MongoClient(MONGO_DB_URL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    await client.connect();

    const db = client.db("twitch_api");

    const preferences_collection = db.collection<ChatterPreferences>("chatter_preferences");

    const preferences_cursor = preferences_collection.find({ user_id: session?.providerAccountId }).limit(1);

    for await (const chatter_preferences of preferences_cursor) {
      console.log(chatter_preferences);
      preferences = (({ _id, ...object }) => object)(chatter_preferences);
      break;
    }

  } finally {
    await client.close();
    }

  return { preferences, is_subbed };
};
