<script lang="ts">
    let innerHeight = $state(0);

    const worked_on = [
        {text: "Custom Bingo", type: "Minecraft", time: "2023", link: "https://www.youtube.com/watch?v=8eRBiOoEqS4"},
        {text: "Crown Quest", type: "Minecraft", time: "2023 - 2025", link: "https://www.youtube.com/@CrownQuestMC"},
        {text: "Unity Studios (now UNPROD)", type: "Minecraft", time:"2023-2025", link: "https://www.twitter.com/UNPRODSTUDIO"},
        {text: "Collect Every Block - Duo", type: "Minecraft", time:"2025", link: "https://github.com/TheFox580/CollectEveryBlockDuo"},
        {text: "Talent Show", type: "Minecraft", time: "2026", link: "https://www.youtube.com/watch?v=9fHnvqibfG0"},
        {text: "MCC Island Statistics", type: "Minecraft", time: "2026", link: "https://github.com/TheFox580/TheWebsite580/tree/main/src/routes/mcci/[user]"},
        {text: "Archipelago Client", type: "Archipelago", time: "2026", link: "https://github.com/TheFox580/TheWebsite580/tree/main/src/routes/archipelago"},
        {text: "Playing on piano", type: "Minecraft", time: "2026", link: "https://www.youtube.com/watch?v=BXXjId1fRCE&t=12024"},
        {text: "Custom Schedule System", type: "Streaming / Twitch", time: "2026", link: "https://github.com/TheFox580/TheWebsite580/tree/main/src/routes/schedule"},
        {text: "Custom Game Nights System", type: "Gaming (in general)", time: "2026", link: "https://github.com/TheFox580/TheWebsite580/tree/main/src/routes/gamenights"}
    ]

    const working_on = [
        {text: "TheEvents580", type: "Minecraft", time: "Since 2023", link: "https://www.twitter.com/TheEvents580"},
        {text: "Fruit Wars", type: "Minecraft", time: "Since 2023", link: "https://www.twitter.com/FruitWarsEvent"},
        {text: "MC Mayhem", type: "Minecraft", time: "Since 2024", link: "https://www.twitter.com/ItsMCMayhem"},
        {text: "Forsaken Isle", type: "Minecraft", time: "Since 2024", link: "https://www.twitter.com/ForsakenIsleSMP"},
        {text: "BluePrint", type: "Minecraft", time: "Since 2025", link: "https://www.twitter.com/BluePrintUpdate"},
        {text: "Goofy Games", type: "Minecraft", time: "Since 2025", link: "https://www.twitter.com/GoofyGamesMC"},
        {text: "This Website", type: "Svelte", time: "Since 2025", link: "https://github.com/TheFox580/TheWebsite580"}
    ]
</script>

<svelte:window bind:innerHeight />

<svelte:head>
    <title>Projects | TheFox580's website!</title>

    <style>
        html {
            background-color: #000000;
        }
    </style>
</svelte:head>

<div class="text-white flex flex-row text-center">
    <div class="w-1/2 h-full flex flex-col py-5 items-center justify-start border-r-2 border-white" style="height: {innerHeight}px;">
        <h1 class="text-4xl mb-5">Worked on:</h1>
        {#each worked_on as work}
            <h3 class="text-2xl mb-2"><a class="cursor-pointer hover:underline" href="{work.link}" target="_blank">{work.text} | {work.type} | {work.time}</a></h3>
        {/each}
    </div>

    <div class="w-1/2 flex flex-col py-5 items-center justify-start border-l-2 border-white" style="height: {innerHeight}px;">
        <h1 class="text-4xl mb-5">Ongoing:</h1>
        {#each working_on as work}
            <h3 class="text-2xl mb-2"><a class="cursor-pointer hover:underline" href="{work.link}" target="_blank">{work.text} | {work.type} | {work.time}</a></h3>
        {/each}
    </div>
</div>
