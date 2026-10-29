<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import type { MusicData } from "$lib/interfaces/other/MusicData";
    import { z, formatNumber } from "$lib/functions/utils/numberFormatting";
    import ProgressBar from "../mcci/ProgressBar.svelte";
    import { dev } from "$app/environment";

    let musicData: MusicData = $state(null);
    let ws : WebSocket = $state();

    let cover : HTMLElement = $state();

    onMount(() => {
        if (!ws){
            ws = new WebSocket("wss://music.thefox580.me/api/v1/ws");

            ws.addEventListener("message", (event) => {
                const wsData = JSON.parse(event.data);
                if (dev) console.log(wsData);

                if (wsData.type === "PLAYER_INFO") {
                    musicData = wsData.song;
                    musicData.repeat = wsData.repeat;
                    musicData.shuffle = wsData.shuffle;

                    if (cover && !musicData.isPaused){
                        cover.classList.add("cover");
                    } else {
                        cover.classList.remove("cover");
                    }
                } else if (wsData.type === "PLAYER_STATE_CHANGED") {
                    musicData.isPaused = !wsData.isPlaying;
                    musicData.elapsedSeconds = Math.floor(wsData.position);

                    if (cover){
                        if (!musicData.isPaused){
                            cover.classList.add("cover");
                        } else {
                            cover.classList.remove("cover");
                        }
                    }
                } else if (wsData.type === "POSITION_CHANGED") {
                    musicData.elapsedSeconds = Math.floor(wsData.position);
                } else if (wsData.type === "VIDEO_CHANGED") {
                    const repeat = musicData.repeat;
                    const shuffle = musicData.shuffle;

                    musicData = wsData.song;

                    musicData.repeat = repeat;
                    musicData.shuffle = shuffle;

                    if (cover){
                        if (!musicData.isPaused){
                            cover.classList.add("cover");
                        } else {
                            cover.classList.remove("cover");
                        }
                    }
                } else if (wsData.type === "REPEAT_CHANGED") {
                    musicData.repeat = wsData.repeat;
                } else if (wsData.type === "SHUFFLE_CHANGED") {
                    musicData.shuffle = wsData.shuffle;
                }
            });
        }
    });

    onDestroy(() => {
        if (ws) ws.close();
    })
</script>

<div class="w-120 h-auto bg-neutral-700 border-4 border-neutral-400 rounded-xl py-2 px-3 text-center flex flex-row items-center justify-center">

    <div class="w-30 h-full mx-3">
        {#if musicData}
            <a href={musicData.url} target="_blank" class="w-full h-full"><img src={musicData.imageSrc} alt="{musicData.album}'s Cover Art" bind:this={cover} class="w-auto h-auto rounded-xl cover"></a>
        {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-audio-lines-off preview-icon"><path d="M10 10v11"/><path d="M10 3v1.35"/><path d="M14 14v1"/><path d="M14 8v.35"/><path d="M18 5v7.35"/><path d="M2 10v3"/><path d="m2 2 20 20"/><path d="M22 10v3"/><path d="M6 6v11"/></svg>
        {/if}
    </div>

    <div class="w-85 h-full mx-3 flex flex-col items-center justify-evenly">
            {#if musicData}
                <div class="flex flex-col mb-2">
                    <a class="hover:underline" target="_blank" href={musicData.url}>{musicData.title}</a>
                    <a class="hover:underline" target="_blank" href={musicData.artistUrl}>{musicData.artist}</a>
                    {#if musicData.playlistId !== "LM"}
                        <a class="hover:underline" target="_blank" href={"https://music.youtube.com/playlist?list=" + musicData.playlistId}>{musicData.album}</a>
                    {:else}
                    <p>{musicData.album}</p>
                    {/if}
                </div>
                <div class="w-full flex flex-col mt-2">
                    <div class="w-full flex flew-row justify-between mb-1">
                        <div class="flex flex-row">
                            {#if musicData.isPaused}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause preview-icon mx-1">
                                    <title>Paused</title>
                                    <rect x="14" y="3" width="5" height="18" rx="1"/>
                                    <rect x="5" y="3" width="5" height="18" rx="1"/>
                                </svg>
                            {:else}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play preview-icon mx-1">
                                    <title>Playing</title>
                                    <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/>
                                </svg>
                            {/if}
                            {#if musicData.repeat === "ONE"}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-repeat-1 preview-icon mx-1">
                                    <title>Repeating this song</title>
                                    <path d="m17 2 4 4-4 4"/>
                                    <path d="M3 11v-1a4 4 0 0 1 4-4h14"/>
                                    <path d="m7 22-4-4 4-4"/>
                                    <path d="M21 13v1a4 4 0 0 1-4 4H3"/>
                                    <path d="M11 10h1v4"/>
                                </svg>
                            {:else if musicData.repeat === "ALL"}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-repeat preview-icon mx-1">
                                    <title>Repeating my playlist</title>
                                    <path d="m17 2 4 4-4 4"/>
                                    <path d="M3 11v-1a4 4 0 0 1 4-4h14"/>
                                    <path d="m7 22-4-4 4-4"/>
                                    <path d="M21 13v1a4 4 0 0 1-4 4H3"/>
                                </svg>
                            {:else}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-repeat-off preview-icon mx-1">
                                    <title>Not repeating</title>
                                    <path d="M11.656 6H21l-4-4"/>
                                    <path d="M17.898 17.898A4 4 0 0 1 17 18H3l4-4"/>
                                    <path d="m2 2 20 20"/>
                                    <path d="M21 13v1a4 4 0 0 1-.171 1.159"/>
                                    <path d="m21 6-4 4"/>
                                    <path d="M3 11v-1a4 4 0 0 1 3.102-3.898"/>
                                    <path d="m7 22-4-4"/>
                                </svg>
                            {/if}
                            {#if musicData.shuffle}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shuffle preview-icon mx-1">
                                    <title>Shuffling</title>
                                    <path d="m18 14 4 4-4 4"/>
                                    <path d="m18 2 4 4-4 4"/>
                                    <path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22"/>
                                    <path d="M2 6h1.972a4 4 0 0 1 3.6 2.2"/>
                                    <path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45"/>
                                </svg>
                            {/if}
                        </div>
                        <p class="mx-1">{z(Math.floor(musicData.elapsedSeconds/60))}:{z(musicData.elapsedSeconds%60)} / {z(Math.floor(musicData.songDuration/60))}:{z(musicData.songDuration%60)}</p>
                    </div>
                    {#key musicData.elapsedSeconds}
                        <ProgressBar
                            total={musicData.songDuration}
                            progress={musicData.elapsedSeconds}
                            background_color={"#000000"}
                            foreground_color={"#ffffff"}
                            bar_height={3}
                        />
                    {/key}
                </div>
            {:else}
                <div>No music playing.</div>
            {/if}
    </div>
</div>

<style>
    @keyframes rotate{
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    img.cover{
        animation: rotate 10s infinite linear;
    }
</style>
