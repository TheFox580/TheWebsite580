<script lang="ts">
    import type { WeekSchedule } from "$lib/interfaces/schedule/Schedule";
    import type { PageData } from "./$types";
    import { z } from "$lib/functions/utils/numberFormatting";
    import { isFuture, isNow, isPast } from "$lib/functions/schedule/streamsInfo";
    import { getDay, getMonth } from "$lib/functions/utils/dateStuff";
    import NavBar from "$lib/components/other/NavBar.svelte";
    import { Radio, RadioOff, Calendar } from "@o7/icon/lucide";

    const { data } = $props<{
        data: PageData;
    }>();

    const weeks: WeekSchedule[] = data.weeks;

    const correct_week: WeekSchedule = $state(weeks[0]); //This week

    if (correct_week && correct_week.days) correct_week.days.sort((a, b) => a.time < b.time ? -1 : (b.time < a.time ? 1 : 0));

    function isEmptyOrSpaces(str:string): boolean{
        return str === null || str.match(/^ *$/) !== null;
    }
</script>

<svelte:head>
    <link rel="stylesheet" href="/styles/schedule/schedule.css" />
    {#if correct_week}
        <title>{correct_week.start_week.getDate()} - {correct_week.end_week.getDate()} | Weekly Stream Schedule</title>
    {/if}
    <title>No stream this week | Weekly Stream Schedule</title>
</svelte:head>

<div class="w-screen h-screen flex flex-row">
    <div class="w-1/5 flex flex-row items-center">
        <NavBar loc="schedule"></NavBar>
    </div>
    <div class="w-4/5 mx-5 flex flex-col">
        {#if !correct_week}
            <div class="bg-mocha-inner-bg flex flex-col items-center justify-center py-2 px-5 my-5 rounded-2xl border-mocha-border border-4">
                <p class="text-4xl text-center">No streams scheduled.</p>
            </div>
        {:else}
            <div class="bg-mocha-inner-bg flex flex-col items-center justify-center py-2 px-5 my-5 rounded-2xl border-mocha-border border-4">
                <p class="text-4xl text-center">{correct_week.days.length} stream{correct_week.days.length != 1 ? "s" : ""} scheduled from {getDay(correct_week.start_week.getDay())} {correct_week.start_week.getDate()} to {getDay(correct_week.end_week.getDay())} {correct_week.end_week.getDate()}</p>
            </div>
            {#each correct_week.days as stream}
                <a href="https://www.twitch.tv/{stream.channel}" target="_blank">
                    <div class="{isNow(stream) ? "live" : (isPast(stream) ? "past" : "future")} w-full flex flex-row items-center justify-center p-2 my-5 rounded-2xl border-4">
                        <div class="w-{!isEmptyOrSpaces(stream.image_name) ? "8/10" : "full"} h-full text-mocha-text flex flex-col items-center justify-center mx-5 text-center">
                            {#if isNow(stream)}
                                <div class="flex flex-row items-center text-mocha-red">
                                    <Radio/>
                                    <p class="ml-3 text-2xl">Live</p>
                                </div>
                            {:else if isFuture(stream)}
                                <div class="flex flex-row items-center text-mocha-green">
                                    <Calendar/>
                                    <p class="ml-3 text-2xl">Upcoming</p>
                                </div>
                            {:else}
                                <div class="flex flex-row items-center">
                                    <RadioOff/>
                                    <p class="ml-3 text-2xl text-mocha-text">Done</p>
                                </div>
                            {/if}
                            <p class="text-4xl">{stream.title}</p>
                            <p class="text-3xl">{stream.category}</p>
                            <p class="text-2xl">{getDay(new Date(stream.time*1000).getDay())} {new Date(stream.time*1000).getDate()} from {z(new Date(stream.time*1000).getHours())}:{z(new Date(stream.time*1000).getMinutes())} to {z(new Date((stream.time+stream.estimated_length*60)*1000).getHours())}:{z(new Date((stream.time+stream.estimated_length*60)*1000).getMinutes())}</p>
                        </div>
                        {#if !isEmptyOrSpaces(stream.image_name)}
                          <img src="/img/schedule/{stream.image_name}" alt={stream.image_name} class="w-60 rounded-xl h-36"/>
                        {/if}
                    </div>
                </a>
            {/each}
        {/if}
    </div>
</div>
