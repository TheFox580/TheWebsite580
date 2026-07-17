<script lang="ts">
    import Wheel from "$lib/components/lan/Wheel.svelte"
    import { getAllPlayersInfos } from "$lib/functions/lan/getPlayerInfos";
    import { getScoresForGame } from "$lib/functions/lan/getGameInfos"
    import type { Game, GameResult, Games } from "$lib/interfaces/lan/Games";
    import type { Player } from "$lib/interfaces/lan/Players";

    let menu: string = $state("Scores")

    const players: Player[] = [
      {
        id: 1,
        name: "Ash",
      },
      {
        id: 2,
        name: "Alex",
      },
      {
        id: 3,
        name: "Yann",
      },
    ]

    const games_sorted: Games = {
      all: [
          {game_id: 1, name: "Portal 2", game_mode: "Finir le plus de maps de la communauté créées récemment.", max_time: 60, max_games: null},
          {game_id: 2, name: "Worms W.M.D.", game_mode: "Le plus de points l'emporte (Win = 5pts, Kill = 1pt, Ver en vie a la fin de la partie = 1pt/ver).", max_time: null, max_games: 3},
          {game_id: 3, name: "Stick Fight: The Game", game_mode: "Le plus de maps gagné l'emporte.", max_time: null, max_games: 67},
          {game_id: 4, name: "Hollow Knight", game_mode: "Bingo.", max_time: 60, max_games: null},
          {game_id: 5, name: "Uno Infinity", game_mode: "On joue jusqu'a ce qu'il n'y ait plus qu'un joueur en jeu.", max_time: 120, max_games: null},
          {game_id: 6, name: "The Stanley Parable: Ultra Deluxe", game_mode: "Most Unique Endings en LOCKOUT.", max_time: 60, max_games: null},
      ],
      seeding: [{game_id: 7, name: "Talking Point", game_mode: "Moyenne des points en jeu.", max_time: null, max_games: 3}],
      finale: [{game_id: 8, name: "Jeu Mystère", game_mode: "???", max_time: null, max_games: 5}]
    }

    let games: Game[] = []

    for (const value of Object.values(games_sorted)){
      value.forEach(game => games.push(game))
    }

    const game_results: GameResult[] = [
      /*
      Example

      {
        game_id: 1,
        is_seeding: true,
        is_loser_final: false,
        is_winner_final: false,
        player_standings: [
          {player_id: 1, points_diff: 2, won: false},
          {player_id: 2, points_diff: 4, won: true},
          {player_id: 3, points_diff: 1, won: false},
        ]
        },

      */
    ];

</script>

<svelte:head>
    <link rel="stylesheet" href="/styles/default.css" />
    <title>LAN 2026 IRL</title>
</svelte:head>

<div class="w-screen h-screen">
    <div class="w-full h-1/10 flex items-center justify-center">
        <h1 class="text-6xl text-white">La LAN de fou, Edition 2026</h1>
    </div>
    <div class="w-full h-1/10 flex items-center justify-center flex-row">
        <button class="text-2xl text-white cursor-pointer p-2 bg-blue-700 rounded-3xl" onclick={() => {
          if (menu === "Scores"){
            menu = "Roue";
          } else {
            menu = "Scores"
          }
        }}>Changer de menu</button>
        <h2 class="text-2xl text-white ml-3">Menu actuel: {menu}</h2>
    </div>
    {#if menu === "Scores"}
        <div class="w-full h-auto flex flex-col items-center mt-10">
            {#if game_results.length > 0}
                <div class="w-full h-auto flex items-center flex-col mb-10">
                    <h2 class="text-5xl mb-3">Scores Généraux :</h2>
                    {#each getAllPlayersInfos(players, game_results) as player, index}
                        <h5 class="text-2xl mt-1">{index+1 === 1 ? "🥇" : (index+1 === 2 ? "🥈" : (index+1 === 3 ? "🥉" : ""))} {index+1}. {player.name}: {player.points} point{player.points != 1 ? "s" : ""} ({player.wins} victoire{player.wins != 1 ? "s" : ""})</h5>
                    {/each}
                </div>
                <div class="w-full h-auto flex flex-col items-center">
                    {#each game_results as game_result, index}
                        <div class="w-full h-auto flex flex-col items-center mb-10">
                            <h3 class="text-4xl mb-3">Jeu {index+1} : {games.find((game) => game.game_id === game_result.game_id)?.name} ({game_result.is_seeding ? "Seeding" : (game_result.is_loser_final ? "Finale perdante" : "Finale g agante")})</h3>
                            <h4 class="text-3xl mb-3">Mode de jeu: {games.find((game) => game.game_id === game_result.game_id)?.game_mode}</h4>
                            {#each getScoresForGame(players, game_result) as player, index}
                                <h5 class="text-2xl mt-1">{index+1 === 1 ? "🥇" : (index+1 === 2 ? "🥈" : (index+1 === 3 ? "🥉" : ""))} {index+1}. {player.name}: <span style="color: {player.points > 0 ? 'lime' : (player.points < 0 ? 'red' : 'orange')}">{player.points} point{player.points != 1 ? "s" : ""}</span></h5>
                            {/each}
                        </div>
                    {/each}

                </div>
            {:else}
                <h2 class="text-5xl">En attente du premier jeu</h2>
            {/if}
        </div>
    {:else if menu === "Roue"}
        <div class="w-full h-8/10">
            <Wheel></Wheel>
        </div>
    {/if}
</div>
