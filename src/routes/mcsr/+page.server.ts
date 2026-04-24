import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({fetch}) => {
    const response = await fetch("https://api.mcsrranked.com/users/TheFox580")

    const data = await response.json();

    return {data}.data.data;
}
