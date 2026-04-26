import { getSeasons } from "$lib/functions/funny_points_leaderboard/GetSeasons";
import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
  const seasons = getSeasons();

  return { seasons };
};
