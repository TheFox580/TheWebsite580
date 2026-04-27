import { SvelteKitAuth } from "@auth/sveltekit";
import type { DefaultSession } from "@auth/sveltekit";
import type { Provider } from "@auth/sveltekit/providers";
import Twitch from "@auth/sveltekit/providers/twitch";

declare module "@auth/sveltekit" {
  interface Session {
    user: {
      id: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

const providers: Provider[] = [Twitch];

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/api/twitch/signin",
    signOut: "/api/twitch/signout",
  },
  trustHost: true,
});
