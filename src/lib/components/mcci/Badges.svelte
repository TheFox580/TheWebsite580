<script lang="ts">
    import Badge from "./Badge.svelte";

    const { data } = $props<{
        data: Object;
    }>();

    function getCategory(category: string): string {
        switch (category) {
            case "Battle Box":
                return "battle_box";
            case "Dynaball":
                return "dynaball";
            case "Hole In The Wall":
                return "hitw";
            case "Parkour Warrior":
                return "parkour_warrior";
            case "Rocket Spleef Rush":
                return "rocket_spleef";
            case "Sky Battle":
                return "sky_battle";
            case "To Get To The Other Side":
                return "tgttos";
            default:
                return "general";
        }
    }
</script>

<div class="flex flex-col justify-center items-center mb-10 mx-10">
    <h2 class="font-bold text-3xl mb-5">{data.category} Badges</h2>
    <div class="grid grid-cols-4 gap-2.5 auto-rows-auto">
        {#each data.badges as badge}
            <Badge data={badge} category={getCategory(data.category)}></Badge>
        {/each}
    </div>
</div>
