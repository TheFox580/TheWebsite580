import type { MatchInfo } from "$lib/interfaces/mcsr/MatchInfo";

export async function getLastMatchs(
  ranked: boolean,
  count: number,
): Promise<MatchInfo[]> {
  const response = await fetch(
    `https://api.mcsrranked.com/users/TheFox580/matches?${ranked ? "type=2&" : ""}count=${count}`,
  );

  if (response.ok) {
    let json = await response.json();
    json = json.data;
    return json;
  }

  return await response.json();
}
