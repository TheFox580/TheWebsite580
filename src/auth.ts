import { SvelteKitAuth } from "@auth/sveltekit";
import type { DefaultSession } from "@auth/sveltekit";
import type { Provider } from "@auth/sveltekit/providers";
import Twitch from "@auth/sveltekit/providers/twitch";
import TwitchBot from "$lib/extra/providers/twitchbot";
import {
  AUTH_TWITCH_ID,
  AUTH_TWITCH_SECRET,
  AUTH_SECRET,
} from "$env/static/private";

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

const providers: Provider[] = [Twitch, TwitchBot];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const { handle, signIn, signOut } = SvelteKitAuth({
  providers,
  secret: AUTH_SECRET,
  callbacks: {
    jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.access_token = account.access_token;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;
        token.providerAccountId = account.providerAccountId;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.access_token = token.access_token;
        session.expires_in = token.expires_in;
        session.refresh_token = token.refresh_token;
        session.providerAccountId = token.providerAccountId;
      }
      return session;
    },
  },
  trustHost: true,
});
