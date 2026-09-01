<script lang="ts">
    import type { PageData } from "./$types";
    import { SignIn } from "@auth/sveltekit/components";
    import { SignOut } from "@auth/sveltekit/components";
    import { isEmpty } from "$lib/functions/utils/isEmpty"
    import { getMonth } from "$lib/functions/utils/dateStuff";
    import { dev } from "$app/environment";
    import type { Game } from "$lib/interfaces/gamenights/Game";
    import type { DiscordUser } from "$lib/interfaces/gamenights/User";

    const { data } = $props<{
        data: PageData;
    }>();

    const game: Game = data.game;
    const game_time: Date = new Date(game.time*1000);
    let signed_up: boolean = $state(data.signed_up);
    let signed_up_amount: number = $state(data.signed_up_amount);

    const backend_url = dev ? "http://127.0.0.1:8787" : "https://thefox580-backend.zoelliotmitong.workers.dev"

    async function signUp(){
        signed_up = true;
        signed_up_amount++;

        const send_data: DiscordUser = {
            id: data.session.providerAccountId,
            name: data.session.user.name,
            image: data.session.user.image
        }

        await fetch(backend_url + "/api/gamenights/sign_up", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(send_data)
          });
    }

    async function signOut(){
        signed_up = false;
        signed_up_amount--;

        const send_data: DiscordUser = {
            id: data.session.providerAccountId,
            name: data.session.user.name,
            image: data.session.user.image
        }

        await fetch(backend_url + "/api/gamenights/sign_up", {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(send_data)
          });
    }
</script>

<svelte:head>
    <title>TheFox580's Game Nights</title>
</svelte:head>


{#if data.session === null || data.session.provider != "discord"}
    <div class="w-screen h-screen bg-black text-white">
        <div class="w-full h-full flex flex-col justify-center items-center">
            <span class="text-2xl text-center text-white">You are signed out</span>
            <SignIn
                provider={data.providerMap.find(
                    (provider) => provider.id === "discord",
                ).id}
                signInPage="api/discord/signin"
                class="mt-5.5"
            >
                <span
                    slot="submitButton"
                    class="p-2.5 border-4 rounded-xl text-center text-white cursor-pointer"
                    style="background-color: #5865F2; border-color: #434DBA;"
                    >Sign In with Discord</span
                >
            </SignIn>
        </div>
    </div>
{:else}
    <div class="w-full h-screen flex flex-col bg-black text-white">
        <div class="w-full h-6 flex justify-center items-center my-5">
            <span class="mr-2.5 text-2xl text-center text-white">Signed in as {data.session.user.name}</span>
            <img src="{data.session.user.image}" alt="{data.session.user.name}'s PFP" class="h-12 mr-2.5 rounded-full">
            <SignOut
                signOutPage="api/discord/signout"
            >
                <span
                    slot="submitButton"
                    class="p-2.5 border-4 rounded-xl text-center text-white cursor-pointer"
                    style="background-color: #5865F2; border-color: #434DBA;"
                    >Sign Out</span
                >
            </SignOut>
            <a class="ml-10 py-1.5 px-3 rounded-3xl cursor-pointer"
                style="background-color: #5865F2;"
                href="https://discord.gg/suZvdCCp3k"
                target="_blank">Join the Discord server</a>
        </div>
        <div class="w-auto h-auto flex flex-col items-center justify-center px-2 py-5 my-5">
            {#if isEmpty(game)}
                <span class="text-6xl">There is no game night scheduled...</span>
            {:else}
                <span class="text-6xl mb-10">There is a game night scheduled!</span>
                <span class="text-2xl">{game.title} on {game.game_name}</span>
                <span class="text-2xl">{getMonth(game_time.getMonth())} {game_time.getDate()} at {game_time.toTimeString()}</span>
                <span class="text-2xl mb-10">Minimum players required for this game night to happen: {game.players_needed} players</span>
                <img src="/img/gamenights/{game.img}" alt="{game.img}" class="mb-10 h-69"/>
                <div class="flex flex-row items-center justify-center">
                    {#if signed_up}
                        <button class="py-1.5 px-3 bg-red-500 rounded-3xl cursor-pointer"
                            onclick={() => {
                                signOut()
                            }}>Leave the sign up pool</button>
                    {:else}
                        <button class="py-1.5 px-3 bg-green-500 rounded-3xl cursor-pointer"
                            onclick={() => {
                                signUp()
                            }}>Sign up in the pool</button>
                    {/if}
                    <span class="text-2xl ml-2">{signed_up_amount} in the pool.</span>
                </div>
            {/if}
        </div>
    </div>
{/if}
