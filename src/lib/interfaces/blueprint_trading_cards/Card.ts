import type { ObjectId, UUID } from "mongodb";

export interface Card {
  file_name: string;
  id: number;
  name: string;
  stats: {
    health: number;
    attack: number;
    defense: number;
    speed: number;
  };
  description: string;
}

export interface CardDB extends Card {
  _id: ObjectId;
}

export interface OwnedCard {
  card_id: number;
  card_uuid: UUID;
}
