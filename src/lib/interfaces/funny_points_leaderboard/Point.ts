import type { DiscordMessage } from "$lib/interfaces/funny_points_leaderboard/DiscordMessage";
import type { ObjectId } from "mongodb";

export interface Point {
  username: string;
  context: string;
  date: Date;
  diff: number;
  message: DiscordMessage;
}

export interface PointDB {
  _id: ObjectId;
  username: string;
  context: string;
  date: Date;
  diff: number;
  message: DiscordMessage;
}
