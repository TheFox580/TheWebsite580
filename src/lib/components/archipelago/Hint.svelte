<script lang="ts">
    import type { Hint, Item } from "archipelago.js";

    const { hint, get } = $props<{
        hint: Hint;
        get: boolean;
    }>();

    const hint_infos: Hint = hint;
    const item: Item = hint_infos.item;
</script>

<tr
    class="w-full flex flex-row items-center justify-center bg-gray-800 border-2 border-gray-400"
>
    {#if !get}
        <td class="text-center font-bold w-1/3">{item.receiver.name}</td>
    {/if}
    <td class="text-center font-bold w-1/3">{item.name}</td>
    <td class="text-center font-bold w-1/3">{item.locationName}</td>
    {#if get}
        <td class="text-center font-bold w-1/3">{item.sender.name}</td>
    {/if}
</tr>
