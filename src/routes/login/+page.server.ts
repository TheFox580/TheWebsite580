import type { PageServerLoad } from "./$types";
import { providerMap } from "../../auth";

export const load: PageServerLoad = async ({ params, locals }) => {
  const session = await locals.auth();

  let user_name = session?.user?.name

  return {
    user_name,
    providerMap,
  };
};
