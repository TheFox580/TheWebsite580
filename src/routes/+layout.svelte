<script lang="ts">
    import "./layout.css";
    import favicon from "$lib/assets/favicon.ico";
    import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
    import { inject } from "@vercel/analytics";

    inject();
    injectSpeedInsights();

    let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
