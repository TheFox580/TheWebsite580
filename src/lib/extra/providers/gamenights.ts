import type { OIDCConfig, OIDCUserConfig } from "@auth/sveltekit/providers";
import {
  AUTH_DISCORD_ID,
  AUTH_DISCORD_SECRET,
} from "$env/static/private";

export interface GamenightsProfile extends Record<string, any> {
  id: string;
  username: string;
  discriminator: string;
  global_name: string | null;
  avatar: string | null;
  bot?: boolean;
  system?: boolean;
    mfa_enabled: boolean;
    banner: string | null;
    accent_color: number | null;
    locale: string;
    verified: boolean;
    email: string | null;
    flags: number;
    premium_type: number;
    public_flags: number;
    display_name: string | null;
    avatar_decoration: string | null;
    banner_color: string | null;
    image_url: string;

}

export default function Gamenights(
  config: OIDCUserConfig<GamenightsProfile>,
): OIDCConfig<GamenightsProfile> {
  return {
    issuer: "https://discord.com",
    id: "gamenights",
    name: "Game Nights",
    type: "oauth",
    clientId: AUTH_DISCORD_ID,
    clientSecret: AUTH_DISCORD_SECRET,
    authorization: {
      url: "https://discord.com/api/oauth2/authorize",
      params: { scope: "identify email" },
    },
    token: "https://discord.com/api/oauth2/token",
    userinfo: "https://discord.com/api/users/@me",
    profile(profile) {
      if (profile.avatar === null) {
        const defaultAvatarNumber =
          profile.discriminator === "0"
            ? Number(BigInt(profile.id) >> BigInt(22)) % 6
            : parseInt(profile.discriminator) % 5
        profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`
      } else {
        const format = profile.avatar.startsWith("a_") ? "gif" : "png"
        profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`
      }
      return {
        id: profile.id,
        name: profile.global_name ?? profile.username,
        email: profile.email,
        image: profile.image_url,
      }
    },
    style: { bg: "#5865F2", text: "#fff" },
    options: config,
  };
}
