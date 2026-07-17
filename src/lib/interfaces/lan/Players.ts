export interface Player {
  id: number;
  name: string;
}

export interface FullPlayer {
  id: number;
  name: string;
  points: number;
  wins: number;
}


export interface PlayerStanding {
  player_id: number;
  won: boolean;
  points_diff: number;
}
