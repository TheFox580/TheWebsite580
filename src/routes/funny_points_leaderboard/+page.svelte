<script lang="ts">
    import DiscordMessage from "$lib/components/funny_points_leaderboard/DiscordMessage.svelte";
    import type { PageData } from "./$types";
    import type { Point } from "$lib/interfaces/funny_points_leaderboard/Point";

    const { data } = $props<{
        data: PageData;
    }>();

    function z(n: number): string {
        return (n < 10 ? "0" : "") + n;
    }
    function isoToObj(s: string): Date {
        var b = s.split(/[-TZ:]/i);

        var b1 = +b[1];

        return new Date(Date.UTC(+b[0], --b1, +b[2], +b[3], +b[4], +b[5]));
    }

    function timeToGo(s: string): string {
        // Convert string to date object
        var d = isoToObj(s);
        var diff = d.getTime() - new Date().getTime();

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

        if (days > 0) {
            // Return formatted string
            return (
                "Resets in " +
                z(days) +
                "d " +
                z(hours) +
                "h " +
                z(mins) +
                "m " +
                z(secs) +
                "s"
            );
        }

        // Return formatted string
        return "Resets in " + z(hours) + "h " + z(mins) + "m " + z(secs) + "s";
    }

    let reset = $state(timeToGo("2026-11-23T19:00:00Z"));

    let endTime = isoToObj("2026-11-23T19:00:00Z");
    let startTime = isoToObj("2025-11-23T19:00:00Z");
    let totalTime = endTime.getTime() - startTime.getTime();
    let timeLeft = endTime.getTime() - new Date().getTime();
    let notRedColor = $state(
        Math.max(0, Math.round((timeLeft / totalTime) * 255)),
    );

    setInterval(() => {
        reset = timeToGo("2026-11-23T19:00:00Z");
    }, 1000);

    const usableData: Point[] = data.points;
</script>

<svelte:head>
    <link rel="stylesheet" href="/styles/default.css" />
    <title>Goofy Gang's Funny Points Leaderboard | Season 1</title>
    <link
        rel="icon"
        href="https://cdn.discordapp.com/icons/1327430536494321807/a6703551a7b3a2597461905182707145.webp?size=512"
    />
</svelte:head>

<div class="flex items-center justify-center w-screen">
    <img
        src="https://cdn.discordapp.com/banners/1327430536494321807/4ecc6d3434c7f8ecc3a6a5a361ce6260.webp?size=1024"
        alt="Goofy Gang Discord Server Banner"
        class="w-4/10 rounded-[10px] my-2.5"
    />
</div>

<div id="title">
    <h1 class="font-bold text-3xl mt-5 mb-2.5">
        Goofy Gang's Funny Points Leaderboard
    </h1>
    <h2
        id="time"
        class="text-2xl font-bold"
        style="color:rgb(255, {notRedColor}, {notRedColor})"
    >
        {reset}
    </h2>
</div>
<div id="main-content">
    <div id="leaderboard-all" class="stick w-screen">
        <h1 class="font-bold text-3xl mt-5 mb-2.5 self-center title">
            Leaderboard
        </h1>
        <div id="leaderboard">
            <span id="placement" class="text-[xx-large]">
                <span class="first"
                    >🥇 <span class="username">victoriaskyetv</span></span
                >
                - 5 points</span
            >
            <span id="placement" class="text-[larger]"
                ><span class="second"
                    >🥈 <span class="username">pinkfluffyseal</span></span
                >
                - 4 points</span
            >
            <span id="placement" class="text-[larger]"
                ><span class="second"
                    >🥈 <span class="username">TheFox580</span></span
                >
                - 4 points</span
            >
            <span id="placement" class="text-[100%]"
                >🏅 <span class="username">Oobie</span> - 2.5 points</span
            >
            <span id="placement" class="text-[95%]"
                >5th. <span class="username">WubDub</span> - 2 points</span
            >
            <span id="placement" class="text-[95%]"
                >5th. <span class="username">NotTooSwift</span> - 2 points</span
            >
            <span id="placement" class="text-[95%]"
                >5th. <span class="username">dolphinman_rl</span> - 2 point</span
            >
            <span id="placement" class="text-[80%]"
                >8th. <span class="username">KaNukei</span> - 1 point</span
            >
            <span id="placement" class="text-[80%]"
                >8th. <span class="username">Chandiggitydog</span> - 1 point</span
            >
            <span id="placement" class="text-[70%]"
                >10th. <span class="username">Amy</span> - 0 points</span
            >
            <span id="placement" class="text-[70%]"
                >10th. <span class="username">JustColonial</span> - 0 points</span
            >
            <span id="placement" class="text-[70%]"
                >10th. <span class="username">Kokiri</span> - 0 points</span
            >
            <span id="placement" class="text-[70%]"
                >10th. <span class="username">Temprie</span> - 0 points</span
            >

            <span class="mt-4"
                ><em
                    ><strong>RULE:</strong> Majority of the vc has to agree to give
                    a funny point. The majority of the vc can vote to take away a
                    funny point if need be.</em
                >
                Lock in.</span
            >
        </div>
    </div>
    <div id="logs-main" class="flex flex-col">
        <h1 class="stick font-bold text-3xl mt-5 mb-2.5 w-full title">Logs</h1>
        {#each usableData as point}
            <div class="flex flex-col logs-message">
                <span
                    >{point.date.toDateString()} at {z(
                        point.date.getHours(),
                    )}:{z(point.date.getMinutes())}:{z(point.date.getSeconds())} UTC{-point.date.getTimezoneOffset() /
                        60 <
                    0
                        ? ""
                        : "+"}{-point.date.getTimezoneOffset() / 60}</span
                ><span>
                    <span
                        class="{point.diff > -0
                            ? 'added'
                            : 'removed'} font-bold"
                        >{point.diff > -0 ? "+" : ""}{point.diff} point{Math.abs(
                            point.diff,
                        ) > 1
                            ? "s"
                            : ""}</span
                    >
                    to {point.username}</span
                >
                <div class="flex flex-col mt-4">
                    <span>Context :</span>
                    <span>{point.context}</span>
                </div>
                <DiscordMessage
                    hasImage={point.message.hasImage}
                    src={point.message.src}
                    alt={point.message.alt}
                    customClass={point.message.customClass}
                    messageList={point.message.messageList}
                ></DiscordMessage>
            </div>
        {/each}
    </div>
</div>

<style>
    .stick {
        position: sticky;
        top: 0;
    }

    #title {
        text-align: center;
    }

    #main-content {
        display: flex;
        flex-direction: row;
        font-size: large;
        align-items: start;
        justify-content: center;
    }

    #main-content > div {
        margin-left: 1%;
        margin-right: 1%;
    }

    #leaderboard-all {
        width: 60%;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
    }

    #leaderboard {
        padding: 2%;
        font-size: larger;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        background-color: rgb(70, 70, 70);
        border-radius: 5px;
        border-style: solid;
        border-width: 5px;
        border-color: rgb(100, 100, 100);
    }

    .title {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 0px;
        padding-top: 20px;
        padding-bottom: 30px;
        background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 1) 75%,
            rgba(0, 0, 0, 0) 100%
        );
        top: 0;
    }

    .logs-message {
        margin-bottom: 30px;
        padding: 2%;
        font-size: large;
        background-color: rgb(70, 70, 70);
        border-radius: 5px;
        border-style: solid;
        border-width: 5px;
        border-color: rgb(100, 100, 100);
    }

    .username:hover {
        text-decoration: underline;
    }

    .first {
        color: gold;
    }

    .second {
        color: silver;
    }

    .third {
        color: #cd7f32;
    }

    .added {
        color: lime;
    }

    .removed {
        color: red;
    }
</style>
