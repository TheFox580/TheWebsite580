<script lang="ts">
    import Cosmetic from "./Cosmetic.svelte";

    const { data, username } = $props<{
        data: Object;
        username: string;
    }>();
</script>

<div class="flex flex-row items-center justify-center w-9/10">
    <div
        class="flex flex-col justify-evenly items-center m-5 p-10 rounded-xl bg-neutral-400 w-full"
    >
        <h1 class="font-bold text-5xl mb-10">Current Wardrobe</h1>
        <div class="grid grid-cols-4 gap-2.5 auto-rows-(minmax(50px, auto))">
            {#each data as cosmetic}
                <Cosmetic data={cosmetic} {username} isOwned={true}></Cosmetic>
            {/each}
        </div>
    </div>
</div>
