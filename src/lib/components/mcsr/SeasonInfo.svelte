<script lang="ts">
    interface DateInfo {
        isBefore: boolean;
        message: string;
    }

    import type { SeasonInfo } from "$lib/interfaces/mcsr/SeasonInfo";
    import { onMount } from "svelte";

    let currentSeason: SeasonInfo = $state({});

    let reset = $state("Loading countdown...");
    let notRedColor = $state(255);

    onMount(async () => {
        const res = await (
            await fetch("https://api.mcsrranked.com/leaderboard")
        ).json();

        currentSeason = res.data.season;
        console.log(currentSeason);

        let startTime = new Date(currentSeason.startsAt * 1000);
        let endTime = new Date(currentSeason.endsAt * 1000);
        let totalTime = endTime.getTime() - startTime.getTime();
        setInterval(() => {
            reset = timeToGo(endTime);
            let timeLeft = endTime.getTime() - new Date().getTime();
            notRedColor = Math.max(0, Math.round((timeLeft / totalTime) * 255));
        }, 1000);
    });

    function z(n: number): string {
        return (n < 10 ? "0" : "") + n;
    }

    function getTimeUntilNow(time: Date): DateInfo {
        let now: Date = new Date();
        let isBefore = now.getTime() > time.getTime() ? true : false;
        let timeDiff: number = isBefore
            ? now.getTime() - time.getTime()
            : time.getTime() - now.getTime();
        let days = (timeDiff / 8.64e7) | 0;
        let hours = ((timeDiff % 8.64e7) / 3.6e6) | 0;
        let mins = ((timeDiff % 3.6e6) / 6e4) | 0;
        let secs = Math.floor((timeDiff % 6e4) / 1e3);

        if (days > 0) {
            return { isBefore, message: `${days} days` };
        }
        if (hours > 0) {
            return { isBefore, message: `${hours} hours` };
        }
        if (mins > 0) {
            return { isBefore, message: `${mins} minutes` };
        }
        return { isBefore, message: `${secs} seconds` };
    }

    function formatTime(time: Date): string {
        let diff = -time.getTimezoneOffset() / 60;
        let sign = diff < 0 ? "-" : "+";

        let timeBetweenNow = getTimeUntilNow(time);

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
            diff +
            ` (${timeBetweenNow.isBefore ? "" : "in "}${timeBetweenNow.message}${timeBetweenNow.isBefore ? " ago" : ""})`
        );
    }

    function timeToGo(date: Date): string {
        // Convert string to date object
        var diff = date.getTime() - new Date().getTime();

        // Allow for previous times
        var sign = diff < 0 ? "-" : "";
        if (diff < 0) {
            return "Resets soon";
        }
        diff = Math.abs(diff);

        // Get time components
        var days = (diff / 8.64e7) | 0;
        var hours = ((diff % 8.64e7) / 3.6e6) | 0;
        var mins = ((diff % 3.6e6) / 6e4) | 0;
        var secs = Math.floor((diff % 6e4) / 1e3);

        // Return formatted string
        return `Ends in ${days > 0 ? z(days) + "d" : ""} ${z(hours)}h ${z(mins)}m ${z(secs)}s`;
    }
</script>

<div class="flex flex-col justify-evenly items-center p-2.5">
    <h2 class="text-center self-center mb-5 text-2xl font-bold">
        Season infos
    </h2>
    {#if currentSeason.number}
        <span>Current Season: {currentSeason.number}</span>
        <span
            >Season started on {formatTime(
                new Date(currentSeason.startsAt * 1000),
            )}</span
        >
        <span
            >Season ends on {formatTime(
                new Date(currentSeason.endsAt * 1000),
            )}</span
        >
        <span
            class="font-bold"
            style="color:rgb(255, {notRedColor}, {notRedColor})">{reset}</span
        >
    {/if}
</div>
