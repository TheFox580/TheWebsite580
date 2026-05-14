import type { AccessToken } from "@twurple/auth";

export interface RefreshToken {
  user_id: string;
  accessToken: string;
  refreshToken: string;
}

export interface FormattedRefreshToken {
  user_id: string;
  accessToken: AccessToken;
}
