<script lang="ts">
    import type { PageData } from "./$types";
    import { invalidate } from "$app/navigation";
    import { onMount } from "svelte";
    import type { MCSRData } from "$lib/interfaces/mcsr/MCSRData";

    const { data } = $props<{
        data: PageData;
    }>();

    const usableData: MCSRData = data.data.data;

    onMount(() => {
        const interval = setInterval(() => {
            invalidate(
                `https://api.mcsrranked.com/users/${usableData.nickname}`,
            );

            updatePage();
        }, 20 * 1000);

        return () => clearInterval(interval);
    });

    let win = $state(0);
    let loss = $state(0);
    let draw = $state(0);

    let ranked = $state(usableData.eloRank ? usableData.eloRank : 0);
    let elo = $state(usableData.eloRate ? usableData.eloRate : 0);
    let rank = $state(getRankByElo(elo));
    let nextRank = $state(getNextRank(rank));

    function getRankByElo(elo: number): string {
        if (elo === null) {
            return "Unrated";
        } else if (elo < 400) {
            return "Coal 1";
        } else if (elo < 500) {
            return "Coal 2";
        } else if (elo < 600) {
            return "Coal 3";
        } else if (elo < 700) {
            return "Iron 1";
        } else if (elo < 800) {
            return "Iron 2";
        } else if (elo < 900) {
            return "Iron 3";
        } else if (elo < 1000) {
            return "Gold 1";
        } else if (elo < 1100) {
            return "Gold 2";
        } else if (elo < 1200) {
            return "Gold 3";
        } else if (elo < 1300) {
            return "Emerald 1";
        } else if (elo < 1400) {
            return "Emerald 2";
        } else if (elo < 1500) {
            return "Emerald 3";
        } else if (elo < 1650) {
            return "Diamond 1";
        } else if (elo < 1800) {
            return "Diamond 2";
        } else if (elo < 2000) {
            return "Diamond 3";
        } else {
            return "Netherite";
        }
    }

    function getNextRank(currentRank: string): string {
        if (currentRank === "Unrated") {
            return "TBD";
        } else if (currentRank === "Coal 1") {
            return "Coal 2";
        } else if (currentRank === "Coal 2") {
            return "Coal 3";
        } else if (currentRank === "Coal 3") {
            return "Iron 1";
        } else if (currentRank === "Iron 1") {
            return "Iron 2";
        } else if (currentRank === "Iron 2") {
            return "Iron 3";
        } else if (currentRank === "Iron 3") {
            return "Gold 1";
        } else if (currentRank === "Gold 1") {
            return "Gold 2";
        } else if (currentRank === "Gold 2") {
            return "Gold 3";
        } else if (currentRank === "Gold 3") {
            return "Emerald 1";
        } else if (currentRank === "Emerald 1") {
            return "Emerald 2";
        } else if (currentRank === "Emerald 2") {
            return "Emerald 3";
        } else if (currentRank === "Emerald 3") {
            return "Diamond 1";
        } else if (currentRank === "Diamond 1") {
            return "Diamond 2";
        } else if (currentRank === "Diamond 2") {
            return "Diamond 3";
        } else if (currentRank === "Diamond 3") {
            return "Netherite";
        } else {
            return "None";
        }
    }

    function getOffsetByRank(rank: string): Array<number> {
        if (rank.includes("Coal")) {
            if (rank == "Coal 1") {
                return [0, 0];
            } else if (rank == "Coal 2") {
                return [-1.40625, 0];
            }
            return [-2.8125, 0];
        } else if (rank.includes("Iron")) {
            if (rank == "Iron 1") {
                return [-4.21875, 0];
            }
            if (rank == "Iron 2") {
                return [-5.625, 0];
            }
            return [-7.03125, 0];
        } else if (rank.includes("Gold")) {
            if (rank == "Gold 1") {
                return [0, -1.40625];
            } else if (rank == "Gold 2") {
                return [-1.40625, -1.40625];
            }
            return [-2.8125, -1.40625];
        } else if (rank.includes("Emerald")) {
            if (rank == "Emerald 1") {
                return [-4.21875, -1.40625];
            }
            if (rank == "Emerald 2") {
                return [-5.625, -1.40625];
            }
            return [-7.03125, -1.40625];
        } else if (rank.includes("Diamond")) {
            if (rank == "Diamond 1") {
                return [0, -2.8125];
            } else if (rank == "Diamond 2") {
                return [-1.40625, -2.8125];
            }
            return [-2.8125, -2.8125];
        } else if (rank == "Netherite") {
            return [-4.21875, -2.8125];
        }
        return [-5.625, -2.8125];
    }

    let startingElo = usableData.eloRate ? usableData.eloRate : 0;
    let lastGameTime: number | null = null;

    function updateElo(newElo: number) {
        let eloInterval = setInterval(() => {
            if (elo === newElo) {
                clearInterval(eloInterval);
            } else if (elo < newElo) {
                elo++;
            } else {
                elo--;
            }
            rank = getRankByElo(elo);
            nextRank = getNextRank(rank);
        });
    }

    function updateRanked(newRanked: number) {
        let rankedInterval = setInterval(() => {
            if (ranked === newRanked) {
                clearInterval(ranked);
            } else if (ranked < newRanked) {
                ranked++;
            } else {
                ranked--;
            }
        });
    }

    function updatePage() {
        console.log(usableData);

        if (!lastGameTime) {
            lastGameTime = usableData.timestamp.lastRanked;
        } else if (lastGameTime != usableData.timestamp.lastRanked) {
            let diff: number =
                (usableData.eloRank ? usableData.eloRank : 0) - elo;

            if (diff > 0) {
                win++;
            } else if (diff < 0) {
                loss++;
            } else {
                draw++;
            }
        }

        updateRanked(usableData.eloRank ? usableData.eloRank : 0);
        updateElo(usableData.eloRate ? usableData.eloRate : 0);
    }

    updatePage();
</script>

<svelte:head>
    <link rel="stylesheet" href="/styles/mcsr/widget.css" />
</svelte:head>

<div
    class="flex flex-row justify-around bg-black w-100 h-25 rounded-[40px] m-5"
>
    <div class="flex flex-col justify-center">
        <div class="flex flex-row items-center justify-center">
            <span class="text-neutral-400 ml-2.5 text-base font-sans"
                >W/L/D: {win}/{loss}/{draw} | Ranked #{ranked}
            </span>
        </div>
        <div class="flex flex-row items-center justify-center">
            <div
                class="bg-no-repeat mt-[2.5px]"
                style="
                  background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAAAtCAMAAAAZUYxJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACxUExURZuwsqjEtiQuNYCPmS0/Pll3bmdyf4CZkhsZK9zq5cfYyhMhHUdMWf///zhBSQ8EFPrqLs332rJkEffEMQ1mPpDbr+KRBG3bg//3nf/6rVnWVQg/PHYzDPTGPR+oOwp/VErt2U8ocgpbYCDFtahkvDQaUQAAANX/9hiblxgNKy0bSRYWFqH76Nt/0IhOoz09PSzg2AoADx0JOg5HPlU3d0YpdSYmJhuJkfeq4jUlTwAAAOYMmYwAAAA7dFJOU/////////////////////////////////////////////////////////////////////////////8AocQ7HgAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIDUuMS4xMYoIFs4AAAO7SURBVFhHpZQNU+JIEIYlhOCtxoV8EJf1MBA+BRR3Fffy/3/YvdPTM+lOpTiq7q3Cmcein2qaDjf1NbnuXZwen64o4JOjsR/0+WYT8snROAgH9nKVOgoivlHCgZJpHAKHdGN1ECmZRpiVOxxKVw/oZoA06NQ30tUHihG0MBz0RJ/oEmj7RARadRD1o1u6mfQJvayF4eCvb73BHRMmS8jzlcjqfnTfqCNCPwKN4fBbjOqhdQ89UqMKSR3cR/fBg3PfMPKsWhj2UDt0bfc80nwV2oLbh8aMNgmbrhWGgyFqh6Hr2iF3LZDVwUMgZk3YzFojqr2ZhkvYzNojf8zvwXd7ofSBYiVaeIf1cmY0Skg9mwh06lupbmEElHt95/fDpAeUe+2R1bUytzFSZrQt1S1E2/wZrlL35TwQZW6j33Gnvpzr3sVx07muaMTnVRnz6dQJnxyNaZLyzSbjk6Mxz3J7YXWSKpnGCXDCd5OskLICWPAdadCpR9KVAkWfCrOsznK82H4BrTp5/CHcI0I/X43ZNIvzIpv+/E8ktalNJ0/miqSMttGJR55JFo+LacGqwiMNQSHUSZL+iB9HafJEco2pwL/Bmakdz1BNco25wBzqZJQ+jlA7SScJZBoxCIEj01RejMf583Q6g0zjWOGYuh6lqE0mrmuJ6Nqj7Xo2Hef588x1LRFdezRdI4npybRMwaYR+lkzulnPnk2tBQyX0c26QbshT9hcZ8ZKEDYbohDf/gy1zn0Brbp+8vthkgLlXkvMftam0s7jIjq1aBrROAHKp9H3SCmA9vGjNMjqWpnbmMrPgEgzojHHN0hx6sv5X798l1PyyZnzeTlOveCTo7FaVHyr6+W8nq/wWjIjaz5bYfViI2Vb4JbviEQyL3cvwr3ed7utehEf4sZdEfohSLTm46twr/dv3W5So7Y8+b5LRh6CQms+Ll/ff/HE1/s4jjvdRm262mwO29/0n61HGkIL56vXI9wfn3CbwPx2fut0Q72Iy83hUFblF7k1Yhoe0ffL7sOYl5+rHbnX+/PbeX+Ozx3um3px2Jwq1G6rk5FpLBWWL7vV5+vxz/HP6oPc1ryO6S8bfUzXqN5ut6dTZbtWWAmkruFeHlcf/4iuu8121gf0VH5ZM4brkGetkNzezO5OM6nrxdeprOykkYqRt0/hvH5537HZbUj3pFld/64aM9aN0D+AErHXv9531nzVXsMtzBgC0D1+iETrFmbj7jQ7dS3NiEb6Bjnklma4+WzFqS+n9ctnv8HLqet/AeFM0AfYldt3AAAAAElFTkSuQmCC&quot;);
                  width: 1.40625rem;
                  height: 1.40625rem;
                  background-position: {getOffsetByRank(
                    rank,
                )[0]}rem {getOffsetByRank(rank)[1]}rem;
                  background-size: 8.4375rem 4.21875rem;
                  image-rendering: pixelated;
                "
            ></div>
            <span class="text-white ml-2.5 mr-10 text-2xl font-sans"
                >{elo} elo</span
            >
            <span
                class="text-{startingElo < elo
                    ? 'green-400'
                    : startingElo > elo
                      ? 'red-600'
                      : 'yellow-300'} text-2xl font-bold">+0</span
            >
        </div>
        <div class="flex flex-row items-center justify-center mt-0.5">
            <span class="text-neutral-400 ml-2.5 text-base font-sans"
                >Next Rank: <span class="font-bold">{nextRank}</span></span
            >
        </div>
    </div>
    <img
        class="mr-7.5 rounded-xl self-center w-[5em]"
        src="https://minotar.net/helm/{usableData.uuid}/75"
        alt="{usableData.nickname}'s skin head"
    />
</div>

<style>
    .text-yellow-300 {
        color: oklch(90.5% 0.182 98.111);
    }

    .text-green-400 {
        color: oklch(79.2% 0.209 151.711);
    }

    .text-red-600 {
        color: oklch(57.7% 0.245 27.325);
    }
</style>
