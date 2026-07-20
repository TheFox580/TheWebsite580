<script lang="ts">
    import { onMount } from "svelte";

    const { username } = $props<{
      username: string;
    }>();

    let player: Twitch.Player;

    onMount(async () => {
        player = new Twitch.Embed("twitch-embed", {
            parent: [],
            autoplay: true,
            muted: true,
            width: 1236,
            height: 504,
            channel: username,
            // Only needed if this page is going to be embedded on other websites
            //parent: ["embed.example.com", "othersite.example.com"]
          });
    })
</script>

<div class="w-full h-full flex flex-col items-center justify-center" id="twitch-embed"></div>
