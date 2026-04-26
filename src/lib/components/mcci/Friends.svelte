<script lang="ts">
    import Friend from "./Friend.svelte";

    const { data } = $props<{
        data: Object;
    }>();
</script>

<div class="flex flex-row items-center justify-center w-9/10">
    <div
        class="flex flex-col justify-evenly items-center m-5 p-10 rounded-xl bg-neutral-400 w-full"
    >
        <h1 class="font-bold text-5xl mb-10">Friends</h1>
        <div class="grid grid-cols-4 gap-2.5 auto-rows-auto">
            {#each data as friend}
                <Friend data={friend}></Friend>
            {/each}
        </div>
    </div>
</div>
