<script lang="ts">
    import CustomImage from "./CustomImage.svelte";
    const { data, title, color } = $props<{
        data: Object;
        title: string;
        color: string;
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
</script>

<div class="flex flex-row justify-start items-center mb-1">
    <CustomImage
        src="https://islandcdn.themysterys.com/icons/trophies/{color}.png"
        alt="{title} trophies logo"
        customClass="w-[2em] mr-1"
    ></CustomImage>
    <span class="font-bold"
        >{formatInt(data.obtained)} / {formatInt(data.obtainable)}
        {title} Trophies</span
    >
</div>
