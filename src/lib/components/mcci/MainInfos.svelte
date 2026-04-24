<script lang="ts">
    import CustomImage from "./CustomImage.svelte";
    const { data } = $props<{
        data: Object;
    }>();

    interface Ranks {
        id: string;
        rank: string;
    }

    let RANKS: Ranks[] = [
        { id: "NONE", rank: "None" },
        { id: "CHAMP", rank: "Champ" },
        { id: "GRAND_CHAMP", rank: "Grand Champ" },
        { id: "GRAND_CHAMP_ROYALE", rank: "Grand Champ Royale" },
        { id: "GRAND_CHAMP_SUPREME", rank: "Grand Champ Supreme" },
        { id: "CREATOR", rank: "Content Creator" },
        { id: "CONTESTANT", rank: "MCC Contestant" },
        { id: "MODERATOR", rank: "MCCI Moderator" },
        { id: "NOXCREW", rank: "Noxcrew Staff" },
    ];

    let possibleRank: string = data.ranks.length === 0 ? "NONE" : data.ranks[0];

    let userRank: string = RANKS.filter((rank) => rank.id === possibleRank)[0]
        .rank;

    let mccPlus: number = $state(1);

    if (data.mccPlusStatus != null) {
        if (data.mccPlusStatus.totalDays >= 360) {
            mccPlus = 3;
        } else if (data.mccPlusStatus.totalDays >= 90) {
            mccPlus = 2;
        }
    }
</script>

<div
    class="flex flex-col justify-evenly items-center my-20 rounded-xl bg-neutral-400 w-9/10"
>
    <div class="flex flex-row justify-evenly items-center px-20 m-20 w-3/5">
        <div class="flex flex-col justify-evenly items-center">
            <h1 class="font-bold text-5xl mb-1">
                MCCI Stats : {data.username}
            </h1>
            <div class="flex flex-row justify-evenly items-center">
                <img
                    src={userRank === "None"
                        ? "#"
                        : `https://islandcdn.themysterys.com/ranks_long/${data.ranks[0].toLowerCase()}.png`}
                    alt={userRank === "None"
                        ? `${data.username} doesn't have a rank.`
                        : `${data.username}'s rank is ${userRank}.`}
                    class="w-xs text-center"
                />
                {#if data.mccPlusStatus != null}
                    <CustomImage
                        src="https://islandcdn.themysterys.com/ranks/plus_{mccPlus}.png"
                        alt="{data.username}'s MCC+  badge"
                        customClass="w-10 ml-5 rounded-[5px]"
                    ></CustomImage>
                {/if}
            </div>
        </div>
        <CustomImage
            src="https://minotar.net/helm/{data.uuid}/100"
            alt="{data.username}'s skin head"
            customClass="rounded-xl self-center"
        ></CustomImage>
    </div>
</div>
