import type { Season } from "$lib/interfaces/funny_points_leaderboard/Season";

function getSeasons(): Season[] {
  return [
    { id: 1, name: "Season 1", url_name: "season_1" },
    { id: 2, name: "Season 2", url_name: "season_2" },
  ];
}

export function getSeason(id: number): Season {
  return getSeasons().filter((season) => season.id === id)[0];
}
