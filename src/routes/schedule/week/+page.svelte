<script lang="ts">
    import type { WeekSchedule } from "$lib/interfaces/schedule/Schedule";
    import type { PageData } from "./$types";
    import { z } from "$lib/functions/funny_points_leaderboard/Time";
    import { getDay, getMonth, isFuture, isNow, isPast } from "$lib/functions/schedule/streamsInfo";

    const { data } = $props<{
        data: PageData;
    }>();

    const weeks: WeekSchedule[] = data.weeks;

    const correct_week: WeekSchedule = $state(weeks[0]); //This week

    correct_week.days.sort((a, b) => a.time < b.time ? -1 : (b.time < a.time ? 1 : 0));
</script>

<svelte:head>
    <link rel="stylesheet" href="/styles/schedule/schedule.css" />
    <title>{correct_week.start_week.getDate()} - {correct_week.end_week.getDate()} | Weekly Stream Schedule</title>
</svelte:head>

<div class="w-full h-full">
    {#if correct_week.days.length === 0}
        <div class="bg-neutral-500 flex flex-col items-center justify-center py-2 px-5 my-5 rounded-2xl border-neutral-300 border-4">
            <p class="text-4xl text-center">No streams scheduled from {getDay(correct_week.start_week.getDay())} {correct_week.start_week.getDate()} to {getDay(correct_week.end_week.getDay())} {correct_week.end_week.getDate()}</p>
        </div>
    {:else}
        <div class="bg-neutral-500 flex flex-col items-center justify-center py-2 px-5 my-5 rounded-2xl border-neutral-300 border-4">
            <p class="text-4xl text-center">{correct_week.days.length} stream{correct_week.days.length != 1 ? "s" : ""} scheduled from {getDay(correct_week.start_week.getDay())} {correct_week.start_week.getDate()} to {getDay(correct_week.end_week.getDay())} {correct_week.end_week.getDate()}</p>
        </div>
        {#each correct_week.days as stream}
            <a href="https://www.twitch.tv/{stream.channel}" target="_blank">
                <div class="{isNow(stream) ? "live" : (isPast(stream) ? "past" : "future")} w-full flex flex-row items-center justify-center p-2 my-5 rounded-2xl border-4"
                    style="height: {Math.round((1/correct_week.days.length)*100)}%;">
                    <div class="w-8/10 h-full text-white flex flex-col items-center justify-center mx-5 text-center">
                        {#if isNow(stream)}
                            <p class="text-2xl text-red-600 font-bold">🔴 LIVE</p>
                        {:else if isFuture(stream)}
                            <p class="text-2xl text-green-400">🟢 Upcoming</p>
                        {:else}
                            <p class="text-2xl text-green-400">🟢 Done</p>
                        {/if}
                        <p class="text-4xl">{stream.title}</p>
                        <p class="text-3xl">{stream.category}</p>
                        <p class="text-2xl">{getDay(new Date(stream.time*1000).getDay())} {new Date(stream.time*1000).getDate()} from {z(new Date(stream.time*1000).getHours())}:{z(new Date(stream.time*1000).getMinutes())} to {z(new Date((stream.time+stream.estimated_length*60)*1000).getHours())}:{z(new Date((stream.time+stream.estimated_length*60)*1000).getMinutes())}</p>
                    </div>
                   <img src="/img/schedule/{stream.image_name}" alt={stream.image_name} class="w-60 rounded-xl h-36"/>
                </div>
            </a>
        {/each}
    {/if}
</div>
