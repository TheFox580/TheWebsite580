<script lang="ts">
    import { getSeason } from "$lib/functions/funny_points_leaderboard/GetSeasons";
    import type { SeasonDate } from "$lib/interfaces/funny_points_leaderboard/Date";
    import type { Season } from "$lib/interfaces/funny_points_leaderboard/Season";
    import type { PageData } from "./$types";

    const { data } = $props<{
        data: PageData;
    }>();

    let seasons: SeasonDate[] = data.seasons;

    let last_season: Season = getSeason(
        seasons.filter(
            (season) => season.start_time.getTime() < new Date().getTime(),
        )[
            seasons.filter(
                (season) => season.start_time.getTime() < new Date().getTime(),
            ).length - 1
        ].season,
    );
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
            {#if season.season <= last_season.id}
                <li>
                    <a
                        href={season.season === last_season.id
                            ? "/funny_points_leaderboard"
                            : `/funny_points_leaderboard/${getSeason(season.season).url_name}`}
                        class="text-4xl"
                        >{getSeason(season.season).name}{season.season ===
                        last_season.id
                            ? " (Current Season)"
                            : ""}</a
                    >
                </li>
            {/if}
        {/each}
    </ul>
</div>
