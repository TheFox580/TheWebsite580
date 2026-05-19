import type { PageLoad } from "./$types.js";

export const load: PageLoad = ({ params }) => {
  const minutes = params.minutes;

  return { minutes };
};
