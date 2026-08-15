import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, params, fetch }) => {
  const time = params.time;

  return { time };
};
