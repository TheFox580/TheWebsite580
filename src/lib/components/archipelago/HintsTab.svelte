<script lang="ts">
    import type { Client, Hint, Item, ItemsManager } from "archipelago.js";
    import HintComp from "$lib/components/archipelago/Hint.svelte";
    import ItemComp from "$lib/components/archipelago/Item.svelte";
    import type { HintsInfo } from "$lib/interfaces/archipelago/HintsInfo";

    const { client, hints_info } = $props<{
        client: Client;
        hints_info: HintsInfo;
    }>();

    const clientInfos: Client = client;

    const self_id: number = $state(clientInfos.players.self.slot);

    let items: ItemsManager = $state(clientInfos.items);
    let hints: Hint[] = $state(items.hints);
    let get_hints: Hint[] = $state([]);
    let send_hints: Hint[] = $state([]);
    let received: Item[] = $state(items.received);
    let itemList: string[] = $state([]);

    const itemTable = clientInfos.package.findPackage(
        clientInfos.game,
    )?.itemTable;
    if (itemTable !== undefined) {
        Object.entries(itemTable).forEach(([key, value]) => {
            itemList.push(key);
        });
    }

    function refreshHints() {
        const userGetHintMap: Map<number, Hint[]> = new Map();
        const userSendHintMap: Map<number, Hint[]> = new Map();
        const userReceivedHintMap: Map<number, Item[]> = new Map();

        Object.entries(clientInfos.players.slots).forEach(([key, value]) => {
            userGetHintMap.set(parseInt(key), []);
            userSendHintMap.set(parseInt(key), []);
            userReceivedHintMap.set(parseInt(key), []);
        });

        let currentHints: Hint[] | undefined | Item[];
        get_hints = [];
        send_hints = [];

        for (const hint of hints) {
            const item: Item = hint.item;

            if (!hint.found) {
                if (
                    item.receiver.slot === self_id &&
                    !get_hints.includes(hint)
                ) {
                    currentHints = userGetHintMap.get(item.sender.slot);
                    if (currentHints !== undefined) {
                        currentHints.push(hint);
                        userGetHintMap.set(item.sender.slot, currentHints);
                    }
                }
                if (
                    item.sender.slot === self_id &&
                    !send_hints.includes(hint)
                ) {
                    currentHints = userSendHintMap.get(item.receiver.slot);
                    if (currentHints !== undefined) {
                        currentHints.push(hint);
                        userSendHintMap.set(item.receiver.slot, currentHints);
                    }
                }
            }
        }

        for (const hint of received) {
            currentHints = userReceivedHintMap.get(hint.receiver.slot);
            if (currentHints !== undefined) {
                currentHints.push(hint);
                userReceivedHintMap.set(hint.receiver.slot, currentHints);
            }
        }

        received = [];

        userGetHintMap.forEach((value, key, map) => {
            value.sort(sortHint);

            for (const hint of value) {
                get_hints.push(hint);
            }
        });

        userSendHintMap.forEach((value, key, map) => {
            value.sort(sortHint);

            for (const hint of value) {
                send_hints.push(hint);
            }
        });

        userReceivedHintMap.forEach((value, key, map) => {
            value.sort(sortItem);

            for (const hint of value) {
                received.push(hint);
            }
        });
    }

    function sortItem(a: Item, b: Item): number {
        const try1 = a.name.localeCompare(b.name);

        if (try1 !== 0) {
            return a.name.localeCompare(b.name);
        }

        return a.locationName.localeCompare(b.locationName);
    }

    function sortHint(a: Hint, b: Hint): number {
        return sortItem(a.item, b.item);
    }

    function hint(item: string) {
        clientInfos.messages.say("!hint " + item);
    }

    clientInfos.messages.on("itemHinted", () => {
        setTimeout(() => {
            items = clientInfos.items;
            hints = items.hints;
            hints_info.hint_points = clientInfos.room.hintPoints;
            refreshHints();
        }, 2 * 1000);
    });

    clientInfos.messages.on("itemSent", () => {
        setTimeout(() => {
            items = clientInfos.items;
            hints = items.hints;
            hints_info.hint_points = client.room.hintPoints;
            refreshHints();
        }, 2 * 1000);
    });

    refreshHints();
</script>

<div class="flex flex-row justify-center items-center m-5 w-full">
    <div class="flex flex-col justify-center items-center w-5/7 m-5">
        <div class="flex flex-row justify-center items-center w-full m-5">
            <div class="flex flex-col justify-center items-center w-1/3 mx-1">
                <h1 class="text-4xl text-center mb-3">
                    Items you received ({received.length}) :
                </h1>
                <table class="w-full">
                    <thead
                        class="w-full rounded-t-3xl bg-gray-900 border-gray-400 border-4"
                    >
                        <tr
                            class="w-full flex flex-row items-center justify-center"
                        >
                            <th class="text-center font-bold w-1/3"
                                >Item received</th
                            >
                            <th class="text-center font-bold w-1/3">Found at</th
                            >
                            <th class="text-center font-bold w-1/3">Sender</th>
                        </tr>
                    </thead>
                    <tbody class="w-full border-gray-400 border-2">
                        {#key received}
                            {#each received as item}
                                <ItemComp {item} get={true}></ItemComp>
                            {/each}
                        {/key}
                    </tbody>
                </table>
            </div>
            <div class="flex flex-col justify-center items-center w-1/3 mx-1">
                <h1 class="text-4xl text-center mb-3">
                    Items you need ({get_hints.length}) :
                </h1>
                <table class="w-full">
                    <thead
                        class="w-full rounded-t-3xl bg-gray-900 border-gray-400 border-4"
                    >
                        <tr
                            class="w-full flex flex-row items-center justify-center"
                        >
                            <th class="text-center font-bold w-1/3"
                                >Item needed</th
                            >
                            <th class="text-center font-bold w-1/3">Found at</th
                            >
                            <th class="text-center font-bold w-1/3">Sender</th>
                        </tr>
                    </thead>
                    <tbody class="w-full border-gray-400 border-2">
                        {#key get_hints}
                            {#each get_hints as hint}
                                <HintComp {hint} get={true}></HintComp>
                            {/each}
                        {/key}
                    </tbody>
                </table>
            </div>
            <div class="flex flex-col justify-center items-center w-1/3 mx-1">
                <h1 class="text-4xl text-center mb-3">
                    Items others need ({send_hints.length}) :
                </h1>
                <table class="w-full">
                    <thead
                        class="w-full rounded-t-3xl bg-gray-900 border-gray-400 border-4"
                    >
                        <tr
                            class="w-full flex flex-row items-center justify-center"
                        >
                            <th class="text-center font-bold w-1/3">Receiver</th
                            >
                            <th class="text-center font-bold w-1/3"
                                >Item needed</th
                            >
                            <th class="text-center font-bold w-1/3">Found at</th
                            >
                        </tr>
                    </thead>
                    <tbody class="w-full border-gray-400 border-2">
                        {#key send_hints}
                            {#each send_hints as hint}
                                <HintComp {hint} get={false}></HintComp>
                            {/each}
                        {/key}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="flex flex-col justify-center items-center w-2/7 m-5">
        <h1 class="text-center text-6xl mb-10">Hints info :</h1>
        <div class="flex flex-row justify-center items-center w-full">
            <div class="flex flex-col justify-center items-center w-1/2">
                <h2 class="text-center text-3xl mb-5">
                    Hint Points: {hints_info.hint_points}
                </h2>
                <h2 class="text-center text-3xl">
                    Hint Cost: {hints_info.hint_cost}
                </h2>
            </div>
            <div class="flex flex-col justify-center items-center w-1/2">
                <label for="hints" class="text-center text-3xl my-2"
                    >Hints Selection</label
                >
                <select
                    name="hints"
                    id="hints"
                    class="text-center text-2xl border-2 border-white w-full my-2"
                >
                    {#each itemList as item}
                        <option id="hint_asked" value={item}>{item}</option>
                    {/each}
                </select>
                <button
                    title="Hint Item"
                    class="cursor-pointer px-3 py-1 bg-blue-500 rounded-2xl mx-2 my-2"
                    onclick={() => {
                        const select: HTMLSelectElement = <HTMLSelectElement>(
                            document.getElementById("hints")
                        );
                        const value = select.options[select.selectedIndex].text;
                        if (value) {
                            hint(value);
                        }
                    }}>Hint Item</button
                >
            </div>
        </div>
    </div>
</div>
