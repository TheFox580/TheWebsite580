<script lang="ts">
    import CustomImage from "./CustomImage.svelte";

    const { data, fish_data, cosmetic_data } = $props<{
        data: Object;
        fish_data: Object;
        cosmetic_data: Object;
    }>();

    function isFish(fish_to_find: string): boolean {
        if (fish_to_find.includes("Crab")) return false;
        for (let fish of fish_data) {
            if (fish.fish.name === fish_to_find) return true;
        }
        return false;
    }

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

    interface RarityColor {
        rarity: string;
        color: string;
    }

    interface Rarity {
        rarity: string;
        name: string;
    }

    let RARITY_COLOR: RarityColor[] = [
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

    let TRASH: Rarity[] = [
        { rarity: "COMMON", name: "Rusted Can" },
        { rarity: "UNCOMMON", name: "Tangled Kelp" },
        { rarity: "RARE", name: "Lost Shoe" },
        { rarity: "EPIC", name: "Royal Residue" },
        { rarity: "LEGENDARY", name: "Forgotten Crown" },
    ];

    interface Lure {
        type: string;
        name: string;
    }

    let LURES: Lure[] = [
        { type: "Elusive", name: "Strong" },
        { type: "Wayfinder", name: "Wise" },
        { type: "Pearl", name: "Glimmering" },
        { type: "Treasure", name: "Greedy" },
        { type: "Spirit", name: "Lucky" },
    ];

    let isFishing: boolean =
        data.asset.name.includes("Augment") ||
        data.asset.name.includes("A.N.G.L.R.") ||
        data.asset.name.includes("Amulet") ||
        data.asset.name.includes("Bait") ||
        data.asset.name.includes("Line") ||
        data.asset.name.includes("Pearl") ||
        data.asset.name.includes("Crab") ||
        data.asset.name == "Refined Cluster Spirit" ||
        [
            "Tangled Kelp",
            "Lost Shoe",
            "Rusted Can",
            "Royal Residue",
            "Forgotten Crown",
        ].includes(data.asset.name) ||
        [
            "Glimmering Spirit",
            "Lucky Spirit",
            "Wise Spirit",
            "Greedy Spirit",
            "Strong Spirit",
        ].includes(data.asset.name) ||
        [
            "Refined Glimmering Spirit",
            "Refined Lucky Spirit",
            "Refined Wise Spirit",
            "Refined Greedy Spirit",
            "Refined Strong Spirit",
        ].includes(data.asset.name) ||
        isFish(data.asset.name);

    let postCategoryURL: string = $state("");

    if (isFishing) {
        postCategoryURL = "fishing/";
        if (isFish(data.asset.name)) {
            let itemToCheck = data.asset.name;
            for (let fish of fish_data) {
                if (data.asset.name === fish.fish.name) {
                    itemToCheck = fish.fish;
                    break;
                }
            }
            postCategoryURL += `fish/${itemToCheck.collection.replaceAll(" ", "_").toLowerCase()}/${itemToCheck.name.replaceAll(" ", "_").toLowerCase()}.png`;
        } else {
            if (data.asset.name.includes("Bait")) {
                postCategoryURL += `perks/baits/${data.asset.name.split(" ")[0].toLowerCase()}.png`;
            } else if (data.asset.name.includes("Augment")) {
                postCategoryURL += `perks/${data.asset.name.split(" ")[1].toLowerCase()}s/${data.asset.name.split(" ")[0].toLowerCase()}.png`;
            } else if (data.asset.name.includes("Crab")) {
                postCategoryURL += `fish/crab_collection/${data.asset.name.replaceAll(" ", "_").toLowerCase()}.png`;
            } else if (data.asset.name.includes("Lure")) {
                postCategoryURL += `perks/lures/${LURES.filter((lure) => lure.type === data.asset.name.split(" ")[1])[0].name.toLowerCase()}.png`;
            } else if (data.asset.name.includes("Line")) {
                postCategoryURL += `perks/lines/${data.asset.name.split(" ")[0].toLowerCase()}.png`;
            } else if (data.asset.name.includes("Spirit")) {
                if (data.asset.name.split(" ")[0] === "Refined") {
                    postCategoryURL += `icons/spirits/${data.asset.name.replace(" Spirit", "").replaceAll(" ", "_").toLowerCase()}.png`;
                } else {
                    postCategoryURL += `icons/spirits/${data.asset.name.split(" ")[0].toLowerCase()}.png`;
                }
            } else if (data.asset.name.includes("Pearl")) {
                postCategoryURL += `icons/pearls/${data.asset.name.split(" ")[0].toLowerCase()}.${data.asset.name.split(" ")[0].toLowerCase() === "pristine" ? "webp" : "png"}`;
            } else if (data.asset.name.includes("Amulet")) {
                postCategoryURL += `icons/amulet/${data.asset.name.split(" ")[0].toLowerCase()}.webp`;
            } else if (!data.asset.name.includes("A.N.G.L.R.")) {
                postCategoryURL += `icons/trash/${TRASH.filter((trash) => trash.name === data.asset.name)[0].rarity.toLowerCase()}.png`;
            }
        }
    } else {
        if (
            !data.asset.name.includes("Blueprint") &&
            !["Task Reroll Token", "30d MCC+ Token"].includes(
                data.asset.name,
            ) &&
            data.asset.name.includes("Token")
        ) {
            postCategoryURL += "cosmetics/";
            let itemToCheck = data.asset.name.replace(" Token", "");
            for (let cosmetic of cosmetic_data) {
                if (cosmetic.cosmetic.name === itemToCheck) {
                    itemToCheck = cosmetic.cosmetic;
                    break;
                }
            }
            postCategoryURL += `${itemToCheck.category.toLowerCase()}/${itemToCheck.collection
                .replaceAll(" ", "_")
                .toLowerCase()}/${itemToCheck.name.replaceAll(" ", "_")}.png`;
        } else {
            postCategoryURL += "icons/";
            if (data.asset.name.includes("Blueprint")) {
                postCategoryURL += "blueprint/cosmetic_";
                let itemToCheck = data.asset.name
                    .replace("Blueprint: ", "")
                    .replace(" Token", "");
                for (let cosmetic of cosmetic_data) {
                    if (cosmetic.cosmetic.name === itemToCheck) {
                        itemToCheck = cosmetic.cosmetic;
                        break;
                    }
                }
                if (itemToCheck.type === "EXCLUSIVE") {
                    postCategoryURL += "exclusive_";
                }
                postCategoryURL += itemToCheck.rarity.toLowerCase() + ".png";
            } else if (data.asset.name.includes("Core")) {
                postCategoryURL += `core/${data.asset.name.replace(" Cosmetic Core", "").toLowerCase()}.png`;
            } else if (
                data.asset.name.includes("Leaf") ||
                data.asset.name.includes("Bug")
            ) {
                postCategoryURL += `events/spirit_blossom/${data.asset.name.replaceAll(" ", "_").toLowerCase()}.png`;
            } else if (
                data.asset.name === "Snowflake" ||
                data.asset.name === "Candy Cane"
            ) {
                postCategoryURL += `events/winter/${data.asset.name.replaceAll(" ", "_").toLowerCase()}.png`;
            } else if (
                ["Ancient Spirit", "Spooky Spirit"].includes(data.asset.name) ||
                data.asset.name.includes("Candy")
            ) {
                postCategoryURL += `events/halloween/${data.asset.name.replaceAll(" ", "_").toLowerCase()}.png`;
            } else if (data.asset.name.includes("Scroll")) {
                postCategoryURL += `quest_scroll/${data.asset.name.split(" ")[0].toLowerCase()}.png`;
            } else if (data.asset.name === "Daily Challenge Ticket") {
                postCategoryURL += `misc/daily_challenge_ticket.png`;
            } else if (data.asset.name.includes("MCC+")) {
                postCategoryURL += `misc/mcc_plus.png`;
            } else if (data.asset.name.includes("Token")) {
                postCategoryURL += `quest_token/${data.asset.name.replace(" Token", "").replace("Task ", "").toLowerCase()}.png`;
            } else if (data.asset.name.includes("Cluster")) {
                postCategoryURL += `material/cluster_${data.asset.name.split(" ")[0].replaceAll(" ", "_").toLowerCase()}.png`;
            } else {
                postCategoryURL += `material/${data.asset.name.replaceAll(" ", "_").toLowerCase()}.png`;
            }
        }
    }
</script>

<div
    class="flex rounded-[10px] border-4 p-2.5 items-center"
    style="border-color: {RARITY_COLOR.filter(
        (rarity) => rarity.rarity === data.asset.rarity,
    )[0].color}"
>
    <CustomImage
        src="https://islandcdn.themysterys.com/{postCategoryURL}"
        alt={isFishing ? "Fish" : "Asset"}
        customClass="w-[3em] h-[3em] mt-1.25"
    ></CustomImage>
    <div class="flex flex-col ml-2.5 justify-center">
        <span class="font-bold"
            >{data.asset.name}
            {data.amount > 1 ? `x${formatInt(data.amount)}` : ""}</span
        >
        <div
            class="flex flex-row w-[{1 *
                data.asset.rarity.length}em] h-[1.25em]"
        >
            <CustomImage
                src="https://islandcdn.themysterys.com/icons/rarity/{data.asset.rarity.toLowerCase()}.png"
                alt={data.asset.rarity}
            ></CustomImage>
        </div>
    </div>
</div>
