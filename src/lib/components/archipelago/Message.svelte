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
        case 1: return "purple-400"
        case 2: return "blue-400"
        case 3: return "red-400"
        default: return "cyan-400"
      }
    }

</script>

<div>
    <span class=" text-white">
        {#if isItem}
            <span class="{realMessage.item?.sender.name === user ? "text-fuchsia-600" : "text-amber-100"} mb-1">{realMessage.item?.sender.alias}</span>
            {#if isSelf()}
                <span>found their</span>
                <span class="text-{getColor()}">{realMessage.item?.name}</span>
            {:else}
                <span>sent</span>
                <span class="text-{getColor()}">{realMessage.item?.name}</span>
                <span>to</span>
                <span class="{realMessage.item?.receiver.name === user ? "text-fuchsia-600" : "text-amber-100"} mb-1">{realMessage.item?.receiver.alias}</span>
            {/if}
            <span>(<span class="text-green-400 mb-1">{realMessage.item?.locationName}</span>)</span>
        {:else}
            {realMessage.text}
        {/if}
    </span>
</div>
