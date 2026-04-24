<script lang="ts">
    import CosmeticCategory from "./CosmeticCategory.svelte";
    import ProgressBar from "./ProgressBar.svelte";

    const { data } = $props<{
        data: Object;
    }>();

    interface ICosmeticCategory {
        id: string;
        name: string;
    }

    interface Cosmetic {
        category: string;
        cosmetic: Object;
    }

    interface CosmeticList {
        category: string;
        cosmetics: Cosmetic[];
    }

    let COSMETIC_CATEGORY: ICosmeticCategory[] = [
        { id: "HAT", name: "Hat" },
        { id: "HAIR", name: "Hair" },
        { id: "ACCESSORY", name: "Accessory" },
        { id: "AURA", name: "Aura" },
        { id: "TRAIL", name: "Trail" },
        { id: "CLOAK", name: "Cloak" },
        { id: "ROD", name: "Rod" },
        { id: "SWORD", name: "Sword" },
        { id: "BOW", name: "Bow" },
        { id: "CROSSBOW", name: "Crossbow" },
        { id: "HEAVY_CROSSBOW", name: "Heavy Crossbow" },
        { id: "SHORTBOW", name: "Shortbow" },
        { id: "DAGGER", name: "Dagger" },
        { id: "AXE", name: "Axe" },
    ];

    function formatInt(int: number): string {
        let str = `${int}`.split("").reverse();
        let res = "";

        for (let index = 0; index < str.length; index++) {
            if (!(index % 3) && index > 0) {
                res += ",";
            }
            res += str[index];
        }

        return res.split("").reverse().join("");
    }

    let cosmeticOwned: number = 0;

    for (let cosmetic of data) {
        cosmeticOwned += cosmetic.owned;
    }

    let sortedCosmetics: CosmeticList[] = [];

    for (let category of COSMETIC_CATEGORY) {
        let list: CosmeticList = { category: category.id, cosmetics: [] };
        for (let cosmetic of data) {
            if (cosmetic.cosmetic.category === category.id) {
                let correctCosmetic: Cosmetic = {
                    category: category.id,
                    cosmetic: cosmetic,
                };
                list.cosmetics.push(correctCosmetic);
            }
        }
        sortedCosmetics.push(list);
    }

    sortedCosmetics.sort((a, b) => (a.category < b.category ? -1 : 1));
</script>

<div class="flex flex-row align-center justify-center w-9/10">
    <div
        class="flex flex-col justify-evenly items-center m-5 p-10 rounded-xl bg-neutral-400 w-full"
    >
        <h1 class="font-bold text-5xl mb-10">Cosmetics</h1>
        <div class="flex flex-col justify-evenly items-center mb-5 w-8/10">
            <h2 class="font-bold text-2xl mb-5">Total cosmetic owned :</h2>
            <ProgressBar
                progress={cosmeticOwned}
                total={data.length}
                background_color="red"
                foreground_color="lime"
            ></ProgressBar>
            <p class="font-bold">
                {formatInt(cosmeticOwned)} / {formatInt(data.length)}* ({Math.round(
                    (cosmeticOwned / data.length) * 100 * 100,
                ) / 100}%)
            </p>
            <p class="font-bold mb-20">
                *This number may vary among players due to some Legacy Cosmetics
            </p>
            {#each sortedCosmetics as category}
                <CosmeticCategory
                    data={category}
                    name={COSMETIC_CATEGORY.filter(
                        (cat) => cat.id === category.category,
                    )[0].name}
                ></CosmeticCategory>
            {/each}
        </div>
    </div>
</div>
