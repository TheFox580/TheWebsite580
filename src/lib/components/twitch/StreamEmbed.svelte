<script lang="ts">
    import { onMount } from "svelte";

    const { username } = $props<{
      username: string;
    }>();

    let player: Twitch.Player;

    onMount(async () => {
        player = new Twitch.Embed("twitch-embed", {
            // Only needed if this page is going to be embedded on other websites
            //parent: ["embed.example.com", "othersite.example.com"]
            parent: [],
            autoplay: true,
            muted: true,
            width: 1236,
            height: 504,
            channel: username,
          });
    })
</script>

<div class="w-8/10 h-full flex flex-col items-center justify-center">
    <div id="twitch-embed"></div>
</div>
