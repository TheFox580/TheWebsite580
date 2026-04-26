<script lang="ts">
    const { total, progress, background_color, foreground_color } = $props<{
        total: number;
        progress: number;
        background_color: string;
        foreground_color: string;
    }>();

    let percentCompleted = Math.min(
        Math.round((progress / total) * 100 * 100) / 100,
        100,
    );
</script>

<div
    class="w-full h-3 rounded-lg border-neutral-500 border-2"
    style="background-color:{background_color}"
>
    <div
        class="h-full rounded-xl"
        style="width: {Math.round(
            percentCompleted,
        )}%; background-color:{foreground_color}"
    ></div>
</div>
