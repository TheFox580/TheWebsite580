import type { DiscordMessage } from "$lib/interfaces/funny_points_leaderboard/DiscordMessage";

export interface Point {
  username: string;
  context: string;
  date: Date;
  diff: number;
  message: DiscordMessage;
}
