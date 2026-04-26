<script lang="ts">
    import CustomImage from "./CustomImage.svelte";
    import ProgressBar from "./ProgressBar.svelte";

    const { data, category } = $props<{
        data: Object;
        category: string;
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

    function decimalToRoman(number: number): string {
        const RN = [
            "I",
            "IV",
            "V",
            "IX",
            "X",
            "XL",
            "L",
            "XC",
            "C",
            "CD",
            "D",
            "CM",
            "M",
        ];
        const VRN = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
        var div = 0;

        var ind = RN.length - 1;
        var retRN = "";

        while (number > 0) {
            div = Math.floor(number / VRN[ind]);
            number = number % VRN[ind];

            while (div--) {
                retRN = retRN + RN[ind];
            }
            ind--;
        }

        return retRN;
    }

    let badge_former_name: string = $state(
        data.badge.name.toLowerCase().replaceAll(" ", "_"),
    );

    //Edge Cases:

    switch (badge_former_name) {
        case "slimey_experiments_challenge":
            badge_former_name = "slimy_experiments_challenge";
            break;
        case "slimey_experiments_pass":
            badge_former_name = "slimy_experiments_pass";
            break;
        case "jackpot!":
            badge_former_name = "jackpot";
            break;
        case "community_contribution_points":
            badge_former_name = "community_contributor";
            break;
        default:
            break;
    }

    let stageCompleted = $state(0);

    for (let stage of data.stageProgress) {
        if (stage.progress.obtained >= stage.progress.obtainable) {
            stageCompleted++;
        }
    }

    let percentCompleted = Math.min(
        Math.round(
            (data.stageProgress[
                Math.min(data.stageProgress.length - 1, stageCompleted)
            ].progress.obtained /
                data.stageProgress[
                    Math.min(data.stageProgress.length - 1, stageCompleted)
                ].progress.obtainable) *
                100 *
                100,
        ) / 100,
        100,
    );

    let unobtainable: boolean =
        data.badge.name.includes("Pass") ||
        data.badge.name.includes("Challenge") ||
        category === "general";

    let badgeColor: string = "oklch(64.6% 0.222 41.116)";

    if (!stageCompleted) {
        if (unobtainable) {
            badgeColor = "oklch(44.4% 0.177 26.899)";
        } else {
            badgeColor = "oklch(57.7% 0.245 27.325)";
        }
    } else if (data.stageProgress.length == stageCompleted) {
        if (unobtainable) {
            badgeColor = "oklch(39.3% 0.095 152.535)";
        } else {
            badgeColor = "oklch(62.7% 0.194 149.214)";
        }
    }
</script>

<div
    class="flex flex-row items-center rounded-[10px] border-4 p-2.5"
    style="border-color:{badgeColor}"
>
    <CustomImage
        src="https://islandcdn.themysterys.com/badges/{category}/{badge_former_name}.png"
        alt="{data.badge.name} Badge Icon"
        customClass="w-[3em] h-[3em] {stageCompleted === 0 ? 'grayscale' : ''}"
    ></CustomImage>
    <div class="flex flex-col ml-2.5 justify-center w-full">
        <span class="font-bold text-white align-text-top"
            >{data.badge.name}
            {data.stageProgress.length > 1 && stageCompleted > 0
                ? ` ${decimalToRoman(Math.min(data.stageProgress.length, stageCompleted + 1))} / ${decimalToRoman(data.stageProgress.length)}`
                : ""}</span
        >
        <span class="font-bold mb-1.5" style="color:{badgeColor}"
            >{stageCompleted === 0
                ? `0/${formatInt(data.stageProgress[0].progress.obtainable)}`
                : `${formatInt(data.stageProgress[Math.min(data.stageProgress.length - 1, stageCompleted)].progress.obtained)} / ${formatInt(data.stageProgress[Math.min(data.stageProgress.length - 1, stageCompleted)].progress.obtainable)}`}</span
        >
        <ProgressBar
            progress={data.stageProgress[
                Math.min(data.stageProgress.length - 1, stageCompleted)
            ].progress.obtained}
            total={data.stageProgress[
                Math.min(data.stageProgress.length - 1, stageCompleted)
            ].progress.obtainable}
            background_color="black"
            foreground_color={badgeColor}
        ></ProgressBar>
    </div>
</div>
