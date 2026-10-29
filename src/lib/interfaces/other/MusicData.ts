export interface MusicData {
    title: string;
    alternativeTitle: string;
    artist: string;
    artistUrl: string;
    views: number;
    uploadDate: string;
    imageSrc: string;
    isPaused: boolean;
    songDuration: number;
    elapsedSeconds: number;
    url: string;
    album: string;
    videoId: string;
    playlistId: string;
    mediaType: "AUDIO" | "VIDEO" | "PODCAST";
    tags: string[];
    repeat: "NONE" | "ONE" | "ALL";
    shuffle: boolean;
}
