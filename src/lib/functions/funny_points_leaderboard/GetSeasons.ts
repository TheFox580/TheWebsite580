import type { Season } from "$lib/interfaces/funny_points_leaderboard/Season";

export function getSeasons(): Season[] {
  return [{ id: 1, name: "Season 1", url_name: "season_1" }];
}
