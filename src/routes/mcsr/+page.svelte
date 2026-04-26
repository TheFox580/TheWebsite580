<script lang="ts">
    import type { PageData } from "./$types";
    import type { MCSRData } from "$lib/interfaces/mcsr/MCSRData";
    import Head from "$lib/components/mcsr/Head.svelte";
    import LoginInfo from "$lib/components/mcsr/LoginInfo.svelte";
    import EloInfo from "$lib/components/mcsr/EloInfo.svelte";
    import LastMatch from "$lib/components/mcsr/LastMatch.svelte";
    import LastTenMatches from "$lib/components/mcsr/LastTenMatches.svelte";

    const { data } = $props<{
        data: PageData;
    }>();

    const usableData: MCSRData = data;
</script>

<svelte:head>
    <link rel="stylesheet" href="/styles/default.css" />
    <title>MCSR Stats</title>
</svelte:head>

<div
    class="flex flex-col justify-evenly items-center mt-5 p-10 rounded-2xl bg-neutral-400 w-full"
>
    <Head></Head>
    <div class="w-full h-1 bg-gray-700 mt-5"></div>
    <div class="flex flex-row justify-evenly items-center m-2.5">
        <LoginInfo data={usableData.timestamp}></LoginInfo>
        <div class="w-1 h-50 bg-gray-500 mt-5 mx-5 overflow-hidden"></div>
        <EloInfo data={usableData}></EloInfo>
    </div>
    <div class="w-full h-1 bg-gray-700 mt-5"></div>
    <div class="flex flex-row justify-around items-center m-1.25">
        <LastMatch uuid={usableData.uuid}></LastMatch>
        <div class="w-1 h-50 bg-gray-500 mt-5 mx-5 overflow-hidden"></div>
        <LastTenMatches uuid={usableData.uuid}></LastTenMatches>
    </div>
</div>
