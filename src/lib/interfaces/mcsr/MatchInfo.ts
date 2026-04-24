import type { MatchSeed } from "./MatchSeed";
import type { MatchType } from "./MatchType";
import type { UserProfile } from "./UserProfile";

export interface MatchInfo {
    id:string;
    type: MatchType;
    season: number;
    category: string | null;
    date: number;
    players: UserProfile[];
    spectators: UserProfile[];
    seed: MatchSeed | null;
    result : {
        uuid: string | null;
        time: number;
    };
    forfeited: boolean;
    decayed: boolean;
    rank: {
        season: number | null;
        allTime: number | null;
    };
    changes: {
        uuid: string;
        change: number | null;
        eloRate: number | null;
    }[];
    tag: string | null;
    beginner: boolean;
    vod: {
        uuid: string;
        url: string;
        startsAt: number;
    }[];
    completions: {
        uuid: string;
        time: number;
    }[];
    timelines: {
        uuid: string;
        time: number;
        type: string;
    }[];
    replayExist: boolean;
}