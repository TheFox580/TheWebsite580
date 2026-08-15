import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
  redirect(303, "/twitch/timer/up/0");
};
