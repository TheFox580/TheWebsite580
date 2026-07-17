<script lang="ts">
    import CustomImage from "./CustomImage.svelte";

    const { data } = $props<{
        data: Object;
    }>();

    let isOnline: string = "Unknown";

    if (data.status) {
        isOnline = data.status.online ? "Online" : "Offline";
    }

    let onlineColor: string = "oklch(55.6% 0 none)";

    if (data.status) {
        onlineColor = data.status.online ? "oklch(62.7% 0.194 149.214)" : "oklch(57.7% 0.245 27.325)";
    }
</script>

<div class="flex rounded-[10px] border-4 p-2.5"
    style="border-color: {onlineColor}">
    <CustomImage
        src="https://minotar.net/helm/{data.uuid.replaceAll('-', '')}/75"
        alt={data.username}
        customClass="w-[4em] rounded-[5px]"
    ></CustomImage>
    <div class="flex flex-col ml-2.5 justify-center">
        <a href="/mcci/{data.username}" class="font-bold hover:underline"
            >{data.username}</a
        >
        <span class="font-bold" style="color: {onlineColor}">{isOnline}</span>
    </div>
</div>

<style>
    a {
        color: white;
    }
</style>
