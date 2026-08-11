<script lang="ts">

  import { z } from "$lib/functions/funny_points_leaderboard/Time";

  let isTimerOn: boolean = $state(false);

  let timer: NodeJS.Timeout;
  let time: number = $state(0);

  let color: string = $state("oklch(62.3% 0.214 259.815)")

  function toggleTimer(){
    if (isTimerOn){
      color = "oklch(62.3% 0.214 259.815)";
      isTimerOn = false;
      clearInterval(timer);
    } else {
      color = "oklch(72.3% 0.219 149.579)";
      isTimerOn = true;
      timer = setInterval(() => {
        time++;
      }, 1000); //Add 1 second to the timer every second
    }
  }

  function getFormattedTime(): string{
    const secs = time % 60;
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);

    return `${z(hours)}:${z(minutes)}:${z(secs)}`
  }

</script>

<svelte:head>
    <link rel="stylesheet" href="/styles/mcsr/widget.css" />
    <style>
      html {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: bold;
        background-color: rgba(0, 0, 0, 0);
      }
    </style>
</svelte:head>

<button
  class="w-full h-screen flex flex-col justify-center items-center"
  onclick={toggleTimer}>
    <p class="text-7xl" style="color:{color}; text-shadow: 2px 2px 3px black;">{getFormattedTime()}</p>
</button>
