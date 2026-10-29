<script lang="ts">
    import { onMount } from "svelte";
    import type { MusicData } from "$lib/interfaces/other/MusicData";
    import { z, formatNumber } from "$lib/functions/utils/numberFormatting";
    import ProgressBar from "../mcci/ProgressBar.svelte";

    let musicData: MusicData = $state(null);


    onMount(async () => {

        fetch("https://91.68.27.158:26538/api/v1/song")
        .then(response => {
            if (!response.ok){
                throw new Error("Server is offline");
            }
            return response.json();
        })
        .then(data => {
            musicData = data;
        })
        .catch((e) => {
            console.log({error: e});
        });
    })
</script>

<div class="w-120 h-auto bg-neutral-700 border-4 border-neutral-400 rounded-xl py-2 px-3 text-center flex flex-row items-center justify-center">

    <div class="w-30 h-full mx-3">
        {#if musicData}
            <a href={musicData.url} target="_blank" class="w-full h-full"><img src={musicData.imageSrc} alt="{musicData.album}'s Cover Art" class="w-auto h-auto rounded-xl"></a>
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
                        {#if musicData.isPaused}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause preview-icon"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg>
                        {:else}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play preview-icon"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>
                        {/if}
                        <p>{z(Math.floor(musicData.elapsedSeconds/60))}:{z(musicData.elapsedSeconds%60)} / {z(Math.floor(musicData.songDuration/60))}:{z(musicData.songDuration%60)}</p>
                    </div>
                    <ProgressBar
                        total={musicData.songDuration}
                        progress={musicData.elapsedSeconds}
                        background_color={"#000000"}
                        foreground_color={"#ffffff"}
                        bar_height={3}
                    />
                </div>
            {:else}
                <div>No music playing.</div>
            {/if}
    </div>

</div>
