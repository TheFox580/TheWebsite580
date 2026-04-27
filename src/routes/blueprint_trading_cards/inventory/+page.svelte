<script lang="ts">
    import { SignOut } from "@auth/sveltekit/components";
    import type { PageData } from "./$types";
    import type { Inventory } from "$lib/interfaces/blueprint_trading_cards/Inventory";
    import type { Card } from "$lib/interfaces/blueprint_trading_cards/Card";

    const { data } = $props<{
        data: PageData;
    }>();

    const inv = <Inventory>data.inv;
    const cards = <Card[]>data.cards;
</script>

<svelte:head>
    <link
        rel="stylesheet"
        href="/styles/blueprint_trading_cards/inventory.css"
    />
</svelte:head>

<div class="w-screen h-screen flex flex-col">
    <div class="w-full h-[10%] flex justify-center items-center">
        <span class="mr-5 text-center text-white"
            >Signed in as {data.session.user.name}</span
        >
        <SignOut
            signOutPage="api/twitch/signout"
            options={{ redirectTo: "/blueprint_trading_cards" }}
        >
            <span
                slot="submitButton"
                class="p-2.5 border-4 border-purple-800 rounded-xl bg-purple-500 text-center text-white cursor-pointer"
                >Sign Out</span
            >
        </SignOut>
    </div>
    <div class="w-full h-[90%] flex flex-col justify-center items-center">
        {#if inv.user_id === "0"}
            <h1 class="text-5xl font-bold text-center text-white mb-20">
                There was an error retreiving your inventory.
            </h1>
            <h2 class="text-3xl font-bold text-center text-white mb-5">
                Make sure your Twitch Display Name is the same as your Twitch
                Username.
            </h2>
            <a
                href="https://www.twitch.tv/settings/profile"
                target="_blank"
                class="text-3xl font-bold text-center text-white"
            >
                I'm gonna check.
            </a>
        {:else}
            <h1 class="text-5xl font-bold text-center text-white mb-20">
                {inv.name}'s invetory:
            </h1>
            <div class="w-full grid grid-cols-4 gap-2.5 auto-rows-auto">
                {#if inv.cards.length}
                    {#each inv.cards as card}
                        <h2 class="text-3xl text-center text-white">
                            Card: {cards.find(
                                (toFind) => toFind.id === card.card_id,
                            )?.name}
                        </h2>
                    {/each}
                {:else}
                    <h2 class="text-3xl text-center text-white">
                        You have no cards.
                    </h2>
                {/if}
            </div>
        {/if}
    </div>
</div>
