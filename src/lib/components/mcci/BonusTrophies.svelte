<script lang="ts">
    const { data } = $props<{
        data: Object;
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
    <img
        src="https://islandcdn.themysterys.com/icons/trophies/silver.png"
        alt="Bonus trophies logo"
        class="w-[2em] mr-1"
    />
    <span class="font-bold"
        >{formatInt(data.bonus)}
        Bonus Trophies</span
    >
</div>
