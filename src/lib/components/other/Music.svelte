<script lang="ts">
    import { onMount } from "svelte";


    onMount(async () => {

        const token = (await (await fetch("https://91.68.27.158:26538/auth/website", {
    		method: "POST"
    	})).json()).accessToken;

        console.log(token);
    })
</script>
