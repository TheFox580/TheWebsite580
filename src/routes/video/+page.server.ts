import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getLastVideoLink } from "$lib/functions/youtube/video/getLastVideoLink";

export const load: PageServerLoad = async () => {
  const channelID: string = "UCSpecp6UTARpUNTlI_v70sA";

  const videoLink = await getLastVideoLink(channelID);
  redirect(303, videoLink);
};
