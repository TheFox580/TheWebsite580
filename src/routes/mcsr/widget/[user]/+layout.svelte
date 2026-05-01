<script lang="ts">
    import { QueryClientProvider } from "@tanstack/svelte-query";
    import type { LayoutData } from "./$types";

    const { data } = $props<{
        data: LayoutData;
    }>();
</script>

<QueryClientProvider client={data.queryClient}>
    <slot />
</QueryClientProvider>
