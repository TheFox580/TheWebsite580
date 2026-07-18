<script lang="ts">
    import type { Stream } from "$lib/interfaces/schedule/Schedule";
    import type { PageData } from "./$types";
    import { z } from "$lib/functions/funny_points_leaderboard/Time";
    import { getMonth } from "$lib/functions/schedule/streamsInfo";

    const { data } = $props<{
        data: PageData;
    }>();

    const old_streams: Stream[] = data.old_streams;
    const current_streams: Stream[] = data.current_streams;
    const next_streams: Stream[] = data.next_streams;


</script>

<svelte:head>
    <link rel="stylesheet" href="/styles/schedule/schedule.css" />
    <title>Fox's Stream Schedule</title>
</svelte:head>


<div class="w-full h-full">
    <div class="bg-neutral-500 flex flex-col items-center justify-center py-2 px-5 my-5 rounded-2xl border-neutral-300 border-4">
        <p class="text-4xl text-center">Stream Schedule</p>
    </div>
    {#each old_streams as old_stream}
        <a href="https://www.twitch.tv/{old_stream.channel}" target="_blank">
            <div class="past w-full flex flex-row items-center justify-center p-2 my-5 rounded-2xl border-4"
                style="height: {Math.round((1/old_streams.length + current_streams.length + next_streams.length)*100)}%;">
                <div class="w-8/10 h-full text-white flex flex-col items-center justify-center mx-5 text-center">
                    <p class="text-2xl text-green-400">🟢 Done</p>
                    <p class="text-4xl">{old_stream.title}</p>
                    <p class="text-3xl">{old_stream.category}</p>
                    <p class="text-2xl">{getMonth(new Date(old_stream.time*1000).getMonth())} {new Date(old_stream.time*1000).getDate()} from {z(new Date(old_stream.time*1000).getHours())}:{z(new Date(old_stream.time*1000).getMinutes())} to {z(new Date((old_stream.time+old_stream.estimated_length*60)*1000).getHours())}:{z(new Date((old_stream.time+old_stream.estimated_length*60)*1000).getMinutes())}</p>
                </div>
                <img src="/img/schedule/{old_stream.image_name}" alt={old_stream.image_name} class="w-60 rounded-xl h-36"/>
            </div>
        </a>
    {/each}
    {#each current_streams as current_stream}
        <a href="https://www.twitch.tv/{current_stream.channel}" target="_blank">
            <div class="live w-full flex flex-row items-center justify-center p-2 my-5 rounded-2xl border-4"
                style="height: {Math.round((1/old_streams.length + current_streams.length + next_streams.length)*100)}%;">
                <div class="w-8/10 h-full text-white flex flex-col items-center justify-center mx-5 text-center">
                    <p class="text-2xl text-red-600 font-bold">🔴 LIVE</p>
                    <p class="text-4xl">{current_stream.title}</p>
                    <p class="text-3xl">{current_stream.category}</p>
                    <p class="text-2xl">{getMonth(new Date(current_stream.time*1000).getMonth())} {new Date(current_stream.time*1000).getDate()} from {z(new Date(current_stream.time*1000).getHours())}:{z(new Date(current_stream.time*1000).getMinutes())} to {z(new Date((current_stream.time+current_stream.estimated_length*60)*1000).getHours())}:{z(new Date((current_stream.time+current_stream.estimated_length*60)*1000).getMinutes())}</p>
                </div>
                <img src="/img/schedule/{current_stream.image_name}" alt={current_stream.image_name} class="w-60 rounded-xl h-36"/>
            </div>
        </a>
    {/each}
    {#each next_streams as next_stream}
        <a href="https://www.twitch.tv/{next_stream.channel}" target="_blank">
            <div class="future w-full flex flex-row items-center justify-center p-2 my-5 rounded-2xl border-4"
                style="height: {Math.round((1/old_streams.length + next_streams.length + next_streams.length)*100)}%;">
                <div class="w-8/10 h-full text-white flex flex-col items-center justify-center mx-5 text-center">
                    <p class="text-2xl text-green-400">🟢 Upcoming</p>
                    <p class="text-4xl">{next_stream.title}</p>
                    <p class="text-3xl">{next_stream.category}</p>
                    <p class="text-2xl">{getMonth(new Date(next_stream.time*1000).getMonth())} {new Date(next_stream.time*1000).getDate()} from {z(new Date(next_stream.time*1000).getHours())}:{z(new Date(next_stream.time*1000).getMinutes())} to {z(new Date((next_stream.time+next_stream.estimated_length*60)*1000).getHours())}:{z(new Date((next_stream.time+next_stream.estimated_length*60)*1000).getMinutes())}</p>
                </div>
                <img src="/img/schedule/{next_stream.image_name}" alt={next_stream.image_name} class="w-60 rounded-xl h-36"/>
            </div>
        </a>
    {/each}
</div>
