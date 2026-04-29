<script lang="ts">
    import { SignIn } from "@auth/sveltekit/components";
    import type { PageData } from "./$types";

    const { data } = $props<{
        data: PageData;
    }>();
</script>

<div class="w-screen h-screen bg-black">
    <div class="w-full h-full flex flex-col justify-center items-center">
        <span class="text-2xl text-center text-white">You are signed out</span>
        <SignIn
            provider={data.providerMap.find(
                (provider) => provider.id === "twitch",
            ).id}
            signInPage="api/twitch/signin"
            options={{ redirectTo: "/blueprint_trading_cards/inventory" }}
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
