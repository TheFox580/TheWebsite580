<script lang="ts">
    import type { Hint, Item, ItemsManager } from "archipelago.js";
    import HintComp from "$lib/components/archipelago/Hint.svelte";
    import type { HintsInfo } from "$lib/interfaces/archipelago/HintsInfo";

    const { items, self_id, hints_info } = $props<{
        items: ItemsManager;
        self_id: number;
        hints_info: HintsInfo;
    }>();

    const hints: Hint[] = items.hints;
    const items_infos: ItemsManager = items;

    let get_hints: Hint[] = [];
    let send_hints: Hint[] = [];

    for (const hint of hints) {
        const hint_info: Hint = hint;
        const item: Item = hint_info.item;

        if (!hint_info.found) {
            if (item.receiver.slot === self_id) get_hints.push(hint);
            if (item.sender.slot === self_id) send_hints.push(hint);
        }
    }
</script>

<div class="flex flex-row justify-center items-center m-5 w-full">
    <div class="flex flex-col justify-center items-center w-3/5 m-5">
        <div class="flex flex-row justify-center items-center w-full m-5">
            <div class="flex flex-col justify-center items-center w-1/2 mx-1">
                <h1 class="text-4xl text-center mb-3">Items you need :</h1>
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
                        {#each get_hints as hint}
                            <HintComp {hint} get={true}></HintComp>
                        {/each}
                    </tbody>
                </table>
            </div>
            <div class="flex flex-col justify-center items-center w-1/2 mx-1">
                <h1 class="text-4xl text-center mb-3">Items others need :</h1>
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
                        {#each send_hints as hint}
                            <HintComp {hint} get={false}></HintComp>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="flex flex-col justify-center items-center w-2/5 m-5">
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
                <label for="hints">Hints Selection</label>
                <select name="hints" id="hints">
                    <option value="Test"></option>
                </select>
            </div>
        </div>
    </div>
</div>
