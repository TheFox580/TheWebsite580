import type { ObjectId } from "mongodb";

export interface SeasonDate {
  season: number;
  start_time: Date;
  end_time: Date;
}
export interface SeasonDateDB {
  _id: ObjectId;
  season: number;
  start_time: Date;
  end_time: Date;
}
