<script lang="ts">
    import NavBar from "$lib/components/other/NavBar.svelte";
    import { ArrowRight, MoveRight } from "@o7/icon/lucide";
    import { X, Github, Youtube } from "@o7/icon/brands"

    let innerHeight = $state(0);

    const worked_on = [
        {text: "Custom Bingo", type: "Minecraft", time: "2023", link: "https://www.youtube.com/watch?v=8eRBiOoEqS4", icon: "Youtube"},
        {text: "Crown Quest", type: "Minecraft", time: "2023 - 2025", link: "https://www.youtube.com/@CrownQuestMC", icon: "Youtube"},
        {text: "Unity Studios (now UNPROD)", type: "Minecraft", time:"2023-2025", link: "https://www.twitter.com/UNPRODSTUDIO", icon: "Twitter"},
        {text: "Collect Every Block - Duo", type: "Minecraft", time:"2025", link: "https://github.com/TheFox580/CollectEveryBlockDuo", icon: "Github"},
        {text: "Talent Show", type: "Minecraft", time: "2026", link: "https://www.youtube.com/watch?v=9fHnvqibfG0", icon: "Youtube"},
        {text: "MCC Island Statistics", type: "Minecraft", time: "2026", link: "https://github.com/TheFox580/TheWebsite580/tree/main/src/routes/mcci/[user]", icon: "Github"},
        {text: "Archipelago Client", type: "Archipelago", time: "2026", link: "https://github.com/TheFox580/TheWebsite580/tree/main/src/routes/archipelago", icon: "Github"},
        {text: "Playing on piano", type: "Minecraft", time: "2026", link: "https://www.youtube.com/watch?v=BXXjId1fRCE&t=12024", icon: "Youtube"},
        {text: "Custom Schedule System", type: "Streaming / Twitch", time: "2026", link: "https://github.com/TheFox580/TheWebsite580/tree/main/src/routes/schedule", icon: "Github"},
        {text: "Custom Game Nights System", type: "Gaming (in general)", time: "2026", link: "https://github.com/TheFox580/TheWebsite580/tree/main/src/routes/gamenights", icon: "Github"}
    ]

    const working_on = [
        {text: "TheEvents580", type: "Minecraft", time: "Since 2023", link: "https://www.twitter.com/TheEvents580", icon: "Twitter"},
        {text: "Fruit Wars", type: "Minecraft", time: "Since 2023", link: "https://www.twitter.com/FruitWarsEvent", icon: "Twitter"},
        {text: "MC Mayhem", type: "Minecraft", time: "Since 2024", link: "https://www.twitter.com/ItsMCMayhem", icon: "Twitter"},
        {text: "Forsaken Isle", type: "Minecraft", time: "Since 2024", link: "https://www.twitter.com/ForsakenIsleSMP", icon: "Twitter"},
        {text: "BluePrint", type: "Minecraft", time: "Since 2025", link: "https://www.twitter.com/BluePrintUpdate", icon: "Twitter"},
        {text: "Goofy Games", type: "Minecraft", time: "Since 2025", link: "https://www.twitter.com/GoofyGamesMC", icon: "Twitter"},
        {text: "This Website", type: "Svelte", time: "Since 2025", link: "https://github.com/TheFox580/TheWebsite580", icon: "Github"}
    ]
</script>

<svelte:window bind:innerHeight />

<svelte:head>
    <title>Projects | TheFox580's website!</title>

    <style>
        html {
            background-color: var(--color-mocha-bg);
        }
    </style>
</svelte:head>

<div class="text-mocha-text flex flex-row text-center">

    <div class="w-1/5 flex flex-row items-center">
        <NavBar loc="projects"></NavBar>
    </div>

    <div class="w-4/5 text-mocha-text flex flex-row text-center">
            <div class="w-1/2 h-full flex flex-col py-5 px-2 items-center justify-start border-r-2 border-mocha-border" style="height: {innerHeight}px;">
                <h1 class="text-4xl mb-5">Worked on:</h1>
                {#each worked_on as work}
                    <div class="flex flex-row items-center mb-2">
                        {#if work.icon === "Twitter"}
                            <X/>
                        {:else if work.icon === "Github"}
                            <Github/>
                        {:else if work.icon === "Youtube"}
                            <Youtube/>
                        {/if}
                        <div class="mx-3">
                            <MoveRight/>
                        </div>
                        <h3 class="text-2xl"><a class="cursor-pointer hover:underline" href="{work.link}" target="_blank">{work.text} | {work.type} | {work.time}</a></h3>
                    </div>
                {/each}
            </div>

            <div class="w-1/2 flex flex-col py-5 px-2 items-center justify-start border-l-2 border-mocha-border" style="height: {innerHeight}px;">
                <h1 class="text-4xl mb-5">Ongoing:</h1>
                {#each working_on as work}
                    <div class="flex flex-row items-center mb-2">
                        {#if work.icon === "Twitter"}
                            <X/>
                        {:else if work.icon === "Github"}
                            <Github/>
                        {/if}
                        <div class="mx-3">
                            <MoveRight/>
                        </div>
                        <h3 class="text-2xl"><a class="cursor-pointer hover:underline" href="{work.link}" target="_blank">{work.text} | {work.type} | {work.time}</a></h3>
                    </div>
                {/each}
            </div>
    </div>
</div>
