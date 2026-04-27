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

    function z(n: number): string {
        return (n < 10 ? "0" : "") + n;
    }

    function formatTimestamp(time: Date): string {
        let diff = -time.getTimezoneOffset() / 60;
        let sign = diff < 0 ? "-" : "+";

        return (
            time.toDateString() +
            " at " +
            z(time.getHours()) +
            ":" +
            z(time.getMinutes()) +
            ":" +
            z(time.getSeconds()) +
            " UTC" +
            sign +
            diff
        );
    }

    function formatTime(time: number): string {
        let mins = ((time % 3.6e6) / 6e4) | 0;
        let secs = Math.floor((time % 6e4) / 1e3);

        return `${mins}:${z(secs)}`;
    }

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

    function formatWord(word: string) {
        return (
            String(word).charAt(0).toUpperCase() +
            String(word).slice(1).toLowerCase()
        ).replaceAll("_", " ");
    }
</script>

<div class="flex flex-col justify-evenly items-start p-2.5">
    {#await getLastMatchs(false, 1)}
        <h2 class="text-center self-center mb-4 text-2xl font-bold">
            Waiting to receive data...
        </h2>
    {:then json}
        <h2
            class="text-center self-center mb-4 text-2xl font-bold cursor-pointer"
        >
            <a
                href="https://mcsrranked.com/stats/TheFox580/{json[0].id}"
                target="_blank">Last Match Played</a
            >
        </h2>
        <span
            >Against {#each json[0].players.filter((player) => player.uuid != uuid) as player}
                <a
                    class="cursor-pointer"
                    href="https://mcsrranked.com/stats/{player.nickname}"
                    >{`${player.nickname}`}</a
                >{#if player != json[0].players[json[0].players.length - 1]}
                    {", "}
                {/if}
            {/each}
        </span>
        <span>Played on {formatTimestamp(new Date(json[0].date * 1000))}</span>
        <span
            >Match <span
                class="font-bold text-{matchResultColor.filter(
                    (result) => result.result === gameWonOrLost(json[0]),
                )[0].text}"
                >{matchResult.filter(
                    (result) => result.result === gameWonOrLost(json[0]),
                )[0].text}</span
            >
            after {formatTime(json[0].result.time)}</span
        >
        <span
            >Elo diff:
            <span
                class="font-bold text-{json[0].type === 3
                    ? 'sky-400'
                    : matchResultColor.filter(
                          (result) => result.result === gameWonOrLost(json[0]),
                      )[0].text}"
                >{json[0].changes.length == 0
                    ? "/"
                    : json[0].changes.filter(
                          (player) => player.uuid === uuid,
                      )[0].change}</span
            ></span
        >

        <span class="mt-2.5">Seed Types:</span>
        <ul style="list-style-type: disc; padding-inline-start: 40px;">
            <li>
                Overworld: {formatWord(
                    json[0].seed
                        ? json[0].seed.overworld
                            ? json[0].seed.overworld
                            : "None"
                        : "None",
                )}
            </li>
            <li>
                Nether: {formatWord(
                    json[0].seed
                        ? json[0].seed.nether
                            ? json[0].seed.nether
                            : "None"
                        : "None",
                )}
            </li>
        </ul>
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
