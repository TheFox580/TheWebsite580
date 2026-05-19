<script lang="ts">
    import type { PlayerSlotInfo } from "$lib/interfaces/archipelago/PlayerSlotInfo";
    import ProgressBar from "./ProgressBar.svelte";

    const { progression } = $props<{
        progression: PlayerSlotInfo[];
    }>();

    let nb_player = progression.length;
    let nb_finish = $state(0);

    let nb_checks_completed = $state(0);
    let nb_total_checks = $state(0);

    for (const player of progression) {
        if (player.completion.done >= player.completion.todo) {
            nb_finish++;
        }

        nb_checks_completed += player.completion.done;
        nb_total_checks += player.completion.todo;
    }
</script>

<div class="flex flex-col items-center justify-center w-full mb-15">
    <h1 class="text-6xl text-center mb-10">Room Progression :</h1>

    <h3 class="text-3xl text-center mb-3">Completions :</h3>
    <ProgressBar max={nb_player} current={nb_finish} inList={true}
    ></ProgressBar>

    <h3 class="text-3xl text-center mb-3">Checks :</h3>
    <ProgressBar
        max={nb_total_checks}
        current={nb_checks_completed}
        inList={false}
    ></ProgressBar>
</div>
