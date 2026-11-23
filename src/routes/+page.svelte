<script lang="ts">
    import StreamEmbed from "$lib/components/twitch/StreamEmbed.svelte";
    import EightyEightByThirtyOne from "$lib/components/other/EightyEightByThirtyOne.svelte"
    import type { LiveInfos } from "$lib/interfaces/twitch/liveInfos";
    import { onMount } from "svelte";
    import Music from "$lib/components/other/Music.svelte";
    import NavBar from "$lib/components/other/NavBar.svelte";
    import { Radio, RadioOff } from "@o7/icon/lucide";

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
            background-color: var(--color-mocha-bg);
            color: var(--color-mocha-text);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            overflow-x: hidden;
        }
    </style>
</svelte:head>

<div class="w-screen h-screen flex flex-row mx-3 items-center">

    <div class="w-1/5 flex flex-row items-center">
        <NavBar loc="home"></NavBar>
    </div>

    <div class="w-3/5 h-auto my-10 mx-3 flex flex-col items-center justify-center">

        <Music/>

        {#if liveInfos.isLive}
              <a class="w-full" href="https://www.twitch.tv/{liveInfos.user_name}" target="_blank">
                  <div class="w-auto flex flex-row items-center justify-center p-2 my-5 rounded-2xl border-4 border-red-600 bg-red-900">
                      <div class="w-8/10 text-mocha-text flex flex-col items-center mx-5 text-center">
                          <div class="flex flex-row items-center text-red-600">
                              <Radio/>
                              <p class="ml-3 text-2xl text-red-600 font-bold"> LIVE on {liveInfos.user_name}</p>
                          </div>
                          <p class="text-2xl text-red-600 font-bold">{liveInfos.viewers} viewers</p>
                          <p class="text-4xl">{liveInfos.title}</p>
                          <p class="text-3xl">Playing {liveInfos.game_name}</p>
                      </div>
                  </div>
              </a>
              <StreamEmbed username={liveInfos.user_name}/>
        {:else}
              <a class="w-full" href="/schedule" target="_blank">
                  <div class="w-auto flex flex-row items-center justify-center p-2 my-5 rounded-2xl border-4 border-mocha-border bg-mocha-inner-bg">
                      <div class="w-8/10 text-mocha-text flex flex-col items-center mx-5 text-center">
                          <div class="flex flex-row items-center">
                              <RadioOff/>
                              <p class="ml-3 text-2xl text-mocha-text font-bold">Currently Offiline</p>
                          </div>
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
