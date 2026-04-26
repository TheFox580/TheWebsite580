<script lang="ts">
    import Asset from "./Asset.svelte";

    const { data, fish_data, cosmetic_data } = $props<{
        data: Object;
        fish_data: Object;
        cosmetic_data: Object;
    }>();
</script>

<div class="flex flex-row items-center justify-center w-9/10">
    <div
        class="flex flex-col justify-evenly items-center m-5 p-10 rounded-xl bg-neutral-400 w-full"
    >
        <h1 class="font-bold text-5xl mb-10">Infinibag Collection</h1>
        <div class="grid grid-cols-3 gap-2.5 auto-rows-auto w-8/10">
            {#each data as asset}
                <Asset data={asset} {fish_data} {cosmetic_data}></Asset>
            {/each}
        </div>
    </div>
</div>
