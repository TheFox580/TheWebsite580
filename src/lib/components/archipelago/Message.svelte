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
      if (realMessage.item?.progression) return "oklch(71.4% 0.203 305.504)"
      if (realMessage.item?.useful) return "oklch(62.3% 0.214 259.815)"
      if (realMessage.item?.trap) return "oklch(70.4% 0.191 22.216)"
      return "oklch(78.9% 0.154 211.53)" // Filler
    }

</script>

<div>
    <span class=" text-white">
        {#if realMessage.type === "item"}
            <span class="{realMessage.item?.sender.name === user ? "text-fuchsia-600" : "text-amber-100"} mb-1">{realMessage.item?.sender.alias}</span>
            {#if isSelf()}
                <span>found their</span>
                <span style="color: {getColor()}">{realMessage.item?.name}</span>
            {:else}
                <span>sent</span>
                <span style="color: {getColor()}">{realMessage.item?.name}</span>
                <span>to</span>
                <span class="{realMessage.item?.receiver.name === user ? "text-fuchsia-600" : "text-amber-100"} mb-1">{realMessage.item?.receiver.alias}</span>
            {/if}
            <span>(<span class="text-green-400 mb-1">{realMessage.item?.locationName}</span>)</span>
        {:else if realMessage.type === "hint"}
            <span>[Hint]: </span>
            <span><span class="{realMessage.item?.receiver.name === user ? "text-fuchsia-600" : "text-amber-100"} mb-1">{realMessage.item?.receiver.alias}</span>'s</span>
            <span style="color: {getColor()}">{realMessage.item?.name}</span>
            <span>is at</span>
            <span class="text-green-400 mb-1">{realMessage.item?.locationName}</span>
            <span>in</span>
            <span><span class="{realMessage.item?.sender.name === user ? "text-fuchsia-600" : "text-amber-100"} mb-1">{realMessage.item?.sender.alias}</span>'s World.</span>
        {:else if realMessage.type === "cheat"}
            <span>⚠ The server / an admin has gifted</span>
            <span style="color: {getColor()}">{realMessage.item?.name}</span>
            <span>to</span>
            <span class="{realMessage.item?.receiver.name === user ? "text-fuchsia-600" : "text-amber-100"} mb-1">{realMessage.item?.receiver.alias}</span>
            <span>⚠</span>
        {:else}
            {realMessage.text}
        {/if}
    </span>
</div>
