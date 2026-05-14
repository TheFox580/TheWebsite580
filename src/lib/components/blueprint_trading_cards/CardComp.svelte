<script lang="ts">
    import type { Card } from "$lib/interfaces/blueprint_trading_cards/Card";
    const { card } = $props<{
        card: Card;
    }>();
</script>

<div
    class="w-1/5 flex flex-col items-center justify-evenly bg-blue-950 rounded-2xl border-gray-700 border-5 ml-3"
>
    <img
        src="/img/blueprint_trading_cards/cards/{card.file_name}"
        alt="{card.name}'s card cover"
        class="w-4/5 m-3 mt-4"
        style="box-shadow:
              0px 0px 6px rgba(0, 0, 0, 0.75),
              -8px -4px aqua,
              -8px -4px 6px rgba(0, 0, 0, 0.75),
              -16px -8px aqua;"
    />
    <div class="flex flex-col items-center justify-evenly w-full">
        <div class="flex flew-row items-center justify-center w-full">
            <div
                class="text-center text-neutral-600 rounded-xl bg-green-400 w-4/10 p-0.5 m-1"
            >
                <h1 class="font-bold text-2xl">{card.stats.health}</h1>
            </div>
            <div
                class="text-center text-neutral-600 rounded-xl bg-red-400 w-4/10 p-0.5 m-1"
            >
                <h1 class="font-bold text-2xl">{card.stats.attack}</h1>
            </div>
        </div>
        <div class="flex flew-row justify-center-safe w-full">
            <div
                class="text-center text-neutral-600 rounded-xl bg-blue-400 w-4/10 p-0.5 m-1"
            >
                <h1 class="font-bold text-2xl">{card.stats.defense}</h1>
            </div>
            <div
                class="text-center text-neutral-600 rounded-xl bg-yellow-400 w-4/10 p-0.5 m-1"
            >
                <h1 class="font-bold text-2xl">{card.stats.speed}</h1>
            </div>
        </div>
    </div>
    <div class="flex flex-col items-center justify-evenly w-75/100 m-2">
        <p class="text-center font-bold text-white">{card.description}</p>
    </div>
</div>
