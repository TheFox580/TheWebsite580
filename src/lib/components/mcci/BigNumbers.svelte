<script lang="ts">
    import LevelProgress from "./LevelProgress.svelte";
    import FactionProgress from "./FactionProgress.svelte";
    import Trophies from "./Trophies.svelte";
    import BonusTrophies from "./BonusTrophies.svelte";
    import Currency from "./Currency.svelte";

    const { data } = $props<{
        data: Object;
    }>();

    function getFaction(): Object | null {
        for (let faction of data.factions) {
            if (faction.selected) {
                return faction;
            }
        }
        return null;
    }

    let faction: Object | null = getFaction();
</script>

<div class="flex flex-row items-center justify-center w-9/10">
    <div
        class="flex flex-col justify-evenly items-center mr-5 p-10 rounded-xl bg-neutral-400 w-2xl"
    >
        <h1 class="font-bold text-5xl mb-10">Levels</h1>
        <LevelProgress
            data={data.crownLevel.levelData}
            username={data.username}
            title="Crown"
            category="icons"
            icon="crowns"
        ></LevelProgress>
        <LevelProgress
            data={data.crownLevel.styleLevelData}
            username={data.username}
            title="Style"
            category="icons"
            icon="style_level"
        ></LevelProgress>
        <LevelProgress
            data={data.crownLevel.fishingLevelData}
            username={data.username}
            title="Fishing"
            category="fishing"
            icon="level"
        ></LevelProgress>
        <FactionProgress data={faction} username={data.username}
        ></FactionProgress>
    </div>

    <div
        class="flex flex-col justify-evenly p-10 rounded-xl bg-neutral-400 w-auto"
    >
        <div class="flex flex-col justify-evenly items-center">
            <h1 class="font-bold text-5xl mb-10">Trophies</h1>
        </div>
        <Trophies
            data={data.crownLevel.overall_trophies}
            title="Overall"
            color="yellow"
        ></Trophies>
        <Trophies
            data={data.crownLevel.style_trophies}
            title="Style"
            color="purple"
        ></Trophies>
        <Trophies
            data={data.crownLevel.angler_trophies}
            title="Angler"
            color="blue"
        ></Trophies>
        <Trophies
            data={data.crownLevel.skill_trophies}
            title="Skill"
            color="red"
        ></Trophies>
        <BonusTrophies data={data.crownLevel.overall_trophies}></BonusTrophies>
        {#if data.collections}
            <div class="flex flex-col justify-evenly items-center mt-10">
                <h1 class="font-bold text-5xl mb-10">Currencies</h1>
            </div>
            <div class="flex flex-col justify-start items-start">
                <Currency
                    data={data.collections.currency.coins}
                    currency="Coins"
                    img="coin"
                ></Currency>
                <Currency
                    data={data.collections.currency.anglrTokens}
                    currency="A.N.G.L.R. Tokens"
                    img="angler_token"
                ></Currency>
                <Currency
                    data={data.collections.currency.royalReputation}
                    currency="Royal Reputation"
                    img="royal_reputation"
                ></Currency>
            </div>
        {/if}
    </div>
</div>
