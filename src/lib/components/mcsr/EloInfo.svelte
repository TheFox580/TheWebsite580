<script lang="ts">
    import type { MCSRData } from "$lib/interfaces/mcsr/MCSRData";
    import { format } from "vitest/internal/browser";
    import Rank from "./Rank.svelte";

    const { data } = $props<{
        data: MCSRData;
    }>();

    function getRankByElo(elo: number): string {
        if (elo === null) {
            return "Unrated";
        } else if (elo < 400) {
            return "Coal 1";
        } else if (elo < 500) {
            return "Coal 2";
        } else if (elo < 600) {
            return "Coal 3";
        } else if (elo < 700) {
            return "Iron 1";
        } else if (elo < 800) {
            return "Iron 2";
        } else if (elo < 900) {
            return "Iron 3";
        } else if (elo < 1000) {
            return "Gold 1";
        } else if (elo < 1100) {
            return "Gold 2";
        } else if (elo < 1200) {
            return "Gold 3";
        } else if (elo < 1300) {
            return "Emerald 1";
        } else if (elo < 1400) {
            return "Emerald 2";
        } else if (elo < 1500) {
            return "Emerald 3";
        } else if (elo < 1650) {
            return "Diamond 1";
        } else if (elo < 1800) {
            return "Diamond 2";
        } else if (elo < 2000) {
            return "Diamond 3";
        } else {
            return "Netherite";
        }
    }

    function getNextRank(currentRank: string): string {
        if (currentRank === "Unrated") {
            return "TBD";
        } else if (currentRank === "Coal 1") {
            return "Coal 2";
        } else if (currentRank === "Coal 2") {
            return "Coal 3";
        } else if (currentRank === "Coal 3") {
            return "Iron 1";
        } else if (currentRank === "Iron 1") {
            return "Iron 2";
        } else if (currentRank === "Iron 2") {
            return "Iron 3";
        } else if (currentRank === "Iron 3") {
            return "Gold 1";
        } else if (currentRank === "Gold 1") {
            return "Gold 2";
        } else if (currentRank === "Gold 2") {
            return "Gold 3";
        } else if (currentRank === "Gold 3") {
            return "Emerald 1";
        } else if (currentRank === "Emerald 1") {
            return "Emerald 2";
        } else if (currentRank === "Emerald 2") {
            return "Emerald 3";
        } else if (currentRank === "Emerald 3") {
            return "Diamond 1";
        } else if (currentRank === "Diamond 1") {
            return "Diamond 2";
        } else if (currentRank === "Diamond 2") {
            return "Diamond 3";
        } else if (currentRank === "Diamond 3") {
            return "Netherite";
        } else {
            return "None";
        }
    }

    function z(n: number): string {
        return (n < 10 ? "0" : "") + n;
    }

    function formatTime(time: number): string {
        let mins = ((time % 3.6e6) / 6e4) | 0;
        let secs = Math.floor((time % 6e4) / 1e3);

        return `${mins}:${z(secs)}`;
    }

    let usableData: MCSRData = <MCSRData>data;
</script>

<div class="flex flex-col justify-evenly items-start m-2.5">
    <h2 class="text-center self-center mb-4 text-2xl font-bold">
        Elo / Rank Infos
    </h2>
    <span
        class={(usableData.eloRate ? usableData.eloRate : 0) >=
        usableData.seasonResult.highest
            ? "text-amber-400 font-bold"
            : ""}
        >Current Elo: {usableData.eloRate ? usableData.eloRate : "???"}</span
    >
    <span
        class={(usableData.eloRate ? usableData.eloRate : 0) >=
        usableData.seasonResult.highest
            ? "text-amber-400 font-bold"
            : ""}>Peak Elo: {usableData.seasonResult.highest}</span
    >
    <span class="mt-2.5">Current Placement: #{usableData.eloRank}</span>
    <div class="flex flex-col justify-center items-start mt-2.5">
        <Rank
            text="Current Rank"
            rank={getRankByElo(usableData.eloRate ? usableData.eloRate : 0)}
        ></Rank>
        <Rank
            text="Next Rank"
            rank={getNextRank(
                getRankByElo(usableData.eloRate ? usableData.eloRate : 0),
            )}
        ></Rank>
    </div>
    <div class="flex flex-col mt-2.5">
        <span
            class={usableData.statistics.season.bestTime.ranked >=
            usableData.statistics.total.bestTime.ranked
                ? "text-amber-400 font-bold"
                : ""}
            >Current Season PB: {usableData.statistics.season.bestTime.ranked
                ? formatTime(usableData.statistics.season.bestTime.ranked)
                : "No PB this season"}</span
        >
        <span
            class={usableData.statistics.season.bestTime.ranked >=
            usableData.statistics.total.bestTime.ranked
                ? "text-amber-400 font-bold"
                : ""}
            >All-Time PB: {usableData.statistics.total.bestTime.ranked
                ? formatTime(usableData.statistics.total.bestTime.ranked)
                : "No PB this season"}</span
        >
    </div>
</div>
