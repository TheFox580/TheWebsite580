import type { Item } from "archipelago.js";

export interface IMessage{
  type: string
  text: string | null;
  item: Item | null;
  found: boolean | null;
  source: string | null;
  time: number | null;
  cause: string | null;
}
