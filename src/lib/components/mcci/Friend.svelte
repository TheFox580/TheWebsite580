<script lang="ts">
    import CustomImage from "./CustomImage.svelte";

    const { data } = $props<{
        data: Object;
    }>();

    let isOnline: string = "Unknown";

    if (data.status) {
        isOnline = data.status.online ? "Online" : "Offline";
    }

    let onlineColor: string = "text-neutral-500";

    if (data.status) {
        onlineColor = data.status.online ? "text-green-600" : "text-red-600";
    }
</script>

<div class="flex rounded-[10px] border-4 p-2.5 border-neutral-500">
    <CustomImage
        src="https://minotar.net/helm/{data.uuid.replaceAll('-', '')}/75"
        alt={data.username}
        customClass="w-[4em] rounded-[5px]"
    ></CustomImage>
    <div class="flex flex-col ml-2.5 justify-center">
        <a href="/mcci/{data.username}" class="font-bold hover:underline"
            >{data.username}</a
        >
        <span class="font-bold {onlineColor}">{isOnline}</span>
    </div>
</div>

<style>
    a {
        color: white;
    }
</style>
