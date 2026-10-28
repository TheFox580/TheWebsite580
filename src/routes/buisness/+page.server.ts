import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  redirect(
    303,
    "mailto:contact@thefox580.me",
  );
};
