import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params, fetch}) => {
    const user = params.user;
    const response = await fetch(`https://api.mcsrranked.com/users/${user}`)

    const data = await response.json();

    return {data, user};
}
