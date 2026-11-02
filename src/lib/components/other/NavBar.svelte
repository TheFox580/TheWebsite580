<script lang="ts">

    const { loc } = $props<{
        loc: string;
    }>();

    const locs = [
        {id: "home", name: "Home", loc: "/"},
        {id: "projects", name: "Projects", loc: "/projects"},
        {id: "schedule", name: "Schedule", loc: "/schedule"},
        {id: "mcci", name: "MCC Island Stats", loc: "/mcci/TheFox580"},
        {id: "mcsr", name: "MCSR Ranked Stats", loc: "/mcsr"},
        {id: "archipelago", name: "Archipelago", loc: "/archipelago"},
        {id: "cv", name: "CV", loc: "/cv"},
        {id: "resume", name: "Resume", loc: "/resume"},
        {id: "gamenights", name: "Game Nights", loc: "/gamenights"},
    ]
</script>

<div class="w-full h-auto flex flex-col items-center justify-evenly mx-3 text-center">
    {#each locs as uri}
        {#if uri.id === loc}
            <h2 class="my-2 text-3xl">➡ {uri.name}</h2>
        {:else}
            <h2 class="my-2 text-3xl"><a class="hover:underline cursor-pointer" href="{uri.loc}">{uri.name}</a></h2>
        {/if}
    {/each}
</div>
