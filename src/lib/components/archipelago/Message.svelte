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

</script>

<div>
    <span class=" text-white">
        {#if isItem}
            <span class="{realMessage.item?.sender.name === user ? "text-fuchsia-600" : "text-amber-100"} mb-1">{realMessage.item?.sender.alias}</span>
            {#if isSelf()}
                <span>found their</span>
                <span class="text-cyan-400">{realMessage.item?.name}</span>
            {:else}
                <span>sent</span>
                <span class="text-cyan-400">{realMessage.item?.name}</span>
                <span>to</span>
                <span class="{realMessage.item?.receiver.name === user ? "text-fuchsia-600" : "text-amber-100"} mb-1">{realMessage.item?.receiver.alias}</span>
            {/if}
            <span>(<span class="text-green-400 mb-1">{realMessage.item?.locationName}</span>)</span>
        {:else}
            {realMessage.text}
        {/if}
    </span>
</div>
