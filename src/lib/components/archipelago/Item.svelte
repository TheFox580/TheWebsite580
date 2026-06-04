<script lang="ts">
    import type { Hint, Item } from "archipelago.js";

    const { item, get } = $props<{
        item: Item;
        get: boolean;
    }>();
</script>

<tr
    class="w-full flex flex-row items-center justify-center bg-gray-800 border-2 border-gray-400"
>
    {#if !get}
        <td class="text-center font-bold w-1/3"
            >{item.receiver.name.replaceAll("_", " ")}</td
        >
    {/if}
    <td class="text-center font-bold w-1/3">{item.name.replaceAll("_", " ")}</td
    >
    <td class="text-center font-bold w-1/3"
        >{item.locationName.replaceAll("_", " ")}</td
    >
    {#if get}
        <td class="text-center font-bold w-1/3"
            >{item.sender.name.replaceAll("_", " ")}</td
        >
    {/if}
</tr>
