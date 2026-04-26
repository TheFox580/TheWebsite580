<script lang="ts">
    const { src, alt, customClass, style } = $props<{
        src: string;
        alt: string;
        customClass?: string;
        style?: string;
    }>();
</script>

<img
    {src}
    {alt}
    class={!customClass ? "" : customClass}
    style={!style ? "" : style}
    onerror={function (this: HTMLImageElement, err: any) {
        this.src = "https://islandcdn.themysterys.com/icons/misc/legacy.png";
        console.log(`Error: ${JSON.stringify(err)}`);
    }}
/>
