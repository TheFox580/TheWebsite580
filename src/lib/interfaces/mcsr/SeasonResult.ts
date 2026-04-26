export interface LastSeasonResult {
    eloRank: number;
    eloRate: number;
    phasePoint: number;
}

export interface SeasonResult {
    highest: number;
    last: LastSeasonResult;
    lowest: number;
    phases: Object[];
}
