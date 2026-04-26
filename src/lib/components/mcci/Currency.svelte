<script lang="ts">
    import CustomImage from "./CustomImage.svelte";

    const { data, currency, img } = $props<{
        data: Object;
        currency: string;
        img: string;
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

    let MAX_ROYAL_REP: number = 22380;
</script>

<div class="flex flex-row justify-start items-center mb-2.5">
    <CustomImage
        src="https://islandcdn.themysterys.com/icons/currency/{img}.png"
        alt="{currency} icon"
        customClass="w-[2em] h-[2em] mr-2.5"
    ></CustomImage>
    <span class="font-bold"
        >{formatInt(data)}
        {currency === "Royal Reputation" ? `/ ${formatInt(MAX_ROYAL_REP)}` : ""}
        {currency}</span
    >
</div>
