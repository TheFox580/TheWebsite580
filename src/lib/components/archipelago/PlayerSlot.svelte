<script lang="ts">
    import type { PlayerSlotInfo } from "$lib/interfaces/archipelago/PlayerSlotInfo";
    import ProgressBar from "./ProgressBar.svelte";

    const { slot_info } = $props<{
        slot_info: PlayerSlotInfo;
    }>();
</script>

<div class="flex flex-col items-center justify-center w-full">
    <div class="flex flex-row items-center justify-evenly w-full mb-2">
        <p class="text-center">Slot: {slot_info.name}</p>
        <p class="text-center">Game: {slot_info.game}</p>
    </div>
    {#key slot_info.completion.done}
        <ProgressBar
            max={slot_info.completion.todo}
            current={slot_info.completion.done}
            inList={true}
        ></ProgressBar>
    {/key}
</div>
