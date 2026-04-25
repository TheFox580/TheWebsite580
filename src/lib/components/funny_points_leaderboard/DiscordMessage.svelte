<script lang="ts">
    const { hasImage, src, alt, customClass, messageList } = $props<{
        hasImage: boolean;
        src?: string;
        alt?: string;
        customClass?: string;
        messageList: string[];
    }>();
</script>

<div id="discord-message">
    {#if hasImage}
        <span>
            <img
                src={src ? src : ""}
                alt={alt ? alt : ""}
                class="w-9/10 {customClass ? customClass : ''}"
            />
        </span>
    {/if}
    {#each messageList as message}
        <span>{message}</span>
    {/each}
</div>

<style>
    #discord-message {
        border-radius: 10px;
        margin-top: 10px;
        padding-bottom: 5px;
        padding-top: 5px;
        display: flex;
        flex-direction: column;
        width: 70%;
        background-color: #555555;
        font-size: 125%;
    }

    #discord-message > span {
        padding-left: 5px;
    }

    #discord-message > span > img {
        border-radius: 20px;
    }
</style>
