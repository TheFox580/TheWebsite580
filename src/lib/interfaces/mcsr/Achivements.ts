export interface Achivement {
    id: string;
    date: number;
    data: string[];
    level: number;
    value: number | null;
    goal: number | null;
}

export interface Achivements {
    display: Achivement[];
    total: Achivement[];
}
