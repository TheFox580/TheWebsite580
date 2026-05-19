import type { PageLoad } from "./$types.js";

export const load: PageLoad = ({ params }) => {
  const id = params.id;

  return { id };
};
