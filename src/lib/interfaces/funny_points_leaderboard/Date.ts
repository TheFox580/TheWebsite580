import type { ObjectId } from "mongodb";

export interface SeasonDate {
  season: number;
  start_time: Date;
  end_time: Date;
}
export interface SeasonDateDB extends SeasonDate {
  _id: ObjectId;
}
