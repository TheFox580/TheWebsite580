<script lang="ts">
    import { onMount } from "svelte";
    import type { PlayerSlotInfo } from "$lib/interfaces/archipelago/PlayerSlotInfo";
    import type { PageData } from "./$types";
    import RoomProgression from "$lib/components/archipelago/RoomProgression.svelte";
    import PlayerSlot from "$lib/components/archipelago/PlayerSlot.svelte";
    import { getRoomTrackerInfo } from "$lib/functions/archipelago/getRoomTrackerInfo";

    const { data } = $props<{
        data: PageData;
    }>();

    let tracker_loaded: boolean = $state(false);
    let roomTrackerInfo: PlayerSlotInfo[] = $state();

    onMount(async () => {
        const tracker_refresh = setInterval(
            async () => {
                roomTrackerInfo = await getRoomTrackerInfo(data.id);
            },
            10 * 60 * 1000,
        );
        roomTrackerInfo = await getRoomTrackerInfo(data.id);
        tracker_loaded = true;
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="/styles/mcsr/widget.css" />
</svelte:head>

<div
    class="flex flex-col items-center justify-center mx-10 bg-gray-400 rounded-2xl px-5 py-2"
>
    {#if !tracker_loaded}
        <h1 class="text-center text-5xl">Loading tracker info...</h1>
    {:else}
        <RoomProgression progression={roomTrackerInfo}></RoomProgression>
        <div class="flex flex-row items-center justify-evenly w-full">
            {#each roomTrackerInfo as player}
                <div class="w-full mx-5">
                    <PlayerSlot slot_info={player}></PlayerSlot>
                </div>
            {/each}
        </div>
    {/if}
</div>
