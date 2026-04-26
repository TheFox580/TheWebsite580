<script lang="ts">
    import CustomImage from "./CustomImage.svelte";
    import ProgressBar from "./ProgressBar.svelte";

    const { data, username, title, category, icon } = $props<{
        data: Object;
        username: string;
        title: string;
        category: string;
        icon: string;
    }>();

    interface LevelColor {
        level: number;
        color: string;
    }

    let LEVEL_COLOR: LevelColor[] = [
        { level: 0, color: "#363637" },
        { level: 1, color: "#71719a" },
        { level: 2, color: "#02b61b" },
        { level: 3, color: "#0054d2" },
        { level: 4, color: "#862eec" },
        { level: 5, color: "#ff5400" },
        { level: 6, color: "#ff1b1d" },
        { level: 7, color: "#50cfb0" },
        { level: 8, color: "#aaaaff" },
        { level: 9, color: "#ff738f" },
        { level: 10, color: "#3926ab" },
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

    let lw: number =
        Math.round(
            (data.nextLevelProgress.obtained /
                data.nextLevelProgress.obtainable) *
                100 *
                100,
        ) / 100;

    let lc: number =
        Math.floor(data.level / 10) > 10 ? 10 : Math.floor(data.level / 10);
</script>

<div class="flex flex-col justify-evenly items-center mb-5 w-full">
    <h2
        class="flex flex-row justify-center items-center font-bold text-3xl mb-1 w-full"
    >
        {title} Level: {data.level}
        <CustomImage
            src="https://islandcdn.themysterys.com/{category}/{icon}/{Math.floor(
                data.level / 10,
            ) > 10
                ? 10
                : Math.floor(data.level / 10)}.png"
            alt="{username}'s {title.toLowerCase()} level"
            customClass="w-[1em] h-[1em] align-bottom ml-5"
        ></CustomImage>
    </h2>
    <ProgressBar
        progress={data.nextLevelProgress.obtained}
        total={data.nextLevelProgress.obtainable}
        background_color="black"
        foreground_color={LEVEL_COLOR[lc].color}
    ></ProgressBar>
    <p class="font-bold">
        {lw}% to Level {data.level + 1} ({formatInt(
            data.nextLevelProgress.obtained,
        )} /
        {formatInt(data.nextLevelProgress.obtainable)})
    </p>
</div>
