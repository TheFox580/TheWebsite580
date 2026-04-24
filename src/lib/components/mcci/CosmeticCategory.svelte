<script lang="ts">
    import ProgressBar from "./ProgressBar.svelte";
    import Cosmetic from "./Cosmetic.svelte";

    const { data, name } = $props<{
        data: Object;
        name: string;
    }>();

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

    for (let cosmetic of data.cosmetics) {
        cosmeticOwned += cosmetic.cosmetic.owned;
    }
</script>

<div class="flex flex-col justify-evenly items-center w-9/10 mb-15">
    <h2 class="font-bold text-2xl mb-5">{name}</h2>
    <ProgressBar
        progress={cosmeticOwned}
        total={data.cosmetics.length}
        background_color="red"
        foreground_color="lime"
    ></ProgressBar>
    <p class="font-bold">
        {formatInt(cosmeticOwned)} / {formatInt(data.cosmetics.length)}* ({Math.round(
            (cosmeticOwned / data.cosmetics.length) * 100 * 100,
        ) / 100}%)
    </p>
    <p class="font-bold mb-10">
        *This number may vary among players due to some Legacy Cosmetics
    </p>
    <div class="grid grid-cols-3 gap-2.5 auto-rows-auto">
        {#each data.cosmetics as cosmetic}
            <Cosmetic
                data={cosmetic.cosmetic.cosmetic}
                isOwned={cosmetic.cosmetic.owned}
            ></Cosmetic>{/each}
    </div>
</div>
