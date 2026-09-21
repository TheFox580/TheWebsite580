<script lang="ts">
    import type { SteamGame } from "$lib/interfaces/games/Steam";
    import { getTimePassed } from "$lib/functions/utils/dateStuff";

    const { game = $bindable(), steam_id }: { game: SteamGame, steam_id: string } = $props();

    const GAME_DESCRIPTOR = {
        "1": "Some Nudity or Sexual Content",
        "2": "Frequent Violence or Gore",
        "3": "Adult Only Sexual Content",
        "4": "Frequent Nudity or Sexual Content",
        "5": "General Mature Content"
    };

    let last_played: string = $state("Never");
    let last_time_played: number = $state(0);

    if (game.rtime_last_played !== 0) last_time_played = game.rtime_last_played;

    if (last_time_played){
        const last_played_date = new Date(last_time_played*1000);
        const now = new Date();

        const diff = Math.floor((now.getTime()-last_played_date.getTime())/1000);
        last_played = `${getTimePassed(diff)} ago`;
    }

    let content_warning: undefined | string = $state(undefined);

    if (game.content_descriptorids){
        content_warning = "This game contains:";
        for (const warning of game.content_descriptorids){
            content_warning += " " + GAME_DESCRIPTOR[warning] + ",";
        }
        content_warning = content_warning.slice(0, -1);
    }

</script>

<a
    href={"https://steamcommunity.com/profiles/" + steam_id + "/stats/" + game.appid}
    target="_blank"
    class="w-full hover:border-neutral-400 hover:bg-neutral-600 hover:cursor-pointer my-2 rounded-2xl bg-neutral-800 border-neutral-600 border-3">
    <div class="w-full h-30 flex flex-row items-center justify-center p-2">
        <div class="w-full h-full flex flex-col items-start justify-evenly">
            <p class="font-bold">{game.name}</p>
            <p>Last played: {last_played}</p>
            <p>Time played: {game.playtime_forever ? getTimePassed(game.playtime_forever*60) : "0 seconds"}</p>
            <p>Time played in the last 2 weeks: {game.playtime_2weeks ? getTimePassed(game.playtime_2weeks*60) : "0 seconds"}</p>
        </div>
        {#if game.img_icon_url}
            <img src="https://media.steampowered.com/steamcommunity/public/images/apps/{game.appid}/{game.img_icon_url}.jpg" alt="" class="rounded-lg mx-1 h-1/2 mx-1" draggable="false">
        {/if}
    </div>
</a>
