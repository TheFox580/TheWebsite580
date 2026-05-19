<script lang="ts">
    import { goto } from "$app/navigation";
    import Logs from "$lib/components/archipelago/Logs.svelte";
    import ProgressBar from "$lib/components/archipelago/ProgressBar.svelte";
    import HintsTab from "$lib/components/archipelago/HintsTab.svelte";
    import { Client } from "archipelago.js";
    import type { Hint, ItemsManager } from "archipelago.js";
    import type { HintsInfo } from "$lib/interfaces/archipelago/HintsInfo";

    const client = new Client();

    let with_tracker: boolean = $state(true);

    let login_status: boolean = $state(false);
    let loading_client_data: boolean = $state(false);
    let connected: boolean = $state(false);
    let error_message: string | undefined = $state(undefined);

    let completed: number = $state(0);
    let to_complete: number = $state(0);

    let items: ItemsManager = $state();
    let hints_info: HintsInfo = $state({ hint_cost: 0, hint_points: 0 });

    client.messages.on("connected", () => {
        loading_client_data = true;
        setTimeout(() => {
            connected = true;
            completed = client.room.checkedLocations.length;
            to_complete = client.room.allLocations.length;
            items = client.items;
            hints_info.hint_cost = client.room.hintCost;
            hints_info.hint_points = client.room.hintPoints;
        }, 2 * 1000);
    });

    client.messages.on("itemSent", () => {
        setTimeout(() => {
            completed = client.room.checkedLocations.length;
            to_complete = client.room.allLocations.length;
            items = client.items;
            hints_info.hint_cost = client.room.hintCost;
            hints_info.hint_points = client.room.hintPoints;
        }, 2 * 1000);
    });

    client.messages.on("itemHinted", () => {
        setTimeout(() => {
            items = client.items;
            hints_info.hint_cost = client.room.hintCost;
            hints_info.hint_points = client.room.hintPoints;
        }, 2 * 1000);
    });

    function login() {
        let host = (<HTMLInputElement>document.getElementById("hostname"))
            ?.value;
        let port = (<HTMLInputElement>document.getElementById("port"))?.value;
        let username = (<HTMLInputElement>document.getElementById("username"))
            ?.value;
        let password = (<HTMLInputElement>document.getElementById("password"))
            ?.value;
        if (host !== "" && port !== "" && username !== "") {
            login_status = true;
            error_message = undefined;
            client
                .login(
                    `ws${["archipelago.gg", "archipelago.today"].includes(host) ? "s" : ""}://${host}:${port}`,
                    username,
                    "",
                    {
                        slotData: false,
                        password: password ? password : "",
                        tags: ["TextClient", "Tracker", "TheWebsite580"],
                        version: {
                            build: 0,
                            major: 1,
                            minor: 0,
                        },
                    },
                )
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

    function redirectTracker() {
        let tracker_link = (<HTMLInputElement>(
            document.getElementById("tracker")
        ))?.value.split("tracker/")[1];
        if (tracker_link !== "") {
            if (typeof tracker_link !== "string") {
                error_message = "Error: Invalid tracker link.";
                return;
            }

            if (typeof tracker_link === "string") {
                goto("/archipelago/tracker/" + tracker_link);
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
                        class="flex flex-col justify-evenly items-center w-4/5 m-5"
                    >
                        <div
                            class="flex flex-row justify-evenly items-center w-full m-5"
                        >
                            <h2 class="text-2xl text-center w-1/3">
                                Logged in as {client.name}
                            </h2>
                            <h2 class="text-2xl text-center w-1/3">
                                Game: {client.game}
                            </h2>
                            <div
                                class="flex flex-col items-center jusify-center w-1/3"
                            >
                                {#key to_complete}
                                    <ProgressBar
                                        max={to_complete}
                                        current={completed}
                                        inList={false}
                                    ></ProgressBar>
                                {/key}
                            </div>
                        </div>
                        <Logs messages={client.messages}></Logs>
                    </div>
                </div>
                <div
                    class="flex flex-row justify-center items-center m-5 w-full"
                >
                    <div
                        class="flex flex-col justify-center items-center w-full m-5"
                    >
                        {#key items}
                            <HintsTab
                                {items}
                                self_id={client.players.self.slot}
                                {hints_info}
                            ></HintsTab>
                        {/key}
                    </div>
                </div>
            </div>
        </div>
    </div>
{:else if login_status}
    <div class="flex w-screen h-screen items-center justify-center">
        <div class="flex flex-col items-center justify-center">
            {#if error_message}
                <h1 class="text-4xl text-red-600 text-center">
                    An error has occured
                </h1>
                <h2 class="text-2xl text-red-600 text-center">
                    {error_message}
                </h2>
                {#if getErrorMessage(error_message)}
                    <h3 class="text-2xl text-orange-600 text-center">
                        This may be due to logging in to an unsecure connection.
                    </h3>
                    <h3 class="text-2xl text-orange-600 text-center">
                        or that the room may be offline / changed port.
                    </h3>
                {/if}
                <button
                    title="Go Back"
                    class="cursor-pointer px-3 py-1 bg-red-500 rounded-2xl mt-2"
                    onclick={() => {
                        login_status = false;
                        error_message = undefined;
                    }}>Go Back</button
                >
            {:else if !loading_client_data}
                <h1 class="text-4xl">Logging into the server...</h1>
            {:else}
                <h1 class="text-4xl">Logged in!</h1>
                <h2 class="text-2xl">Loading room info...</h2>
            {/if}
        </div>
    </div>
{:else}
    <div class="flex w-screen h-screen items-center justify-center">
        <div class="flex flex-row items-center justify-center w-full">
            <div class="flex flex-col justify-center items-center w-full">
                <div
                    class="flex flex-row justify-center items-center w-full mb-2"
                >
                    <button
                        class="cursor-pointer px-3 py-1 bg-gray-400 rounded-2xl mr-3"
                        onclick={() => {
                            with_tracker = !with_tracker;
                            error_message = undefined;
                        }}>Toggle login type</button
                    >
                    <span>Login with{with_tracker ? "" : "out"} Tracker</span>
                </div>
                <div class="w-100">
                    {#if !with_tracker}
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
                                onkeypress={(key) => {
                                    if (key.key === "Enter") {
                                        login();
                                    }
                                }}
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
                    {:else}
                        <div
                            class="flex flex-row justify-between items-center w-full"
                        >
                            <label for="tracker">Tracker :</label>
                            <input
                                type="text"
                                placeholder="https://archipelago.gg/tracker/..."
                                id="tracker"
                                value=""
                                onkeypress={(key) => {
                                    if (key.key === "Enter") {
                                        redirectTracker();
                                    }
                                }}
                                class="border-gray-400 border-2 rounded-xl my-1 p-1 w-75/100"
                            />
                        </div>
                    {/if}
                </div>
                <div class="flex flex-col justify-center items-center mx-2">
                    <button
                        title="Start tracking"
                        class="cursor-pointer px-3 py-1 bg-green-500 rounded-2xl mt-2"
                        onclick={() => {
                            if (with_tracker) {
                                redirectTracker();
                            } else {
                                login();
                            }
                        }}
                        >{with_tracker ? "Next step" : "Start tracking"}</button
                    >
                    {#if error_message}
                        <p class="text-red-600 mt-1">{error_message}</p>
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/if}
