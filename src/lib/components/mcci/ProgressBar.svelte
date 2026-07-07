<script lang="ts">
    const { total, progress, background_color, foreground_color, bar_height } =
        $props<{
            total: number;
            progress: number;
            background_color: string;
            foreground_color: string;
            bar_height: number;
        }>();

    let percentCompleted = Math.min(
        Math.round((progress / total) * 100 * 100) / 100,
        100,
    );
</script>

<div
    class="w-full rounded-2xl border-neutral-500 border-2"
    style="background-color:{background_color}; height: {4 * bar_height}px"
>
    <div
        class="h-full rounded-xl w-{progress}/{total}"
        style="width: {Math.round(
            percentCompleted,
        )}%; background-color:{foreground_color}"
    ></div>
</div>
