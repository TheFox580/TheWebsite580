export interface PlayerSlotInfo {
  id: number;
  name: string;
  game: string;
  completion: {
    done: number;
    todo: number;
  };
}
