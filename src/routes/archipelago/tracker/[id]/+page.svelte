<script lang="ts">
    import type { PlayerSlotInfo } from "$lib/interfaces/archipelago/PlayerSlotInfo";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";
    import type { HintsInfo } from "$lib/interfaces/archipelago/HintsInfo";
    import { Client } from "archipelago.js";
    import PlayerSlot from "$lib/components/archipelago/PlayerSlot.svelte";
    import RoomProgression from "$lib/components/archipelago/RoomProgression.svelte";
    import Logs from "$lib/components/archipelago/Logs.svelte";
    import ProgressBar from "$lib/components/archipelago/ProgressBar.svelte";
    import HintsTab from "$lib/components/archipelago/HintsTab.svelte";
    import { getRoomTrackerInfo } from "$lib/functions/archipelago/getRoomTrackerInfo";

    const client = new Client();

    let tracker_loaded: boolean = $state(false);
    let login_status: boolean = $state(false);
    let loading_client_data: boolean = $state(false);
    let connected: boolean = $state(false);
    let error_message: string | undefined = $state(undefined);

    let completed: number = $state(0);
    let to_complete: number = $state(0);

    let { hints_info = $bindable(), data } = $props<{
        hints_info: HintsInfo;
        data: PageData;
    }>();

    hints_info = { hint_cost: 0, hint_points: 0 };

    client.messages.on("connected", () => {
        loading_client_data = true;
        setTimeout(() => {
            connected = true;
            completed = client.room.checkedLocations.length;
            to_complete = client.room.allLocations.length;
            hints_info.hint_cost = client.room.hintCost;
            hints_info.hint_points = client.room.hintPoints;
        }, 2 * 1000);
    });

    client.messages.on("itemSent", () => {
        setTimeout(() => {
            completed = client.room.checkedLocations.length;
            to_complete = client.room.allLocations.length;
            hints_info.hint_points = client.room.hintPoints;
        }, 5 * 1000);
    });

    client.messages.on("itemHinted", () => {
        setTimeout(() => {
            hints_info.hint_points = client.room.hintPoints;
        }, 5 * 1000);
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

    function getErrorMessage(message: string): string {
        message = message.toString();

        if (message.includes("Failed to connect to Archipelago server.")) {
            return "ServerError";
        }

        return "";
    }

    let roomTrackerInfo: PlayerSlotInfo[] = $state();

    onMount(async () => {
        const tracker_refresh = setInterval(
            async () => {
                roomTrackerInfo = await getRoomTrackerInfo(data.id);
            },
            10 * 60 * 1000,
        );
        roomTrackerInfo = await getRoomTrackerInfo(data.id);
        if (roomTrackerInfo.length === 0) {
            login_status = true;
            error_message =
                "Error: This tracker has no player. Make sure the link is correct.";
        }
        tracker_loaded = true;
    });
</script>

<svelte:head>
    <link rel="stylesheet" href="/styles/default.css" />
    <title>Archipelago Tracker</title>
</svelte:head>

{#if connected}
    <div class="flex w-screen items-center justify-center">
        <div class="flex flex-col justify-center items-center w-full">
            <div class="flex flex-col justify-evenly items-center w-full">
                <div
                    class="flex flex-row justify-evenly items-center w-1/5 mt-10 mb-3"
                >
                    <h1 class="text-4xl text-center mx-2">Logged in!</h1>
                    <button
                        title="Disconnect"
                        class="cursor-pointer px-3 py-1 bg-red-500 rounded-2xl mx-2"
                        onclick={() => {
                            client.socket.disconnect();
                            connected = false;
                            login_status = false;
                            error_message = undefined;
                        }}>Disconnect</button
                    >
                </div>
                <div
                    class="flex flex-row justify-evenly items-center m-5 w-full"
                >
                    <div
                        class="flex flex-col justify-evenly items-center w-3/5 m-5"
                    >
                        <div
                            class="flex flex-row justify-evenly items-center w-full m-5"
                        >
                            <h2 class="text-2xl text-center w-1/4 mx-2">
                                Logged in as {client.name}
                            </h2>
                            <h2 class="text-2xl text-center w-1/4 mx-2">
                                Game: {client.game}
                            </h2>
                            <div
                                class="flex flex-col items-center jusify-center w-1/4 mx-2"
                            >
                                {#key to_complete}
                                    <ProgressBar
                                        max={to_complete}
                                        current={completed}
                                        inList={false}
                                    ></ProgressBar>
                                {/key}
                            </div>
                            <div
                                class="flex flex-col items-center jusify-center w-1/4 mx-2"
                            >
                                <button
                                    class="cursor-pointer px-3 py-1 bg-blue-500 rounded-2xl text-center mb-2"
                                    onclick={async () => {
                                        roomTrackerInfo =
                                            await getRoomTrackerInfo(data.id);
                                    }}>Refresh tracker data</button
                                >
                                <h3 class="text-xl text-center">
                                    Refreshes automatically every 10 minutes
                                </h3>
                            </div>
                        </div>
                        <Logs messages={client.messages}></Logs>
                    </div>
                    <div
                        class="flex flex-col justify-center items-center w-2/5 m-5"
                    >
                        {#key roomTrackerInfo}
                            <RoomProgression progression={roomTrackerInfo}
                            ></RoomProgression>
                        {/key}
                        {#if roomTrackerInfo.length > 1}
                            <h1 class="text-6xl text-center mb-10">
                                Other players :
                            </h1>
                            {#each roomTrackerInfo as player}
                                {#if player.name !== client.name}
                                    <PlayerSlot slot_info={player}></PlayerSlot>
                                {/if}
                            {/each}
                        {/if}
                    </div>
                </div>
                <HintsTab {client} {hints_info}></HintsTab>
            </div>
        </div>
    </div>
{:else if login_status}
    <div class="flex w-screen h-screen items-center justify-center">
        <div class="flex flex-col items-center justify-center">
            {#if error_message}
                <h1 class="text-4xl text-red-600">An error has occured</h1>
                <h2 class="text-2xl text-red-600">{error_message}</h2>
                {#if getErrorMessage(error_message)}
                    <h3 class="text-2xl text-orange-600 text-center">
                        This may be due to logging in to an unsecure connection,
                    </h3>
                    <h3 class="text-2xl text-orange-600 text-center">
                        or that the room may be offline / changed port.
                    </h3>
                {/if}
                {#if error_message !== "Error: This tracker has no player. Make sure the link is correct."}
                    <button
                        title="Go Back"
                        class="cursor-pointer px-3 py-1 bg-red-500 rounded-2xl mt-2"
                        onclick={() => {
                            login_status = false;
                            error_message = undefined;
                        }}>Go Back</button
                    >
                {/if}
            {:else if !loading_client_data}
                <h1 class="text-4xl">Logging into the server...</h1>
            {:else}
                <h1 class="text-4xl">Logged in!</h1>
                <h2 class="text-2xl">Loading room info...</h2>
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
                            readonly
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
                            onkeypress={(key) => {
                                if (key.key === "Enter") {
                                    login();
                                }
                            }}
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
                            onkeypress={(key) => {
                                if (key.key === "Enter") {
                                    login();
                                }
                            }}
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
