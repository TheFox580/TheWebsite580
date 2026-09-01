import type { PageServerLoad } from "./$types";
import { providerMap } from "../../../auth";

export const load: PageServerLoad = async ({ params, locals }) => {
    const session = await locals.auth();

    const logged_in = session?.provider === "twitch-schedule";

    const user_name = session?.user?.name;

    return {
        logged_in,
        user_name,
        providerMap,
    };
};
