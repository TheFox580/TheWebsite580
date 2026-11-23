<script lang="ts">
    import type { IMessage } from "$lib/interfaces/archipelago/Message";

    const { user, message } = $props<{
        user: string;
        message: IMessage;
    }>();

    const realMessage: IMessage = message;

    function isSelf(): boolean{
      return realMessage.item?.sender.name === realMessage.item?.receiver.name;
    }

    function getColor(): string{
      if (realMessage.item?.progression) return "oklch(0.817 0.091 277.309)";
      if (realMessage.item?.useful) return "oklch(0.766 0.111 259.885)";
      if (realMessage.item?.trap) return "oklch(0.756 0.130 2.764)";
      return "oklch(0.847 0.083 210.255)"; // Filler
    }

</script>

<div>
    <span class="text-mocha-text">
        {#if realMessage.type === "item"}
            <span class="{realMessage.item?.sender.name === user ? "text-mocha-mauve" : "text-mocha-rosewater"} mb-1">{realMessage.item?.sender.alias}</span>
            {#if isSelf()}
                <span>found their</span>
                <span style="color: {getColor()}">{realMessage.item?.name}</span>
            {:else}
                <span>sent</span>
                <span style="color: {getColor()}">{realMessage.item?.name}</span>
                <span>to</span>
                <span class="{realMessage.item?.receiver.name === user ? "text-mocha-mauve" : "text-mocha-rosewater"} mb-1">{realMessage.item?.receiver.alias}</span>
            {/if}
            <span>(<span class="text-mocha-green mb-1">{realMessage.item?.locationName}</span>)</span>
        {:else if realMessage.type === "hint"}
            <span>[Hint]: </span>
            <span><span class="{realMessage.item?.receiver.name === user ? "text-mocha-mauve" : "text-mocha-rosewater"} mb-1">{realMessage.item?.receiver.alias}</span>'s</span>
            <span style="color: {getColor()}">{realMessage.item?.name}</span>
            <span>is at</span>
            <span class="text-mocha-green mb-1">{realMessage.item?.locationName}</span>
            <span>in</span>
            <span><span class="{realMessage.item?.sender.name === user ? "text-mocha-mauve" : "text-mocha-rosewater"} mb-1">{realMessage.item?.sender.alias}</span>'s World.</span>
            <span class="{realMessage.found ? "text-mocha-green" : "text-mocha-red"}">{realMessage.found ? "(found)" : "(not found)"}</span>
        {:else if realMessage.type === "cheat"}
            <span>⚠ The server / an admin has gifted</span>
            <span style="color: {getColor()}">{realMessage.item?.name}</span>
            <span>to</span>
            <span class="{realMessage.item?.receiver.name === user ? "text-mocha-mauve" : "text-mocha-rosewater"} mb-1">{realMessage.item?.receiver.alias}</span>
            <span>⚠</span>
        {:else if realMessage.type === "death"}
        <span>[DeathLink]: </span>
        <span><span class="{realMessage.source === user ? "text-mocha-mauve" : "text-mocha-rosewater"} mb-1">{realMessage.source}</span> died.</span>
        <span>{realMessage.cause}</span>
        {:else}
            {realMessage.text}
        {/if}
    </span>
</div>
