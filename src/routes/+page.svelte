<script lang="ts">
    import StreamEmbed from "$lib/components/twitch/StreamEmbed.svelte";
    import EightyEightByThirtyOne from "$lib/components/other/EightyEightByThirtyOne.svelte"
    import type { LiveInfos } from "$lib/interfaces/twitch/liveInfos";
    import { onMount } from "svelte";
    import Music from "$lib/components/other/Music.svelte";

    const mainUserId = "126869447";
    const altUserId = "975679501";
    const frUserId = "689519040";

    let liveInfos: LiveInfos = $state({isLive: false, game_name: "", is_mature: false, title: "", user_id: "", user_name: "", viewers: -1});

    onMount(async () => {
      liveInfos = (await (await fetch("https://backend.thefox580.me/api/live/" + mainUserId)).json()).liveInfos;
      if (liveInfos.isLive === false){
        liveInfos = (await (await fetch("https://backend.thefox580.me/api/live/" + altUserId)).json()).liveInfos;
        if (liveInfos.isLive === false){
          liveInfos = (await (await fetch("https://backend.thefox580.me/api/live/" + frUserId)).json()).liveInfos;
        }
      }
    })
</script>

<svelte:head>
    <title>TheFox580's website!</title>
    <script src="https://embed.twitch.tv/embed/v1.js"></script>

    <style>
        html {
            background-color: #000000;
            color: #ffffff;
            font-family: Arial, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            overflow-x: hidden;
        }
    </style>
</svelte:head>

<div class="w-screen h-screen flex flex-row mx-3 items-center">
    <div class="w-1/5 h-auto flex flex-col items-center justify-evenly mx-3 text-center">
        <h2 class="my-2 text-3xl">➡ Home</h2>
        <h2 class="my-2 text-3xl"><a class="hover:underline cursor-pointer" href="/projects">Projects</a></h2>
        <h2 class="my-2 text-3xl"><a class="hover:underline cursor-pointer" href="/mcci/TheFox580">MCC Island Stats</a></h2>
        <h2 class="my-2 text-3xl"><a class="hover:underline cursor-pointer" href="/mcsr">MCSR Ranked Stats</a></h2>
        <h2 class="my-2 text-3xl"><a class="hover:underline cursor-pointer" href="/archipelago">Archipelago</a></h2>
        <h2 class="my-2 text-3xl"><a class="hover:underline cursor-pointer" href="/cv">CV</a> / <a class="hover:underline cursor-pointer" href="/resume">Resume</a></h2>
        <h2 class="my-2 text-3xl"><a class="hover:underline cursor-pointer" href="/gamenights">Game Nights</a></h2>
    </div>

    <div class="w-3/5 h-auto my-10 mx-3 flex flex-col items-center justify-center">

        {#if liveInfos.isLive}
              <a class="w-full" href="https://www.twitch.tv/{liveInfos.user_name}" target="_blank">
                  <div class="w-auto flex flex-row items-center justify-center p-2 my-5 rounded-2xl border-4 border-red-600 bg-red-900">
                      <div class="w-8/10 text-white flex flex-col items-center mx-5 text-center">
                          <p class="text-2xl text-red-600 font-bold">🔴 LIVE on {liveInfos.user_name}</p>
                          <p class="text-2xl text-red-600 font-bold">{liveInfos.viewers} viewers</p>
                          <p class="text-4xl">{liveInfos.title}</p>
                          <p class="text-3xl">Playing {liveInfos.game_name}</p>
                      </div>
                  </div>
              </a>
              <StreamEmbed username={liveInfos.user_name}/>
        {:else}
            <Music/>

              <a class="w-full" href="/schedule" target="_blank">
                  <div class="w-auto flex flex-row items-center justify-center p-2 my-5 rounded-2xl border-4 border-neutral-400 bg-neutral-700 grayscale">
                      <div class="w-8/10 text-white flex flex-col items-center mx-5 text-center">
                          <p class="text-2xl text-green-600 font-bold">🟢 Currently Offiline</p>
                          <p class="text-3xl">Click to check the schedule</p>
                      </div>
                  </div>
              </a>
        {/if}
    </div>
    <div class="w-1/5 h-auto mx-3 flex flex-col items-center justify-start">
        <h2 class="text-3xl">More links:</h2>
        <EightyEightByThirtyOne/>
    </div>
</div>
