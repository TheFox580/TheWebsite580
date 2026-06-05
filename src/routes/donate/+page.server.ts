import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  redirect(
    303,
    "https://donate.tiltify.com/6310da27-c997-43d7-8671-c4ace2722009/incentives",
  );
};
