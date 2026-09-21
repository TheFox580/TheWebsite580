<script lang="ts">
    import type { SteamGame } from "$lib/interfaces/games/Steam";
    import SteamGames from "$lib/components/games/SteamGames.svelte";
    import type { PageData } from "./$types";

    const { data } = $props<{
        data: PageData;
    }>();

    let default_games: SteamGame[] = $derived(data.cached.info.games);
    let games: SteamGame[] = $state(default_games);
    let selected_sort: "steam_id" | "name" | "playtime" | "last_played" = $state("last_played");
    let searching_game: string = $state("");

    const total_time_played = (() => {
        let time_played = 0;

        for (const game of games){
            time_played += game.playtime_forever;
        }

        return time_played;
    })()

    const two_weeks_time_played = (() => {
        let time_played = 0;

        for (const game of games){
            time_played += game.playtime_2weeks ?? 0;
        }

        return time_played;
    })()

    function sortGames(){
        switch (selected_sort){
            case "steam_id": {
                games = default_games.sort((a, b) => parseInt(a.appid) - parseInt(b.appid));
                break;
            }
            case "name": {
                games = default_games.sort((a, b) => a.name.localeCompare(b.name));
                break;
            }
            case "playtime": {
                games = default_games.sort((a, b) => b.playtime_forever - a.playtime_forever);
                break;
            }
            case "last_played": {
                games = default_games.sort((a, b) => b.rtime_last_played - a.rtime_last_played);
                break;
            }
        }

        games = default_games.filter((game) => game.name.toLowerCase().startsWith(searching_game.toLowerCase()));
    }

    let total_playtime_title = "";
    if (total_time_played / 60 / 24 >= 1){
        total_playtime_title += `${Math.floor(total_time_played / 60 / 24)} day`;
        if (total_time_played / 60 / 24 > 1) total_playtime_title += "s, ";
        else total_playtime_title += ", ";
    }
    if (total_time_played / 60 % 24 >= 1){
        total_playtime_title += `${Math.floor(total_time_played / 60) % 24} hour`;
        if (total_time_played / 60 % 24 > 1) total_playtime_title += "s, ";
        else total_playtime_title += ", ";
    }
    total_playtime_title += `${total_time_played % 60} minute`;
    if (total_time_played % 60 > 1) total_playtime_title += "s ";
    else total_playtime_title += " ";

    total_playtime_title += "played";

    let two_weeks_playtime_title = "";
    if (two_weeks_time_played / 60 / 24 >= 1){
        two_weeks_playtime_title += `${Math.floor(two_weeks_time_played / 60 / 24)} day`;
        if (two_weeks_time_played / 60 / 24 > 1) two_weeks_playtime_title += "s, ";
        else two_weeks_playtime_title += ", ";
    }
    if (two_weeks_time_played / 60 % 24 >= 1){
        two_weeks_playtime_title += `${Math.floor(two_weeks_time_played / 60) % 24} hour`;
        if (two_weeks_time_played / 60 % 24 > 1) two_weeks_playtime_title += "s, ";
        else two_weeks_playtime_title += ", ";
    }
    two_weeks_playtime_title += `${two_weeks_time_played % 60} minute`;
    if (two_weeks_time_played % 60 > 1) two_weeks_playtime_title += "s ";
    else two_weeks_playtime_title += " ";

    two_weeks_playtime_title += "played in the last 2 weeks";

    sortGames();
</script>

<div class="w-full h-full bg-black flex flex-col items-center justify-center">

    <div class="h-50 w-full text-white flex flex-col items-center justify-center">
        <p class="text-5xl font-bold">TheFox580's Steam Library</p>
        <p class="text-3xl">{total_playtime_title}</p>
        <p class="text-2xl">{two_weeks_playtime_title}</p>
    </div>

    <div class="w-225 text-white flex items-center justify-evenly my-2">
        <div class="w-1/2 flex items-center justify-center">
            <label for="sort_game_list" class="text-center text-2xl mx-2"
                >Sort game by: </label
            >
            <select
                bind:value={selected_sort}
                name="sort_game_list"
                id="sort_game_list"
                class="text-center text-xl border-2 border-white w-40 rounded-full mx-2"
                onchange={() => sortGames()}
            >
                <option id="sort_steam_id" value="steam_id">Steam ID</option>
                <option id="sort_name" value="name">Name</option>
                <option id="sort_playtime" value="playtime">Play Time</option>
                <option id="sort_last_played" value="last_played">Last Played</option>
            </select>
        </div>
        <div class="w-1/2 flex items-center justify-center">
            <label for="search_game" class="text-center text-2xl mx-2"
                >Search game: </label
            >
            <input
                bind:value={searching_game}
                name="search_game"
                id="search_game"
                class="text-center text-xl border-2 border-white w-60 rounded-full mx-2"
                oninput={() => sortGames()}
                placeholder="Type a game here"
                />
        </div>
    </div>
    <SteamGames bind:gamesList={games}/>
</div>


<svelte:head>
    <style>
        html{
            background-color: black;
        }
    </style>
</svelte:head>
