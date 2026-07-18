<script lang="ts">
    let showDonationBanner: boolean = $state(false);
    const donationTitle: string = "Cube Championship: Pride 2026";
    import { timeToGo } from "$lib/functions/funny_points_leaderboard/Time";
    import type { LiveInfos } from "$lib/interfaces/twitch/liveInfos";
    import { onMount } from "svelte";

    const mainUserId = "126869447";
    const altUserId = "975679501";
    const frUserId = "689519040";

    let liveInfos: LiveInfos = $state({isLive: false, game_name: "", is_mature: false, title: "", user_id: "", user_name: "", viewers: -1});

    const timeEvent: Date = new Date("2026-06-28T21:00:00Z");

    let timeLeft = $state(timeToGo(timeEvent));

    function isEventOver() {
        return timeEvent.getTime() - new Date().getTime() <= 0;
    }

    if (!isEventOver()) {
        //If the event isn't over yet
        showDonationBanner = true;
        setInterval(() => {
            timeLeft = timeToGo(timeEvent);
            if (isEventOver()) {
                //If the event is over
                showDonationBanner = false;
            }
        });
    }

    onMount(async () => {
      liveInfos = (await (await fetch("https://thefox580-backend.zoelliotmitong.workers.dev/api/live/" + mainUserId)).json()).liveInfos;
      if (liveInfos.isLive === false){
        liveInfos = (await (await fetch("https://thefox580-backend.zoelliotmitong.workers.dev/api/live/" + altUserId)).json()).liveInfos;
        if (liveInfos.isLive === false){
          liveInfos = (await (await fetch("https://thefox580-backend.zoelliotmitong.workers.dev/api/live/" + frUserId)).json()).liveInfos;
        }
      }
    })
</script>

<svelte:head>
    <link rel="stylesheet" href="/styles/default.css" />
    <title>TheFox580's website!</title>
</svelte:head>

<div class="flex flex-col justify-center items-center my-20 text-2xl">
    <div class="w-6/10 text-center">
        <h1 class="font-bold text-5xl mb-20">Hey, you're here !</h1>
        <p>Welcome on my website...</p>
        <p>It is currently going under some renovation, come back later !</p>
        <p>
            If you want to check out the old (bad) (and broken, even though I
            tried fixing it as best as i could) version, you can
            <a href="/archived">click here <strong>↗</strong></a>
        </p>
    </div>
</div>
{#if liveInfos.isLive}
    <a href="https://www.twitch.tv/{liveInfos.user_name}" target="_blank">
        <div class="w-full flex flex-row items-center justify-center p-2 my-5 rounded-2xl border-4 border-red-600 bg-red-900"
            style="height: 100%;">
            <div class="w-8/10 h-full text-white flex flex-col items-center mx-5 text-center">
                <p class="text-2xl text-red-600 font-bold">🔴 LIVE on {liveInfos.user_name}</p>
                <p class="text-2xl text-red-600 font-bold">{liveInfos.viewers} viewers</p>
                <p class="text-4xl">{liveInfos.title}</p>
                <p class="text-3xl">{liveInfos.game_name}</p>
            </div>
        </div>
    </a>
{:else}
    <a href="https://thewebsite580.vercel.app/schedule" target="_blank">
        <div class="w-full flex flex-row items-center justify-center p-2 my-5 rounded-2xl border-4 border-green-600 bg-green-900 grayscale"
            style="height: 100%;">
            <div class="w-8/10 h-full text-white flex flex-col items-center mx-5 text-center">
                <p class="text-2xl text-green-600 font-bold">🟢 Currently Offiline</p>
                <p class="text-3xl">Click to check the schedule</p>
            </div>
        </div>
    </a>
{/if}
{#if showDonationBanner}
    <div
        class="flex flex-col justify-center items-center my-20 text-2xl bg-orange-600 py-5 rounded-4xl h-50"
    >
        <h2 class="text-5xl mb-2">
            <a href="/donate" target="_blank"
                >Click here to donate for {donationTitle} <strong>↗</strong></a
            >
        </h2>
        <h3 class="text-3xl">{timeLeft}</h3>
    </div>
{/if}
<div class="flex flex-col justify-center items-center my-20 text-2xl">
    <h2 class="text-3xl">
        <a href="/mcsr">Click here <strong>↗</strong></a> to get to my
        <a href="http://mcsrranked.com" target="_blank"
            >MCSR Ranked <strong>↗</strong></a
        >
        statistics.
    </h2>
    <h3 class="text-2xl mt-5">
        To get you own widget, enter <code class="bg-neutral-600 rounded"
            >/mcsr/widget/[your username]</code
        > at the end of the URL.
    </h3>
</div>
<div class="flex flex-col justify-center items-center my-20 text-2xl">
    <h2 class="text-3xl">
        <a href="/mcci/TheFox580">Click here <strong>↗</strong></a> to get to my
        <a href="http://mccisland.net" target="_blank"
            >MCC Island <strong>↗</strong></a
        >
        statistics.
    </h2>
    <h3 class="text-2xl mt-5">
        To get you own stats, enter <code class="bg-neutral-600 rounded"
            >/mcci/[your username]</code
        > at the end of the URL.
    </h3>
</div>
