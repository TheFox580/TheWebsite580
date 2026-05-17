<script lang="ts">
    const { current, max } = $props<{
        current: number;
        max: number;
    }>();
</script>

<div class="w-full bg-black rounded-2xl border-2 border-gray-500 mb-5">
    <div class="w-{current}/{max} bg-green-500 rounded-xl">
        <p class="text-center text-black">
            Progression: {current} / {max}
        </p>
    </div>
</div>
