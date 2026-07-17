import type { GameResult } from "$lib/interfaces/lan/Games";
import type { FullPlayer, Player } from "$lib/interfaces/lan/Players";

export function getAllPlayersInfos(players: Player[], game_results: GameResult[]): FullPlayer[]{
  let full_players: FullPlayer[] = [];

  for (const player of players) {
    full_players.push(getPlayerInfos(player, game_results));
  }

  full_players.sort(sortPlayer);

  console.log(full_players);

  return full_players;
}


function sortPlayer(a: FullPlayer, b: FullPlayer): number {
  if (a.points > b.points) return -1;
  else if (a.points < b.points) return 1;
  else if (a.wins > b.wins) return -1;
  else if (a.wins < b.wins) return 1;
  return 0;
}

export function getPlayerInfos(player: Player, game_results: GameResult[]): FullPlayer{

  let full_player_data: FullPlayer = {
    id: player.id,
    name: player.name,
    points: 0,
    wins: 0,
  }
  for (const game_result of game_results) {
    const player_result = game_result.player_standings.filter((result) => result.player_id === player.id);
    for (const game of player_result) {
      if (game_result.is_seeding) {
        full_player_data.points += game.points_diff;
      }
      full_player_data.wins += game.won ? 1 : 0;
    }
  }

  return full_player_data;
}
