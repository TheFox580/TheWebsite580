import type { Achivements } from "./Achivements";
import type { Connections } from "./Connections";
import type { SeasonResult } from "./SeasonResult";
import type { Statistics } from "./Statistics";
import type { Timestamp } from "./Timestamp";

export interface MCSRData {
    achievements: Achivements;
    connections: Connections;
    country: string | null;
    eloRate: number | null;
    eloRank: number | null;
    nickname: string;
    roleType: number;
    seasonResult: SeasonResult;
    statistics: Statistics;
    timestamp: Timestamp;
    uuid: string;
    weeklyRaces: Object[];
}
