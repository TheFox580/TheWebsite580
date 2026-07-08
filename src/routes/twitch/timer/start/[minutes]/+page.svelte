<script lang="ts">
    import { onMount } from "svelte";
    import type { PageData } from "./$types";

    const { data } = $props<{
        data: PageData;
    }>();

    let timeLeft: number = $state(data.minutes * 60 * 100);

    onMount(() => {
        setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
            }
        }, 10);
    });

    function formatted(time: number): string {
        const milli = time % 100;
        const secs = Math.floor((time - milli) / 100);
        const min = Math.floor(secs / 60);
        return `${min < 10 ? "0" : ""}${min}:${secs % 60 < 10 ? "0" : ""}${secs % 60}.${milli < 10 ? "0" : ""}${milli}`;
    }
</script>

<svelte:head>
    <link rel="stylesheet" href="/styles/default.css" />
    <title>Stream timer</title>
</svelte:head>

<div class="flex flex-col items-center justify-center w-screen h-screen">
    <h1 class="text-center text-6xl text-white">Début dans dans :</h1>
    <h1 class="text-center text-6xl text-white">{formatted(timeLeft)}</h1>
</div>
