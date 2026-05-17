<script lang="ts">
    import { goto } from "$app/navigation";
    import { Client } from "archipelago.js";

    const client = new Client();

    let with_tracker: boolean = $state(true);

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
                {#if error_message.includes("SecurityError: The operation is insecure.")}
                    <h3 class="text-2xl text-orange-600 text-center">
                        This may be due to logging in to an unsecure connection.
                    </h3>
                    <h3 class="text-2xl text-orange-600 text-center">
                        In <code>about:code</code>, set
                        <code>network.websocket.allowInsecureFromHTTPS</code>
                        to <code>true</code>
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
            {:else}
                <h1 class="text-4xl">Logging into the server...</h1>
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
