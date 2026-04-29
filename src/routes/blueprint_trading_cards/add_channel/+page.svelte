<script lang="ts">
    import { SignIn } from "@auth/sveltekit/components";
    import type { PageData } from "./$types";

    const { data } = $props<{
        data: PageData;
    }>();
</script>

<div class="w-screen h-screen bg-black">
    <div class="w-full h-full flex flex-col justify-center items-center">
        {#if data.res.created}
            <h1 class="text-5xl mb-20 text-white">
                You already connected your account to the list.
            </h1>
        {:else}
            <h1 class="text-5xl mb-20 text-white">
                You haven't connected your account to the list.
            </h1>
        {/if}
        <span class="text-2xl text-center text-white"
            >Click on the button to add your channel to the allowed_channels
            list</span
        >
        <SignIn
            provider={data.providerMap.find(
                (provider) => provider.id === "twitch-bot",
            ).id}
            signInPage="api/twitch/signin"
            class="mt-5.5"
        >
            <span
                slot="submitButton"
                class="p-2.5 border-4 border-purple-800 rounded-xl bg-purple-500 text-center text-white cursor-pointer"
                >Sign In with Twitch</span
            >
        </SignIn>
    </div>
</div>
