import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { providerMap } from "../../auth";

export const load: PageServerLoad = async ({ params, locals }) => {
  const session = await locals.auth();

  if (session?.user?.id) {
    redirect(303, "blueprint_trading_cards/inventory");
  }

  return {
    session,
    providerMap,
  };
};
