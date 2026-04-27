import type { ObjectId } from "mongodb";

export interface Score {
  name: string;
  score: number;
}

export interface Scores {
  season: number;
  scores: Score[];
}

export interface ScoresDB extends Scores {
  _id: ObjectId;
}
