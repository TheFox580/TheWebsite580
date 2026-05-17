import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = ({ params }) => {
  const id = params.id;

  return { id };
};
