import type { PlayerSlotInfo } from "$lib/interfaces/archipelago/PlayerSlotInfo";

export async function getRoomTrackerInfo(
  id: string,
): Promise<PlayerSlotInfo[]> {
  const res = await fetch(
    `https://thefox580-backend.zoelliotmitong.workers.dev/api/archipelago/tracker/${id}`,
  );

  const players = (await res.json()).players;
  return players;
}
