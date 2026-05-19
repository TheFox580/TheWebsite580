<script lang="ts">
    import type { MessageManager } from "archipelago.js";
    import Message from "./Message.svelte";

    const { messages } = $props<{
        messages: MessageManager;
    }>();

    let logs: string[] = $state([]);

    messages.on("message", (content: string) => {
        for (const message of content.split("\n")) {
            logs.unshift(message);
        }
    });

    function sendMessage() {
        const text_box = <HTMLInputElement>(
            document.getElementById("talk_to_server")
        );
        if (text_box.value !== "") {
            messages.say(text_box.value);
            text_box.value = "";
        }
    }
</script>

<div
    id="logger"
    class="overflow-auto w-full h-100 bg-gray-600 flex flex-col-reverse rounded-3xl border-gray-400 border-4 p-2 mb-3"
>
    {#each logs as log}
        <Message message={log}></Message>
    {/each}
</div>

<div
    class="flex w-full bg-gray-600 border-gray-400 border-2 p-2 items-center justify-evenly rounded-2xl"
>
    <input
        id="talk_to_server"
        type="text"
        class="w-4/5 h-full leading-[100%] py-1 text-white"
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
