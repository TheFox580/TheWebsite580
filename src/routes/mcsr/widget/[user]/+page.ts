import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent, params, fetch }) => {
  const user = params.user;

  const { queryClient } = await parent();

  // You need to use the SvelteKit fetch function here
  await queryClient.prefetchQuery({
    queryKey: ["apiData"],
    queryFn: async () => {
      return (await fetch(`https://api.mcsrranked.com/users/${user}`)).json();
    },
  });

  return { user };
};
