<script lang="ts">
    import { page } from "$app/state";


</script>

<div class="w-screen h-screen bg-black flex flex-col items-center justify-center">
    <h1 class="text-white text-4xl">{page.status} Error</h1>
    <h2 class="text-white text-3xl">{page.url.pathname} {page.error?.message}</h2>
    <a class="text-white text-2xl hover:underline cursor-pointer mt-5" href="/">Return to home ↗</a>
</div>
