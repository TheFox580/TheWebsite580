<script lang="ts">
  import type { EightyEightByThirtyOne } from "$lib/interfaces/other/88x31"

  const EightyEightByThirtyOnes: EightyEightByThirtyOne[] = [
    {img: "TheWebsite580.png", url: ""},
    {img: "trans.gif", url: ""},
    {img: "ace.gif", url: ""},
    {img: "twitch.png", url: "https://twitch.tv/thefox580"},
    {img: "github.png", url: "https://github.com/TheFox580"},
    {img: "modrinth.webp", url: "https://modrinth.com/user/TheFox580"},
    {img: "bluesky.png", url: "https://bsky.app/profile/thefox580.bsky.social"},
    {img: "fantomitechno.webp", url: "https://simon.renoux.dev/"},
    {img: "eva.ac-badge.png", url: "https://eva.ac"},
    {img: "minecraft.gif", url: "https://minecraft.net"},
    {img: "Archipelago.png", url: "https://archipelago.gg"},
    {img: "catpuccin.webp", url: "https://catppuccin.com/"},
  ]

</script>

<div class="flex items-center justify-center">
  <div class="grid grid-cols-6 gap-2.5 auto-rows-auto my-10">
    {#each EightyEightByThirtyOnes as EightyEightByThirtyOne}
      <div class="eightyeightbythirtyone w-[90px] h-[33px]">
        <a href={EightyEightByThirtyOne.url} class="w-[88px] h-[31px]">
          <img src="/img/88x31/{EightyEightByThirtyOne.img}" alt="Imgae of {EightyEightByThirtyOne.img}">
        </a>
      </div>
    {/each}
  </div>

</div>

<style>
  .eightyeightbythirtyone:hover {
    border: solid white 2px;
  }
</style>
