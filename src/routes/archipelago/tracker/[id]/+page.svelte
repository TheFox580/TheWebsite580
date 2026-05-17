<script lang="ts">
    import type { PlayerSlotInfo } from "$lib/interfaces/archipelago/PlayerSlotInfo";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import { Client } from "archipelago.js";
    import PlayerSlot from "$lib/components/archipelago/PlayerSlot.svelte";
    import RoomProgression from "$lib/components/archipelago/RoomProgression.svelte";

    const client = new Client();

    let tracker_loaded: boolean = $state(false);
    let login_status: boolean = $state(false);
    let connected: boolean = $state(false);
    let error_message: string | undefined = $state(undefined);

    let logs: string[] = $state([]);

    client.messages.on("message", (content) => {
        logs.push(content);
    });

    client.messages.on("connected", async () => {
        connected = true;
    });

    function login() {
        let host = (<HTMLInputElement>document.getElementById("hostname"))
            .value;
        let port = (<HTMLInputElement>document.getElementById("port")).value;
        let username = (<HTMLInputElement>document.getElementById("username"))
            .value;
        let password = (<HTMLInputElement>document.getElementById("password"))
            .value;
        if (host !== "" && port !== "" && username !== "") {
            login_status = true;
            error_message = undefined;
            client
                .login(`${host}:${port}`, username, "", {
                    slotData: false,
                    password: password ? password : "",
                    tags: ["TextClient", "Tracker", "TheWebsite580"],
                    version: {
                        build: 0,
                        major: 1,
                        minor: 0,
                    },
                })
                .catch((message) => (error_message = message));
        } else {
            if (host === "") {
                error_message = "Error: Invalid host name.";
                return;
            }
            if (port === "") {
                error_message = "Error: Invalid port.";
                return;
            }
            if (username === "") {
                error_message = "Error: Invalid userame.";
                return;
            }
        }
    }

    function sendMessage() {
        if (connected) {
            const text_box = <HTMLInputElement>(
                document.getElementById("talk_to_server")
            );
            if (text_box.value !== "") {
                client.messages.say(text_box.value);
                text_box.value = "";
            }
        }
    }

    const { data } = $props<{
        data: PageData;
    }>();

    let roomTrackerInfo: PlayerSlotInfo[] = $state();

    async function getRoomTrackerInfo() {
        const res = await fetch(
            `https://thefox580-backend.zoelliotmitong.workers.dev/api/archipelago/tracker/${data.id}`,
        );
        roomTrackerInfo = (await res.json()).players;
        tracker_loaded = true;
    }

    onMount(async () => {
        const tracker_refresh = setInterval(
            async () => {
                await getRoomTrackerInfo();
            },
            10 * 60 * 1000,
        );
        await getRoomTrackerInfo();
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="/styles/default.css" />
    <title>Archipelago Tracker</title>
</svelte:head>

{#if connected}
    <div class="flex w-screen h-screen items-center justify-center">
        <div class="flex flex-col justify-center items-center w-full">
            <div class="flex flex-col justify-evenly items-center w-full">
                <h1 class="text-4xl mb-3">Logged in!</h1>
                <div class="flex flex-row justify-evenly items-center m-10">
                    <div
                        class="flex flex-col justify-evenly items-center w-3/5 m-5"
                    >
                        <div
                            class="flex flex-row justify-evenly items-center w-full m-10"
                        >
                            <h2 class="text-2xl text-center">
                                Logged in as {client.name}
                            </h2>
                            <h2 class="text-2xl text-center">
                                Game: {client.game}
                            </h2>
                            <div
                                class="flex flex-col items-center jusify-center"
                            >
                                <h2 class="text-2xl text-center mb-2">
                                    Checks: {client.room.checkedLocations
                                        .length} / {client.room.allLocations
                                        .length}
                                </h2>
                                <div
                                    class="w-full h-5 bg-black rounded-xl border-2 border-gray-500"
                                >
                                    <div
                                        class="w-{client.room.checkedLocations
                                            .length}/{client.room.allLocations
                                            .length} h-full bg-green-500 rounded-xl"
                                    ></div>
                                </div>
                            </div>
                            <div
                                class="flex flex-col items-center jusify-center w-1/4"
                            >
                                <button
                                    class="cursor-pointer px-3 py-1 bg-blue-500 rounded-2xl text-center mb-2"
                                    onclick={async () => {
                                        await getRoomTrackerInfo();
                                    }}>Refresh tracker data</button
                                >
                                <h3 class="text-xl text-center">
                                    Refreshes automatically every 10 minutes
                                </h3>
                            </div>
                        </div>
                        <div
                            id="logger"
                            class="overflow-y-auto w-full h-150 bg-gray-600 flex flex-col items-start justify-end rounded-3xl border-gray-400 border-4 p-2 mb-3"
                        >
                            {#each logs as log}
                                <p class="text-white">{log}</p>
                            {/each}
                        </div>
                        <div
                            class="w-full bg-gray-600 border-gray-400 border-2 p-2 flex items-start justify-evenly rounded-2xl"
                        >
                            <input
                                id="talk_to_server"
                                type="text"
                                class="w-4/5 h-full py-1 text-white"
                                value=""
                                placeholder="Type your message"
                                onkeypress={(key) => {
                                    if (key.key === "Enter") {
                                        sendMessage();
                                    }
                                }}
                            />
                            <button
                                class="cursor-pointer px-3 py-1 bg-blue-500 rounded-2xl text-center"
                                onclick={sendMessage}>Send Message</button
                            >
                        </div>
                    </div>
                    <div
                        class="flex flex-col justify-center items-center w-2/5 m-5"
                    >
                        <RoomProgression progression={roomTrackerInfo}
                        ></RoomProgression>

                        <h1 class="text-6xl text-center mb-10">
                            Other players :
                        </h1>
                        {#each roomTrackerInfo as player}
                            {#if player.name !== client.name}
                                <PlayerSlot slot_info={player}></PlayerSlot>
                            {/if}
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </div>
{:else if login_status}
    <div class="flex w-screen h-screen items-center justify-center">
        <div class="flex flex-col items-center justify-center">
            {#if error_message}
                <h1 class="text-4xl text-red-600">An error has occured</h1>
                <h2 class="text-2xl text-red-600">{error_message}</h2>
                <button
                    title="Go Back"
                    class="cursor-pointer px-3 py-1 bg-red-500 rounded-2xl mt-2"
                    onclick={() => {
                        login_status = false;
                        error_message = undefined;
                    }}>Go Back</button
                >
            {:else}
                <h1 class="text-4xl">Logging into the server...</h1>
            {/if}
        </div>
    </div>
{:else if tracker_loaded}
    <div class="flex w-screen h-screen items-center justify-center">
        <div class="flex flex-row items-center justify-center w-full">
            <div class="flex flex-col justify-center items-center w-full">
                <div class="w-100">
                    <div
                        class="flex flex-row justify-between items-center w-full"
                    >
                        <label for="hostname">Host Name : </label>
                        <input
                            type="text"
                            placeholder="Room Adress"
                            id="hostname"
                            value="archipelago.gg"
                            required
                            class="border-gray-400 border-2 rounded-xl my-1 p-1"
                        />
                    </div>
                    <div
                        class="flex flex-row justify-between items-center w-full"
                    >
                        <label for="port">Port : </label>
                        <input
                            type="text"
                            placeholder="Port Number"
                            inputmode="numeric"
                            pattern="[0-9]{5}"
                            id="port"
                            maxlength="5"
                            value=""
                            required
                            class="border-gray-400 border-2 rounded-xl my-1 p-1"
                        />
                    </div>
                    <div
                        class="flex flex-row justify-between items-center w-full"
                    >
                        <label for="username">Username : </label>
                        <input
                            type="text"
                            placeholder="Slot Name"
                            id="username"
                            value=""
                            required
                            class="border-gray-400 border-2 rounded-xl my-1 p-1"
                        />
                    </div>
                    <div
                        class="flex flex-row justify-between items-center w-full"
                    >
                        <label for="password"
                            >Password : <i>(Optional)</i></label
                        >
                        <input
                            type="password"
                            placeholder="Room Password"
                            id="password"
                            value=""
                            class="border-gray-400 border-2 rounded-xl my-1 p-1"
                        />
                    </div>
                </div>
                <div class="flex flex-col justify-center items-center mx-2">
                    <button
                        title="Start tracking"
                        class="cursor-pointer px-3 py-1 bg-green-500 rounded-2xl mt-2"
                        onclick={login}>Start tracking</button
                    >
                    {#if error_message}
                        <p class="text-red-600 mt-1">{error_message}</p>
                    {/if}
                </div>
            </div>
        </div>
    </div>
{:else}
    <div class="flex w-screen h-screen items-center justify-center">
        <div class="flex flex-col items-center justify-center">
            <h1 class="text-4xl text-white">Tracker loading...</h1>
            <h2 class="text-2xl text-orange-600">
                If you're stuck on this page, try reloading.
            </h2>
        </div>
    </div>
{/if}
