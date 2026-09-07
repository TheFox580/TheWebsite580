<script lang="ts">
    import { Line } from "svelte-chartjs"
    import {Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, scales} from "chart.js/auto"
    import type { PageData } from "./$types";
    import { dev } from "$app/environment";
    import type { MinedData } from "$lib/interfaces/chunk/MinedData";
    import { onMount } from "svelte";
    import { getMonth } from "$lib/functions/utils/dateStuff";
    import { formatNumber } from "$lib/functions/utils/numberFormatting";

    const { data } = $props<{
        data: PageData;
    }>();

    ChartJS.register(
        Title,
        Tooltip,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale
    );

    let mined_data: MinedData[] = $state(data.mined_data);
    let graph_data = $state();
    let last_data: number = $state(mined_data.findLast(mined => mined.max > 0));
    let max_blocks: number = $state(last_data ? last_data.max : 0);

    const backend_url = dev ? "http://127.0.0.1:8787" : "https://thefox580-backend.zoelliotmitong.workers.dev"

    async function fetchMinedData(){
        const fetchMined = await fetch(backend_url + "/api/chunk");
        if (fetchMined.ok){
            var mined = await fetchMined.json()
            mined_data = mined.data;

            formatData();
        }
    }

    function formatData(){
        mined_data.map(mined => mined.time = new Date(mined.time));

        last_data = mined_data.findLast(mined => mined.max > 0);
        max_blocks = last_data ? last_data.max : 0;

        graph_data = {
            labels: mined_data.map(mined => `${getMonth(mined.time.getMonth())} ${mined.time.getDate()} at ${mined.time.getHours()}:${mined.time.getMinutes()}`),
            datasets: [
                {
                    label: "Blocks Mined",
                    fill: true,
                    backgroundColor: 'rgba(0,255,0,0.2)',
                    borderColor: 'rgba(0,255,0,1)',
                    data: mined_data.map(mined => mined.blocks_mined)
                }
            ]
        }
    }

    onMount(async () => {
        setInterval(async () => {
            const time = new Date();
            if (time.getMinutes() % 5 == 0 && time.getSeconds() == 0) await fetchMinedData();
        },
            5*60*1000) // Every 5 minutes
    })

    formatData();

</script>

<div class="w-full h-screen flex flex-col items-center justify-center bg-black">
    <div class="h-1/5 flex flex-col items-center justify-center text-white text-5xl">
        <h1 class="mb-5">Fox's chunk mining progress</h1>
        <h2 class="text-3xl">{formatNumber(last_data ? last_data.blocks_mined : 0)} / {formatNumber(max_blocks)} blocks mined</h2>
    </div>
    <div class="h-4/5 w-300 h-160 flex flex-col items-center justify-center">
        {#if last_data}
        <div class= "w-full h-10 flex flex-row items-center justify-center text-white text-3xl">
            <h2>Blocks mined over time</h2>
            <button
                class="rounded-xl mx-3 py-2 px-1 bg-blue-600 cursor-pointer text-xl"
                onclick={async () => {
                    await fetchMinedData();
                }}
            >Reload graph</button>
        </div>
        <Line
            data={graph_data}
            options={
                {
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    responsive: true,
                    scales: {
                        y: {
                            min: 0,
                            max: max_blocks,
                            ticks: {
                                color: "white"
                            },
                            grid: {
                                color: "white"
                            }
                        },
                        x: {
                            ticks: {
                                color: "white"
                            },
                            grid: {
                                color: "white"
                            }
                        },
                    }
                }
            }
        />
        {:else}
            <div class="w-full h-full flex flex-col items-center justify-center text-white text-5xl">
                <p>Fox hasn't started mining the chunk yet</p>
            </div>
        {/if}
    </div>
</div>
