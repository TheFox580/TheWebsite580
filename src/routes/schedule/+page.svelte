<script lang="ts">
    import type { DaySchedule } from "$lib/interfaces/schedule/Schedule";
    import type { PageData } from "./$types";
    import { z } from "$lib/functions/funny_points_leaderboard/Time";

    const { data } = $props<{
        data: PageData;
    }>();

    const old_streams: DaySchedule[] = data.old_streams;
    const current_streams: DaySchedule[] = data.current_streams;
    const next_streams: DaySchedule[] = data.next_streams;

    function getDay(week_day: number){
      while (week_day < 1) week_day += 7;
      while (week_day > 7) week_day -= 7;
      switch (week_day){
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thrusday";
        case 5: return "Friday";
        case 6: return "Satruday";
        case 7: return "Sunday";
        default: return "None"
      }
    }

    function getMonth(month: number){
      while (month < 0) month += 12;
      while (month > 11) month -= 12;
      switch (month){
        case 0: return "January";
        case 1: return "February";
        case 2: return "March";
        case 3: return "April";
        case 4: return "May";
        case 5: return "June";
        case 6: return "July";
        case 7: return "August";
        case 8: return "September";
        case 9: return "October";
        case 10: return "November";
        case 11: return "December";
        default: return "None"
      }
    }

    function isNow(stream: DaySchedule): boolean{
      const end_time = new Date(stream.time.getTime()+stream.estimated_length*60*1000);
      const now = new Date();

      return stream.time <= now && now < end_time;
    }

    function isPast(stream: DaySchedule): boolean{
      const end_time = new Date(stream.time.getTime()+stream.estimated_length*60*1000);
      const now = new Date();

      return end_time <= now;
    }

    function isFuture(stream: DaySchedule): boolean{
      const now = new Date();

      return now < stream.time;
    }


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
                <div class="w-8/10 h-full text-white flex flex-col items-center mx-5 text-center">
                    <p class="text-2xl text-green-400">🟢 Done</p>
                    <p class="text-4xl">{old_stream.title}</p>
                    <p class="text-3xl">{old_stream.category}</p>
                    <p class="text-2xl">{getMonth(old_stream.time.getMonth())} {old_stream.time.getDate()} from {z(old_stream.time.getHours())}:{z(old_stream.time.getMinutes())} to {z(new Date(old_stream.time.getTime()+old_stream.estimated_length*60*1000).getHours())}:{z(new Date(old_stream.time.getTime()+old_stream.estimated_length*60*1000).getMinutes())}</p>
                </div>
                <img src="/img/schedule/{old_stream.image_name}" alt={old_stream.image_name} class="w-60 rounded-xl h-36"/>
            </div>
        </a>
    {/each}
    {#each current_streams as current_stream}
        <a href="https://www.twitch.tv/{current_stream.channel}" target="_blank">
            <div class="live w-full flex flex-row items-center justify-center p-2 my-5 rounded-2xl border-4"
                style="height: {Math.round((1/old_streams.length + current_streams.length + next_streams.length)*100)}%;">
                <div class="w-8/10 h-full text-white flex flex-col items-center mx-5 text-center">
                    <p class="text-2xl text-red-600 font-bold">🔴 LIVE</p>
                    <p class="text-4xl">{current_stream.title}</p>
                    <p class="text-3xl">{current_stream.category}</p>
                    <p class="text-2xl">{getMonth(current_stream.time.getMonth())} {current_stream.time.getDate()} from {z(current_stream.time.getHours())}:{z(current_stream.time.getMinutes())} to {z(new Date(current_stream.time.getTime()+current_stream.estimated_length*60*1000).getHours())}:{z(new Date(current_stream.time.getTime()+current_stream.estimated_length*60*1000).getMinutes())}</p>
                </div>
                <img src="/img/schedule/{current_stream.image_name}" alt={current_stream.image_name} class="w-60 rounded-xl h-36"/>
            </div>
        </a>
    {/each}
    {#each next_streams as next_stream}
        <a href="https://www.twitch.tv/{next_stream.channel}" target="_blank">
            <div class="future w-full flex flex-row items-center justify-center p-2 my-5 rounded-2xl border-4"
                style="height: {Math.round((1/old_streams.length + next_streams.length + next_streams.length)*100)}%;">
                <div class="w-8/10 h-full text-white flex flex-col items-center mx-5 text-center">
                    <p class="text-2xl text-green-400">🟢 Upcoming</p>
                    <p class="text-4xl">{next_stream.title}</p>
                    <p class="text-3xl">{next_stream.category}</p>
                    <p class="text-2xl">{getMonth(next_stream.time.getMonth())} {next_stream.time.getDate()} from {z(next_stream.time.getHours())}:{z(next_stream.time.getMinutes())} to {z(new Date(next_stream.time.getTime()+next_stream.estimated_length*60*1000).getHours())}:{z(new Date(next_stream.time.getTime()+next_stream.estimated_length*60*1000).getMinutes())}</p>
                </div>
                <img src="/img/schedule/{next_stream.image_name}" alt={next_stream.image_name} class="w-60 rounded-xl h-36"/>
            </div>
        </a>
    {/each}
</div>
