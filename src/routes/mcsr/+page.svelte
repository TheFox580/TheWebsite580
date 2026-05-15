<script lang="ts">
    import type { MCSRData } from "$lib/interfaces/mcsr/MCSRData";
    import { onMount } from "svelte";
    import Head from "$lib/components/mcsr/Head.svelte";
    import LoginInfo from "$lib/components/mcsr/LoginInfo.svelte";
    import SeasonInfo from "$lib/components/mcsr/SeasonInfo.svelte";
    import EloInfo from "$lib/components/mcsr/EloInfo.svelte";
    import LastMatch from "$lib/components/mcsr/LastMatch.svelte";
    import LastTenMatches from "$lib/components/mcsr/LastTenMatches.svelte";

    let data: MCSRData = $state({});

    onMount(async () => {
        const res = await (
            await fetch("https://api.mcsrranked.com/users/TheFox580")
        ).json();
        data = res.data;
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="/styles/default.css" />
    <title>MCSR Stats</title>
</svelte:head>

<div
    class="flex flex-col justify-evenly items-center mt-5 p-10 rounded-2xl bg-neutral-400 w-full"
>
    {#if data.uuid}
        <Head></Head>
        <div class="w-full h-1 bg-gray-700 mt-5"></div>
        <div class="flex flex-row justify-evenly items-center m-2.5">
            <div class="flex flex-col justify-evenly items-center m-2.5">
                <LoginInfo data={data.timestamp}></LoginInfo>
                <SeasonInfo></SeasonInfo>
            </div>
            <div class="w-1 h-50 bg-gray-500 mt-5 mx-5 overflow-hidden"></div>
            <EloInfo {data}></EloInfo>
        </div>
        <div class="w-full h-1 bg-gray-700 mt-5"></div>
        <div class="flex flex-row justify-around items-center m-1.25">
            <LastMatch uuid={data.uuid}></LastMatch>
            <div class="w-1 h-50 bg-gray-500 mt-5 mx-5 overflow-hidden"></div>
            <LastTenMatches uuid={data.uuid}></LastTenMatches>
        </div>
    {:else}
        <div class="flex flex-row justify-evenly items-center">
            <h1 class="text-4xl font-bold">Loading data...</h1>
        </div>
    {/if}
</div>
