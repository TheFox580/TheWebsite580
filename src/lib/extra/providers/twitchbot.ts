import type { OIDCConfig, OIDCUserConfig } from "@auth/sveltekit/providers";
import {
  AUTH_TWITCH_BOT_ID,
  AUTH_TWITCH_BOT_SECRET,
} from "$env/static/private";

export interface TwitchBotProfile extends Record<string, any> {
  sub: string;
  preferred_username: string;
  email: string;
  picture: string;
}

export default function TwitchBot(
  config: OIDCUserConfig<TwitchBotProfile>,
): OIDCConfig<TwitchBotProfile> {
  return {
    issuer: "https://id.twitch.tv/oauth2",
    id: "twitch-bot",
    name: "Twitch Bot",
    type: "oidc",
    client: { token_endpoint_auth_method: "client_secret_post" },
    clientId: AUTH_TWITCH_BOT_ID,
    clientSecret: AUTH_TWITCH_BOT_SECRET,
    authorization: {
      params: {
        scope: "openid user:read:email channel:bot channel:read:redemptions",
      },
      claims: {
        id_token: {
          email: null,
          picture: null,
          preferred_username: null,
        },
      },
    },
    token: {
      async conform(response) {
        const body = await response.json();
        if (response.ok) {
          if (typeof body.scope === "string") {
            console.warn(
              "'scope' is a string. Redundant workaround, please open an issue.",
            );
          } else if (Array.isArray(body.scope)) {
            body.scope = body.scope.join(" ");
            return new Response(JSON.stringify(body), response);
          } else if ("scope" in body) {
            delete body.scope;
            return new Response(JSON.stringify(body), response);
          }
        } else {
          const { message: error_description, error } = body;
          if (typeof error !== "string") {
            return new Response(
              JSON.stringify({ error: "invalid_request", error_description }),
              response,
            );
          }
          console.warn(
            "Response has 'error'. Redundant workaround, please open an issue.",
          );
        }
      },
    },
    style: { bg: "#65459B", text: "#fff" },
    options: config,
  };
}
