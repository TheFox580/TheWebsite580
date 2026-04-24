export interface Statistic {
    ranked: number;
    casual: number | null;
}

export interface TimedStatistic {
    bestTime: Statistic;
    completionTime: Statistic;
    completions: Statistic;
    currentWinStreak: Statistic;
    forfeits: Statistic;
    highestWinStreak: Statistic;
    loses: Statistics;
    playedMatches: Statistic;
    playtime: Statistic;
    wins: Statistic;
}

export interface Statistics {
    season: TimedStatistic;
    total: TimedStatistic;
}
