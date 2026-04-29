import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, locals }) => {
  const session = await locals.auth();

  console.log(session);

  return {
    session,
  };
};
