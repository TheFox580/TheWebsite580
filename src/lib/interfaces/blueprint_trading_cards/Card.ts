import type { ObjectId, UUID } from "mongodb";

export interface Card {
  id: number;
  name: string;
  file_name: string;
}

export interface CardDB extends Card {
  _id: ObjectId;
}

export interface OwnedCard {
  card_id: number;
  card_uuid: UUID;
}
