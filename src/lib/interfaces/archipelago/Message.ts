import type { Item } from "archipelago.js";

export interface IMessage{
  type: string
  text: string | null;
  item: Item | null;
}
