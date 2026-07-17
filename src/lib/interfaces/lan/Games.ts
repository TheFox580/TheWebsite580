import type { PlayerStanding } from "./Players";

export interface Game {
  game_id: number
  name: string;
  game_mode: string;
  max_time: number | null;
  max_games: number | null;
}

export interface Games {
  all: Game[];
  seeding: Game[];
  finale: Game[];
}

export interface GameResult {
  is_seeding: boolean;
  is_loser_final: boolean;
  is_winner_final: boolean;
  game_id: number;
  player_standings: PlayerStanding[];
}
