<script lang="ts">
    import CustomImage from "./CustomImage.svelte";

    const { data, username, isOwned } = $props<{
        data: Object;
        username?: string;
        isOwned: boolean;
    }>();

    interface Rarity {
        rarity: string;
        color: string;
    }

    let RARITY: Rarity[] = [
        { rarity: "COMMON", color: "#879696" },
        { rarity: "UNCOMMON", color: "#0b9400" },
        { rarity: "RARE", color: "#0050b7" },
        { rarity: "EPIC", color: "#a033ea" },
        { rarity: "LEGENDARY", color: "#f87c00" },
        { rarity: "MYTHIC", color: "#b62626" },
        { rarity: "COLLECTOR", color: "#facf2e" },
        { rarity: "EXCLUSIVE", color: "#ff8a8e" },
        { rarity: "ARCANE", color: "#7d81df" },
    ];
</script>

<div
    class="flex rounded-[10px] border-4 p-2.5 items-center"
    style="border-color: {RARITY.filter(
        (rarity) => rarity.rarity === data.rarity,
    )[0].color}"
>
    <CustomImage
        src="https://islandcdn.themysterys.com/cosmetics/{data.category.toLowerCase()}/{data.collection
            .replaceAll(' ', '_')
            .toLowerCase()}/{data.name.replaceAll(' ', '_')}.png"
        alt={!username
            ? `${isOwned ? "Obtained" : "Unobtained"} ${data.name} (${data.category.toLowerCase()} cosmetic)`
            : `${username}'s ${data.category.toLowerCase()} cosmetic (${data.name})`}
        customClass="w-[3em] h-[3em] mt-1.25 {isOwned ? '' : 'grayscale'}"
    ></CustomImage>
    <div class="flex flex-col ml-2.5">
        <span class="mb-2.5 font-bold">{data.name}</span>
        <div class="flex flex-row w-[{1 * data.type.length}] h-[1.25em]">
            <CustomImage
                src="https://islandcdn.themysterys.com/icons/rarity/{data.rarity.toLowerCase()}.png"
                alt={data.rarity}
                customClass="w-[{1 * data.rarity.length}] h-[1.25em]"
            ></CustomImage>
            {#if data.type != "STANDARD"}
                <div
                    class="flex flex-row w-[{1 * data.type.length}] h-[1.25em]"
                >
                    <CustomImage
                        src="https://islandcdn.themysterys.com/icons/{[
                            'LEGACY',
                            'PREMIUM',
                        ].includes(data.type)
                            ? 'tooltip'
                            : 'rarity'}/{data.type.toLowerCase()}.png"
                        customClass="ml-2 "
                        alt={data.type}
                    ></CustomImage>
                </div>
            {/if}
        </div>
    </div>
</div>
