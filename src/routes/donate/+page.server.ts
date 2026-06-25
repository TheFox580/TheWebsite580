import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  // CC: Pride 2026

  redirect(
    303,
    "https://donate.tiltify.com/554ca6b6-5254-405e-b3c6-e46129df0194/incentives",
  );
  /*
  // SAC 2026

  redirect(
    303,
    "https://donate.tiltify.com/6310da27-c997-43d7-8671-c4ace2722009/incentives",
  );
  */
};
