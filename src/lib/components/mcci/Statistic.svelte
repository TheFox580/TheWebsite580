<script lang="ts">
    import CustomImage from "./CustomImage.svelte";

    const { data, stat, img, type } = $props<{
        data: number;
        stat: string;
        img: string;
        type: string
    }>();

    let hours: number = $state(data);

    if (hours > 0){
      hours = Math.round(hours/20/60/60*100)/100;
    }

    function getColor(game: string): string{
      switch (game){
        case "rocket_spleef": return "rgb(84, 63, 64)";
        case "tgttos": return "rgb(79, 64, 62)";
        case "battle_box": return "rgb(41, 58, 31)";
        case "sky_battle": return "rgb(115, 45, 17)";
        case "battle_box_arena": return "rgb(125, 22, 13)";
        case "hitw": return "rgb(25, 104, 47)";
        case "parkour_warrior": return "rgb(48, 99, 37)";
        case "dynaball": return "rgb(54, 37, 49)";
        case "nicetryloser": return "rgb(84, 111, 131)"
        default: return "rgb(84, 84, 45)";
      }
    }
</script>

<div
    class="flex flex-row items-center p-2.5 border-4 rounded-[10px]"
    style="border-color: {getColor(img)};"
>
    {#if type === "hidden"}
        <CustomImage
            src="https://islandcdn.themysterys.com/games/{img}/icon.png"
            alt="{img} icon"
            customClass="w-[2em] h-[2em] mr-2.5"
        ></CustomImage>
        <div class="flex flex-col ml-2.5 justify-center w-full">
            <span class="font-bold text-white align-text-top"
                >{stat}</span
            >
            {#if type === "time"}
                <span class="font-bold"
                    >{hours} hours</span
                >
            {:else if type === "games"}
                <span class="font-bold"
                    >{data} games</span
                >
            {/if}
        </div>
    {:else}
        <CustomImage
            src="https://islandcdn.themysterys.com/games/{img}/icon.png"
            alt="{img} icon"
            customClass="w-[2em] h-[2em] mr-2.5"
        ></CustomImage>
        <div class="flex flex-col ml-2.5 justify-center w-full">
            <span class="font-bold text-white align-text-top"
                >{stat}</span
            >
            {#if type === "time"}
                <span class="font-bold"
                    >{hours} hours</span
                >
            {:else if type === "games"}
                <span class="font-bold"
                    >{data} games</span
                >
            {/if}
        </div>
    {/if}
</div>
