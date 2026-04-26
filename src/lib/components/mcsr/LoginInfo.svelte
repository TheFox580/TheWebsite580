<script lang="ts">
    import type { Timestamp } from "$lib/interfaces/mcsr/Timestamp";

    const { data } = $props<{
        data: Timestamp;
    }>();

    function z(n: number): string {
        return (n < 10 ? "0" : "") + n;
    }

    function getTimeUntilNow(time: Date): string {
        let now: Date = new Date();
        let timeDiff: number = now.getTime() - time.getTime();
        let days = (timeDiff / 8.64e7) | 0;
        let hours = ((timeDiff % 8.64e7) / 3.6e6) | 0;
        let mins = ((timeDiff % 3.6e6) / 6e4) | 0;
        let secs = Math.floor((timeDiff % 6e4) / 1e3);

        if (days > 0) {
            return `${days} days`;
        }
        if (hours > 0) {
            return `${hours} hours`;
        }
        if (mins > 0) {
            return `${mins} minutes`;
        }
        return `${secs} seconds`;
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
            ` (${timeBetweenNow} ago)`
        );
    }

    let joinDate = formatTime(new Date(data.firstOnline * 1000));
    let lastDate = formatTime(new Date(data.lastOnline * 1000));
    let lastRankedDate = formatTime(new Date(data.lastRanked * 1000));
</script>

<div class="flex flex-col justify-evenly items-start p-2.5">
    <h2 class="text-center self-center mb-5 text-2xl font-bold">Login infos</h2>
    <span>First online on {joinDate}</span>
    <span>Last ranked game played on {lastRankedDate}</span>
    <span>Last online on {lastDate}</span>
</div>
