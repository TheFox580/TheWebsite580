import type { PlayerSlotInfo } from "$lib/interfaces/archipelago/PlayerSlotInfo";
import { dev } from "$app/environment";

export async function getRoomTrackerInfo(
  id: string,
): Promise<PlayerSlotInfo[]> {

  const res = await fetch(
    dev ? `http://127.0.0.1:8787/api/archipelago/tracker/${id}` : `https://thefox580-backend.zoelliotmitong.workers.dev/api/archipelago/tracker/${id}`,
  );

  const players = (await res.json()).players;
  return players;
}
