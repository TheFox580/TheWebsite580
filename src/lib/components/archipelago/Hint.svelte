<script lang="ts">
    import type { Hint } from "archipelago.js";
    import Item from "$lib/components/archipelago/Item.svelte";

    const { hint, get } = $props<{
        hint: Hint;
        get: boolean;
    }>();

    const hint_infos: Hint = hint;
</script>

<Item item={hint_infos.item} get={true}></Item>
