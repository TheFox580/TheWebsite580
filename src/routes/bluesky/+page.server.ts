import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  redirect(303, "https://bsky.app/profile/thefox580.bsky.social");
};
