<script lang="ts">
    import { listener } from "$lib/functions/twitch/twitchSocket";
    import type { PageData } from "./$types";
    const userId = "126869447";

    const { data } = $props<{
        data: PageData;
    }>();

    console.log(data);
</script>
