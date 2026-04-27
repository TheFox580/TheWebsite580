import type { ObjectId, UUID } from "mongodb";

export interface Card {
  id: number;
  name: string;
}

export interface CardDB extends Card {
  _id: ObjectId;
}

export interface OwnedCard extends Card {
  card_uuid: UUID;
}
