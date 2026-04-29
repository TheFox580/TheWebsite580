import { redirect } from "@sveltejs/kit";
import { MongoClient, ServerApiVersion } from "mongodb";
import type {
  Inventory,
  InventoryDB,
} from "$lib/interfaces/blueprint_trading_cards/Inventory";
import type {
  Card,
  CardDB,
} from "$lib/interfaces/blueprint_trading_cards/Card";
import { MONGO_DB_URL } from "$env/static/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth();

  if (!session?.user?.id) {
    redirect(303, "/blueprint_trading_cards");
  }

  const name = session.user.name ? session.user.name : "Unknown";

  const user_id = session.providerAccountId;

  let inv: Inventory = { user_id, name, cards: [] };
  let cards: Card[] = [];

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

    const cards_collection = db.collection<CardDB>("cards");

    const cards_result = await cards_collection
      .find<CardDB>({})
      .sort({ id: 1 })
      .toArray();

    if (cards_result.length === 0) {
      console.log("No cards found.");
    } else {
      for (let elm of cards_result) {
        let card = (({ _id, ...object }) => object)(elm);
        cards.push(card);
      }
    }

    const inv_collection = db.collection<Inventory>("inventories");

    const inv_result = await inv_collection.findOne<InventoryDB>({
      user_id,
    });

    if (!inv_result) {
      console.log(`No inventories found for ${user_id}. Creating one.`);
      await inv_collection.insertOne({
        user_id,
        name,
        cards: [],
      });
    } else {
      inv = structuredClone((({ _id, ...object }) => object)(inv_result));
    }
  } finally {
    client.close();
  }

  return {
    inv,
    cards,
  };
};
