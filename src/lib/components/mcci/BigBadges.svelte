<script lang="ts">
    import Badges from "./Badges.svelte";

    const { data } = $props<{
        data: Object;
    }>();

    interface FindBadge {
        name: string;
        category: string;
    }

    interface FindBadgeListed {
        category: string;
        badges: FindBadge[];
    }

    interface FoundBadges {
        category: string;
        badges: Object[];
    }

    let bb_badges: FindBadge[] = [
        { name: "Ace From Afar", category: "Battle Box" },
        { name: "Ace in the Box", category: "Battle Box" },
        { name: "Aerial Assault", category: "Battle Box" },
        { name: "Battle Box Champion", category: "Battle Box" },
        { name: "Battle Box Expert", category: "Battle Box" },
        { name: "Raiders Challenge", category: "Battle Box" },
        { name: "Raiders Pass", category: "Battle Box" },
        { name: "Knights Challenge", category: "Battle Box" },
        { name: "Knights Pass", category: "Battle Box" },
        { name: "Battle Box Player", category: "Battle Box" },
        { name: "Battle Box Warrior", category: "Battle Box" },
        { name: "Blind Brawl", category: "Battle Box" },
        { name: "Demolitions Expert", category: "Battle Box" },
        { name: "Flawless Battle", category: "Battle Box" },
        { name: "Savior Ace", category: "Battle Box" },
        { name: "Stealthy Takedown", category: "Battle Box" },
        { name: "Ultimate Ace", category: "Battle Box" },
        { name: "Untouchable Assassin", category: "Battle Box" },
    ];

    let dynaball_badges: FindBadge[] = [
        { name: "Airstrike Assassin", category: "Dynaball" },
        { name: "Dynaball Champion", category: "Dynaball" },
        { name: "Dynaball Demolitionist", category: "Dynaball" },
        { name: "Dynaball Engineer", category: "Dynaball" },
        { name: "Slapstick Challenge", category: "Dynaball" },
        { name: "Slapstick Pass", category: "Dynaball" },
        { name: "Nuclear Challenge", category: "Dynaball" },
        { name: "Nuclear Pass", category: "Dynaball" },
        { name: "Dynaball Sniper", category: "Dynaball" },
        { name: "Dynaball Spawner Smasher", category: "Dynaball" },
        { name: "Dynaball Survivor", category: "Dynaball" },
        { name: "Dynaballin", category: "Dynaball" },
        { name: "Dynamite Dreadlord", category: "Dynaball" },
        { name: "Final Survivor", category: "Dynaball" },
        { name: "Massive Repairs", category: "Dynaball" },
        { name: "Tactical Powder", category: "Dynaball" },
        { name: "Ultimate Baller", category: "Dynaball" },
    ];

    let hitw_badges: FindBadge[] = [
        { name: "Barely Broiled", category: "Hole In The Wall" },
        { name: "Blaze of Glory", category: "Hole In The Wall" },
        { name: "Bring On The Wall", category: "Hole In The Wall" },
        { name: "Bullet Time", category: "Hole In The Wall" },
        { name: "Hole in the Wall Champion", category: "Hole In The Wall" },
        { name: "Hole in the Wall Expert", category: "Hole In The Wall" },
        { name: "Slimey Experiments Challenge", category: "Hole In The Wall" },
        { name: "Slimey Experiments Pass", category: "Hole In The Wall" },
        { name: "Wall King Challenge", category: "Hole In The Wall" },
        { name: "Wall King Pass", category: "Hole In The Wall" },
        { name: "Monster Catch", category: "Hole In The Wall" },
        { name: "Slimey Rivalry", category: "Hole In The Wall" },
        { name: "Something In The Waves", category: "Hole In The Wall" },
    ];

    let pkw_badges: FindBadge[] = [
        { name: "Advanced Completionist", category: "Parkour Warrior" },
        { name: "Advanced Leaper", category: "Parkour Warrior" },
        { name: "Parkour Warrior Assassin", category: "Parkour Warrior" },
        { name: "Parkour Warrior Champion", category: "Parkour Warrior" },
        { name: "Expert Completionist", category: "Parkour Warrior" },
        { name: "Expert Leaper", category: "Parkour Warrior" },
        { name: "Parkour Warrior Finalist", category: "Parkour Warrior" },
        { name: "Master Frog Challenge", category: "Parkour Warrior" },
        { name: "Master Frog Pass", category: "Parkour Warrior" },
        { name: "Cherry Blossom Challenge ", category: "Parkour Warrior" },
        { name: "Cherry Blossom Pass", category: "Parkour Warrior" },
        { name: "Standard Completionist", category: "Parkour Warrior" },
        { name: "Standard Leaper", category: "Parkour Warrior" },
    ];

    let rsr_badges: FindBadge[] = [
        { name: "Advanced Tactics", category: "Rocket Spleef Rush" },
        { name: "Careful Glider", category: "Rocket Spleef Rush" },
        { name: "Flawless Rocketeer", category: "Rocket Spleef Rush" },
        { name: "Rocket Brawler", category: "Rocket Spleef Rush" },
        { name: "Rocket Rush", category: "Rocket Spleef Rush" },
        { name: "Rocket Spleef Champion", category: "Rocket Spleef Rush" },
        { name: "Rocket Spleef Expert", category: "Rocket Spleef Rush" },
        { name: "Rocket Spleef Glider", category: "Rocket Spleef Rush" },
        { name: "Spleef Sniper", category: "Rocket Spleef Rush" },
        { name: "Rocket Spleef Survivor", category: "Rocket Spleef Rush" },
        { name: "Rocket Spleef Warrior", category: "Rocket Spleef Rush" },
        { name: "Spleef Slapdown", category: "Rocket Spleef Rush" },
        { name: "Ultimate Rocketeer", category: "Rocket Spleef Rush" },
    ];

    let skb_badges: FindBadge[] = [
        { name: "Creeper Coffin", category: "Sky Battle" },
        { name: "Fallen Warrior", category: "Sky Battle" },
        { name: "Personal Feast", category: "Sky Battle" },
        { name: "Sky Battle Champion", category: "Sky Battle" },
        { name: "Sky Battle Expert", category: "Sky Battle" },
        { name: "Sky Battle Player", category: "Sky Battle" },
        { name: "Sky Battle Warrior", category: "Sky Battle" },
        { name: "Sky Lord Challenge", category: "Sky Battle" },
        { name: "Sky Lord Pass", category: "Sky Battle" },
        { name: "Storm Lord Challenge", category: "Sky Battle" },
        { name: "Storm Lord Pass", category: "Sky Battle" },
        { name: "Sky Lord", category: "Sky Battle" },
        { name: "Sky Sniper", category: "Sky Battle" },
        { name: "Team Crusher", category: "Sky Battle" },
        { name: "Untouchable Champion", category: "Sky Battle" },
        { name: "Wings to Fly", category: "Sky Battle" },
    ];

    let tgttos_badges: FindBadge[] = [
        { name: "Chicken Puncher", category: "To Get To The Other Side" },
        { name: "Got the Worm", category: "To Get To The Other Side" },
        { name: "Jackpot!", category: "To Get To The Other Side" },
        { name: "Pave the Way", category: "To Get To The Other Side" },
        { name: "Slapdown", category: "To Get To The Other Side" },
        { name: "TGTTOS Champion", category: "To Get To The Other Side" },
        { name: "TGTTOS Expert", category: "To Get To The Other Side" },
        { name: "Eggcellent Challenge", category: "To Get To The Other Side" },
        { name: "Eggcellent Pass", category: "To Get To The Other Side" },
        { name: "Roadworks Challenge", category: "To Get To The Other Side" },
        { name: "Roadworks Pass", category: "To Get To The Other Side" },
        { name: "TGTTOS Round Champion", category: "To Get To The Other Side" },
        { name: "TGTTOS Round Expert", category: "To Get To The Other Side" },
        { name: "Triple Champion", category: "To Get To The Other Side" },
        { name: "Ultimate Comeback", category: "To Get To The Other Side" },
        { name: "Untouchable Speedster", category: "To Get To The Other Side" },
        { name: "Victorious Pacifist", category: "To Get To The Other Side" },
    ];

    let badges_sorted: FindBadgeListed[] = [
        { category: "Battle Box", badges: bb_badges },
        { category: "Dynaball", badges: dynaball_badges },
        { category: "Hole In The Wall", badges: hitw_badges },
        { category: "Parkour Warrior", badges: pkw_badges },
        { category: "Rocket Spleef Rush", badges: rsr_badges },
        { category: "Sky Battle", badges: skb_badges },
        { category: "To Get To The Other Side", badges: tgttos_badges },
    ];

    let badges: FoundBadges[] = [
        { category: "Battle Box", badges: [] },
        { category: "Dynaball", badges: [] },
        { category: "Hole In The Wall", badges: [] },
        { category: "Parkour Warrior", badges: [] },
        { category: "Rocket Spleef Rush", badges: [] },
        { category: "Sky Battle", badges: [] },
        { category: "To Get To The Other Side", badges: [] },
        { category: "General", badges: [] },
    ];

    for (let badge of data) {
        let added = false;
        for (let category of badges_sorted) {
            for (let loooked_badge of category.badges) {
                if (loooked_badge.name === badge.badge.name) {
                    badges
                        .filter(
                            (also_category) =>
                                also_category.category === category.category,
                        )[0]
                        .badges.push(badge);
                    added = true;
                    break;
                }
            }
        }
        if (!added) {
            badges
                .filter((category) => category.category === "General")[0]
                .badges.push(badge);
        }
    }
</script>

<div class="flex flex-row items-center justify-center w-9/10">
    <div
        class="flex flex-col justify-evenly items-center m-5 p-10 rounded-xl bg-neutral-400 w-full"
    >
        <h1 class="font-bold text-5xl mb-10">Badges</h1>
        <h2 class="font-bold text-2xl mb-5">Color caption:</h2>
        <p class="font-bold flex flex-col justify-center text-center mb-20">
            <span class="text-red-800"
                >Not obtained and no longer obtainable</span
            >
            <span class="text-red-600">Not obtained yet</span>
            <span class="text-orange-600">Completing this badge / stage</span>
            <span class="text-green-600">Obtained this badge</span>
            <span class="text-green-900">Obtained and no longer obtainable</span
            >
        </p>
        {#each badges as category}
            <Badges data={category}></Badges>
        {/each}
    </div>
</div>
