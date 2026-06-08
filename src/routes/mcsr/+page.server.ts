import { MCSR_RANKED_API } from "$env/static/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch("https://api.mcsrranked.com/users/TheFox580", {
    headers: {
      "Content-Type": "application/json",
      "Private-Key": MCSR_RANKED_API,
    },
  });

  const data = await response.json();

  return { data }.data.data;
};
