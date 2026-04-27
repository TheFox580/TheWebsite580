<script lang="ts">
    import { getLastMatchs } from "$lib/functions/mcsr/GetLastMatches";
    import type { MatchInfo } from "$lib/interfaces/mcsr/MatchInfo";

    const { uuid } = $props<{
        uuid: string;
    }>();

    interface MatchResult {
        result: number;
        text: string;
    }

    let matchResult: MatchResult[] = [
        { result: 0, text: "Lost (By foirfeit)" },
        { result: 1, text: "Lost" },
        { result: 2, text: "Draw" },
        { result: 3, text: "Won" },
        { result: 4, text: "Won (By foirfeit)" },
    ];

    let matchResultColor: MatchResult[] = [
        { result: 0, text: "red-600" },
        { result: 1, text: "red-600" },
        { result: 2, text: "sky-400" },
        { result: 3, text: "green-600" },
        { result: 4, text: "green-600" },
    ];

    function gameWonOrLost(data: MatchInfo): number {
        //Returns 4 if won by forfeit, 3 if won, 2 if drew, 1 if lost, 0 for lost by forfeit

        if (data.result.uuid === uuid) {
            return 3 + (data.forfeited ? 1 : 0);
        }
        if (data.result.uuid === null) {
            return 2;
        }
        return 1 - (data.forfeited ? 1 : 0);
    }
</script>

<div class="flex flex-col justify-evenly items-start m-2.5">
    {#await getLastMatchs(true, 10)}
        <h2 class="text-center self-center mb-4 text-2xl font-bold">
            Waiting to receive data...
        </h2>
    {:then json}
        <h2 class="text-center self-center mb-4 text-2xl font-bold">
            Last {json.length} Ranked Games
        </h2>
        <ol
            class="pl-7.5"
            style="list-style-type: decimal; padding-inline-start: 40px;"
        >
            {#each json as game}
                <li>
                    <span
                        class="font-bold text-{matchResultColor.filter(
                            (result) => result.result === gameWonOrLost(game),
                        )[0].text}"
                        >{matchResult.filter(
                            (result) => result.result === gameWonOrLost(game),
                        )[0].text}</span
                    >
                    against
                    <a
                        class="cursor-pointer"
                        href="https://mcsrranked.com/stats/{game.players
                            .filter((player) => player.uuid !== uuid)
                            .map((player) => player.nickname)[0]}"
                        target="_blank"
                        >{game.players
                            .filter((player) => player.uuid !== uuid)
                            .map((player) => player.nickname)[0]}</a
                    >
                </li>{/each}
        </ol>
    {/await}
</div>

<style>
    .text-red-600 {
        color: oklch(57.7% 0.245 27.325);
    }
    .text-sky-400 {
        color: oklch(74.6% 0.16 232.661);
    }
    .text-green-600 {
        color: oklch(62.7% 0.194 149.214);
    }
</style>
