export async function getLastVideoLink(channelID: string): Promise<string> {
  const reqURL = "https://www.youtube.com/feeds/videos.xml?channel_id=";

  const req = await fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=" +
      (encodeURIComponent(reqURL) + channelID),
  );

  const res = await req.json();

  return res.items[0].enclosure.link.split("?")[0];
}
