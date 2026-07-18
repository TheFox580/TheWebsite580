import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  redirect(
    303,
    "mailto:buisness.thefox580@gmail.com",
  );
};
