<script lang="ts">
    import type { Season } from "$lib/interfaces/funny_points_leaderboard/Season";
    import type { PageData } from "./$types";

    const { data } = $props<{
        data: PageData;
    }>();

    let seasons: Season[] = data.seasons;
</script>

<svelte:head>
    <link rel="stylesheet" href="/styles/default.css" />
    <title>Goofy Gang's Funny Points Leaderboard | Season List</title>
    <link
        rel="icon"
        href="https://cdn.discordapp.com/icons/1327430536494321807/a6703551a7b3a2597461905182707145.webp?size=512"
    />
</svelte:head>

<div class="flex flex-col justify-center items-center text-center">
    <h1 class="text-6xl m-10">All Funny Points Ranked Seasons</h1>
    <ul class="mt-15">
        {#each seasons as season}
            <li>
                <a
                    href={season.id === seasons.length
                        ? "/funny_points_leaderboard"
                        : `/funny_points_leaderboard/${season.url_name}`}
                    class="text-4xl"
                    >{season.name}{season.id === seasons.length
                        ? " (Current Season)"
                        : ""}</a
                >
            </li>
        {/each}
    </ul>
</div>
