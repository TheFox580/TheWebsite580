<script lang="ts">
    import Statistic from "./Statistic.svelte";

    const { data } = $props<{
        data: Object;
    }>();
</script>


<div class="flex flex-row items-center justify-center w-9/10 m-5">
    <div
        class="flex flex-col justify-evenly p-10 rounded-xl bg-neutral-400 w-auto"
    >
        <div class="flex flex-col justify-evenly items-center">
            <h1 class="font-bold text-5xl mb-10">Statistics</h1>
            <div class="flex flex-col justify-start items-start">
                <div class="grid grid-cols-4 gap-2.5 auto-rows-auto">
                    <Statistic
                        data={data.playtime}
                        stat="Playtime"
                        img="lobby"
                        type="time">
                    </Statistic>
                    <Statistic
                        data={data.games_played}
                        stat="Games Played"
                        img="lobby"
                        type="games">
                    </Statistic>
                    <Statistic
                        data={data.rocket_spleef_playtime}
                        stat="Playtime"
                        img="rocket_spleef"
                        type="time">
                    </Statistic>
                    <Statistic
                        data={data.rocket_spleef_games_played}
                        stat="Games Played"
                        img="rocket_spleef"
                        type="games">
                    </Statistic>
                    <Statistic
                        data={data.sky_battle_playtime}
                        stat="Playtime"
                        img="sky_battle"
                        type="time">
                    </Statistic>
                    <Statistic
                        data={data.sky_battle_games_played}
                        stat="Games Played"
                        img="sky_battle"
                        type="games">
                    </Statistic>
                    <Statistic
                        data={0}
                        stat="Playtime"
                        img="nicetryloser"
                        type="time">
                    </Statistic>
                    <Statistic
                        data={0}
                        stat="Games Played"
                        img="nicetryloser"
                        type="games">
                    </Statistic>
                    <Statistic
                        data={data.battle_box_playtime}
                        stat="Playtime"
                        img="battle_box"
                        type="time">
                    </Statistic>
                    <Statistic
                        data={data.battle_box_games_played}
                        stat="Games Played"
                        img="battle_box"
                        type="games">
                    </Statistic>
                    <Statistic
                        data={data.battle_box_arena_playtime}
                        stat="Playtime"
                        img="battle_box_arena"
                        type="time">
                    </Statistic>
                    <Statistic
                        data={data.battle_box_arena_games_played}
                        stat="Games Played"
                        img="battle_box_arena"
                        type="games">
                    </Statistic>
                    <Statistic
                        data={data.tgttos_playtime}
                        stat="Playtime"
                        img="tgttos"
                        type="time">
                    </Statistic>
                    <Statistic
                        data={data.tgttos_games_played}
                        stat="Games Played"
                        img="tgttos"
                        type="games">
                    </Statistic>
                    <Statistic
                        data={data.dynaball_playtime}
                        stat="Playtime"
                        img="dynaball"
                        type="time">
                    </Statistic>
                    <Statistic
                        data={data.dynaball_games_played}
                        stat="Games Played"
                        img="dynaball"
                        type="games">
                    </Statistic>
                    <Statistic
                        data={0}
                        stat="Playtime"
                        img="nicetryloser"
                        type="time">
                    </Statistic>
                    <Statistic
                        data={0}
                        stat="Games Played"
                        img="nicetryloser"
                        type="games">
                    </Statistic>
                    <Statistic
                        data={0}
                        stat="Playtime"
                        img="nicetryloser"
                        type="time">
                    </Statistic>
                    <Statistic
                        data={0}
                        stat="Games Played"
                        img="nicetryloser"
                        type="games">
                    </Statistic>
                </div>
            </div>
        </div>
    </div>
</div>
