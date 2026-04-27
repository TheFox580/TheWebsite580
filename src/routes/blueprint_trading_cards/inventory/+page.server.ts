import { redirect } from "@sveltejs/kit";
import { MongoClient, ServerApiVersion } from "mongodb";
import type {
  Inventory,
  InventoryDB,
} from "$lib/interfaces/blueprint_trading_cards/Inventory";
import {
  MONGO_DB_URL,
  AUTH_TWITCH_ID,
  AUTH_TWITCH_SECRET,
} from "$env/static/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth();

  if (!session?.user?.id) {
    redirect(303, "/blueprint_trading_cards");
  }

  const name = session.user.name ? session.user.name : "Unknown";

  const twitchTokenRequest = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${AUTH_TWITCH_ID}&client_secret=${AUTH_TWITCH_SECRET}&grant_type=client_credentials`,
    {
      method: "POST",
    },
  );
  const twitchTokenResponse = await twitchTokenRequest.json();

  const twitchUserRequest = await fetch(
    `https://api.twitch.tv/helix/users?login=${name}`,
    {
      headers: {
        Authorization: `Bearer ${twitchTokenResponse.access_token}`,
        "Client-Id": AUTH_TWITCH_ID,
      },
    },
  );

  const twitchUserResponse = await twitchUserRequest.json();

  const user_id = twitchUserResponse.data[0].id
    ? twitchUserResponse.data[0].id
    : "0";

  let inv: Inventory = { user_id, name, cards: [] };

  let client = new MongoClient(MONGO_DB_URL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  try {
    await client.connect();

    const db = client.db("blueprint_trading_cards");
    const collection = db.collection<Inventory>("inventories");

    const result = await collection.findOne<InventoryDB>({
      user_id,
    });

    if (!result) {
      console.log(`No inventories found for ${user_id}. Creating one.`);
      await collection.insertOne({
        user_id,
        name,
        cards: [],
      });
    } else {
      inv = (({ _id, ...object }) => object)(result);
    }
  } finally {
    client.close();
  }

  return {
    inv,
  };
};
