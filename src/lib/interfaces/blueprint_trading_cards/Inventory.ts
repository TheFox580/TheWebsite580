import type { ObjectId } from "mongodb";
import type { OwnedCard } from "./Card";

export interface Inventory {
  user_id: string;
  name: string;
  cards: OwnedCard[];
}

export interface InventoryDB extends Inventory {
  _id: ObjectId;
}
