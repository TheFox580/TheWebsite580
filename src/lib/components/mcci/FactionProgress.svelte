<script lang="ts">
    import CustomImage from "./CustomImage.svelte";
    import ProgressBar from "./ProgressBar.svelte";

    const { data, username } = $props<{
        data: Object | null;
        username: string;
    }>();

    interface FactionColor {
        name: string;
        color: string;
    }

    let FACTION_COLOR: FactionColor[] = [
        { name: "RED_RABBITS", color: "#ff0000" },
        { name: "ORANGE_OCELOTS", color: "#cc6600" },
        { name: "YELLOW_YAKS", color: "#ffff00" },
        { name: "LIME_LLAMAS", color: "#00ff00" },
        { name: "GREEN_GECKOS", color: "#009933" },
        { name: "CYAN_COYOTES", color: "#0086b3" },
        { name: "AQUA_AXOLOTLS", color: "#00ffff" },
        { name: "BLUE_BATS", color: "#0000ff" },
        { name: "PURPLE_PANDAS", color: "#6600cc" },
        { name: "PINK_PARROTS", color: "#cc00cc" },
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

    function getColor(): string {
        if (data === null) {
            return "black";
        }
        return FACTION_COLOR.filter((faction) => faction.name === data.name)[0]
            .color;
    }

    let lw: number = 0;
    let lc: number = 0;

    if (data != null) {
        lw =
            Math.round(
                (data.levelData.nextLevelProgress.obtained /
                    data.levelData.nextLevelProgress.obtainable) *
                    100 *
                    100,
            ) / 100;

        lc =
            Math.floor(data.levelData.level / 10) > 10
                ? 10
                : Math.floor(data.levelData.level / 10);
    }
</script>

<div class="flex flex-col justify-evenly items-center mb-5 w-full">
    <h2
        class="flex flex-row justify-center items-center font-bold text-3xl mb-1 w-full"
    >
        Faction Level: {data === null ? 0 : data.levelData.level}
        {#if data != null}
            <CustomImage
                src="https://islandcdn.themysterys.com/factions/{data.name
                    .split('_')[0]
                    .toLowerCase()}/{Math.floor(data.levelData.level / 30) > 9
                    ? 9
                    : Math.floor(data.levelData.level / 30)}.png"
                alt="{username}'s faction prestige"
                customClass="w-[1.5em] h-[1em] align-bottom ml-5"
            ></CustomImage>
        {/if}
    </h2>
    {#if data != null}
        <ProgressBar
            progress={data.levelData.nextLevelProgress.obtained}
            total={data.levelData.nextLevelProgress.obtainable}
            background_color="black"
            foreground_color={getColor()}
        ></ProgressBar>
        <p class="font-bold">
            {lw}% to Level {data.levelData.level + 1} ({formatInt(
                data.levelData.nextLevelProgress.obtained,
            )} /
            {formatInt(data.levelData.nextLevelProgress.obtainable)})
        </p>
    {/if}
</div>
