<script lang="ts">
    import type { IMessage } from "$lib/interfaces/archipelago/Message";

    const { user, message } = $props<{
        user: string;
        message: IMessage;
    }>();

    const realMessage: IMessage = message;

    const isItem: boolean = realMessage.type === "item";

    function isSelf(): boolean{
      return realMessage.item?.sender.name === realMessage.item?.receiver.name;
    }

    function getColor(): string{
      switch (realMessage.item?.flags){
        case 1: return "oklch(71.4% 0.203 305.504)"
        case 2: return "oklch(70.7% 0.165 254.624)"
        case 3: return "oklch(70.4% 0.191 22.216)"
        default: return "oklch(78.9% 0.154 211.53)"
      }
    }

</script>

<div>
    <span class=" text-white">
        {#if isItem}
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
        {:else}
            {realMessage.text}
        {/if}
    </span>
</div>
