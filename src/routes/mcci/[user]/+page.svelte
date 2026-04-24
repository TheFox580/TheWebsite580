<script lang="ts">
    import type { PageData } from "./$types";
    import MainInfos from "$lib/components/mcci/MainInfos.svelte";
    import BigNumbers from "$lib/components/mcci/BigNumbers.svelte";
    import CurrentCosmetics from "$lib/components/mcci/CurrentCosmetics.svelte";
    import Friends from "$lib/components/mcci/Friends.svelte";
    import BigBadges from "$lib/components/mcci/BigBadges.svelte";
    import AllCosmetics from "$lib/components/mcci/AllCosmetics.svelte";
    import Infinibag from "$lib/components/mcci/Infinibag.svelte";

    const { data } = $props<{
        data: PageData;
    }>();
</script>

<svelte:head>
    <link rel="stylesheet" href="/styles/default.css" />
    <title>{data.username}'s MCC Stats</title>
</svelte:head>

<div
    style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    class="flex flex-row justify-center items-center text-white"
>
    <div class="flex flex-col justify-evenly items-center w-screen" id="top">
        <MainInfos {data}></MainInfos>
        <BigNumbers {data}></BigNumbers>
        {#if data.collections}
            <CurrentCosmetics
                data={data.collections.equippedCosmetics}
                username={data.username}
            ></CurrentCosmetics>
        {/if}
        {#if data.social}
            <Friends data={data.social.friends}></Friends>
        {/if}
        {#if data.badges}
            <BigBadges data={data.badges}></BigBadges>
        {/if}
        {#if data.collections}
            <AllCosmetics data={data.collections.cosmetics}></AllCosmetics>
        {/if}
        {#if data.infinibag && data.collections}
            <Infinibag
                data={data.infinibag}
                fish_data={data.collections.fish}
                cosmetic_data={data.collections.cosmetics}
            ></Infinibag>
        {/if}
    </div>
</div>
