<script lang="ts">
    const { current, max, inList } = $props<{
        current: number;
        max: number;
        inList: boolean;
    }>();

    let progression = $state(Math.round((current / max) * 100));

    function getColorOnPercentage(percentage: number): string {
        if (percentage < 50) {
            let comp = Math.round(((percentage * 2) / 100) * 255).toString(16);
            while (comp.length < 2) {
                comp = "0" + comp;
            }
            return "#ff" + comp + "00";
        } else {
            let comp = Math.round(
                (((50 - (percentage - 50)) * 2) / 100) * 255,
            ).toString(16);
            while (comp.length < 2) {
                comp = "0" + comp;
            }
            return "#" + comp + "ff00";
        }
    }

    function invertColor(hex: string): string {
        if (hex.indexOf("#") === 0) {
            hex = hex.slice(1);
        }
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            throw new Error("Invalid HEX color.");
        }
        // invert color components
        var r = parseInt(hex.slice(0, 2), 16),
            g = parseInt(hex.slice(2, 4), 16),
            b = parseInt(hex.slice(4, 6), 16);

        return r * 0.299 + g * 0.587 + b * 0.114 < 186 ? "#000000" : "#FFFFFF";
    }

    function padZero(str: string, len: number = 0) {
        len = len || 2;
        var zeros = new Array(len).join("0");
        return (zeros + str).slice(-len);
    }
</script>

<div
    class="w-full h-full bg-black rounded-2xl border-2 border-gray-500 {inList
        ? 'mb-5'
        : ''} relative"
>
    <div class="flex items-center justify-center absolute w-full h-full">
        <p
            class="text-center"
            style="color: {invertColor(getColorOnPercentage(progression))}"
        >
            Progression: {current} / {max} ({progression}%)
        </p>
    </div>
    <div
        class="w-{current}/{max} h-5 rounded-xl"
        style="width: {progression}%; background-color: {getColorOnPercentage(
            progression,
        )}"
    ></div>
</div>
