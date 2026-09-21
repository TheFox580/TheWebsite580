<script lang="ts">
    import type { SteamGame } from "$lib/interfaces/games/Steam";
    import SteamGameComp from "./SteamGame.svelte";

    const { gamesList = $bindable() }: { gamesList: SteamGame[] } = $props();

</script>

<div class="w-9/10 text-white grid grid-cols-3 gap-x-4 auto-rows-auto">
    {#each gamesList as game, index}
            <SteamGameComp bind:game={gamesList[index]} steam_id={"76561198363204630"}/>
    {/each}
</div>
