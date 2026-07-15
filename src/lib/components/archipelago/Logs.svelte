<script lang="ts">
    import type { Item, ItemsManager, MessageManager, Player } from "archipelago.js";
    import Message from "./Message.svelte";
    import type { IMessage } from "$lib/interfaces/archipelago/Message";

    const { user, messages } = $props<{
        user: string;
        messages: MessageManager;
    }>();

    let logs: IMessage[] = $state([]);

    messages.on("chat", (text: string, player: Player) => {
        logs.unshift({type: "message", text: `${player.name}: ${text}`, item: null});
    });

    messages.on("serverChat", (text: string) => {
          logs.unshift({type: "message", text: `Server: ${text}`, item: null});
    });

    messages.on("itemSent", (text: string, item:Item) => {
        logs.unshift({type: "item", text: text, item: item});
    });

    messages.on("itemHinted", (text: string, item:Item) => {
        logs.unshift({type: "hint", text: text, item: item});
    });

    messages.on("itemCheated", (text: string, item:Item) => {
        logs.unshift({type: "cheat", text: text, item: item});
    });

    messages.on("goaled", (text: string, player:Player) => {
      logs.unshift({type: "goal", text: `${player.name} has completed ${player.game} for Team ${player.team}`, item: null});
    });

    messages.on("connected", (text: string, player:Player, tags:string[]) => {
      logs.unshift({type: "goal", text: `${player.name} playing ${player.game} connected to the server. Tags: ${tags}`, item: null});
    });

    messages.on("disconnected", (text: string, player:Player) => {
      logs.unshift({type: "goal", text: `${player.name} playing ${player.game} disconnected from the server.`, item: null});
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
        {#key log}
            <Message {user} message={log}></Message>
        {/key}
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
