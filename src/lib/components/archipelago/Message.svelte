<script lang="ts">
    const { message } = $props<{
        message: string;
    }>();
</script>

<div>
    <span class=" text-white {message.startsWith('    ') ? 'pl-5' : ''}">
        {message}
    </span>
</div>
