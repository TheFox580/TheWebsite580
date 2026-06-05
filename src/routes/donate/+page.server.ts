import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  redirect(303, "https://tiltify.com/@thefox580/streamers-against-cancer-4");
};
