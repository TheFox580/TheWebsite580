<script lang="ts">
    const { current, max, inList } = $props<{
        current: number;
        max: number;
        inList: boolean;
    }>();

    let progression = $state(Math.round((current / max) * 100));

    setInterval(() => {
        progression = Math.round((current / max) * 100);
    }, 1);
</script>

<div
    class="w-full h-full bg-black rounded-2xl border-2 border-gray-500 {inList
        ? 'mb-5'
        : ''} relative"
>
    <div class="flex items-center justify-center absolute w-full h-full">
        <p class="text-center text-white">
            Progression: {current} / {max} ({progression}%)
        </p>
    </div>
    <div
        class="w-{current}/{max} h-5 bg-green-500 rounded-xl"
        style="width: {progression}%;"
    ></div>
</div>
