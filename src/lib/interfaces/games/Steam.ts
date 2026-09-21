import type { ObjectId } from "mongodb";

export interface SteamGame {
    appid: string;
    name: string;
    playtime_2weeks: number;
    playtime_forever: number;
    playtime_windows_forever: number;
    playtime_mac_forever: number;
    playtime_linux_forever: number;
    playtime_deck_forever: number;
    playtime_disconnected: number;
    img_icon_url: string;
    img_logo_url: string;
    rtime_last_played: number;
    content_descriptorids?: string[];
}

export interface SteamDB {
    _id?: ObjectId;
    time: Date;
    info: SteamGame[];
}

export interface SteamDBPurified {
    time: Date;
    info: SteamGame[];
}
