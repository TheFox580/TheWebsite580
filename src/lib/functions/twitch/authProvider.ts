import { RefreshingAuthProvider, type AccessToken } from "@twurple/auth";
import {
  AUTH_TWITCH_BOT_ID,
  AUTH_TWITCH_BOT_SECRET,
} from "$env/static/private";
import { MONGO_DB_URL } from "$env/static/private";
import { MongoClient, ServerApiVersion } from "mongodb";
import type {
  FormattedRefreshToken,
  RefreshToken,
} from "$lib/interfaces/twitch/refreshToken";

const clientId = AUTH_TWITCH_BOT_ID;
const clientSecret = AUTH_TWITCH_BOT_SECRET;

const client = new MongoClient(MONGO_DB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

client.connect();
const db = client.db("twitch_api");
const collection = db.collection<RefreshToken>("tokens");
const results = await collection.find<RefreshToken>({}).toArray();

let tokenDatas: FormattedRefreshToken[] = [];

for (let result of results) {
  tokenDatas.push({
    user_id: result.user_id,
    accessToken: {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      expiresIn: 0,
      obtainmentTimestamp: 0,
      scope: [],
    },
  });
}

export const authProvider = new RefreshingAuthProvider({
  clientId,
  clientSecret,
});

authProvider.onRefresh((userId, newTokenData) => {
  tokenDatas = tokenDatas.filter((token) => token.user_id != userId);
  tokenDatas.push({ user_id: userId, accessToken: newTokenData });
});

for (let tokenData of tokenDatas) {
  const accToken = tokenData.accessToken;
  await authProvider.addUserForToken(
    (({ scope, ...object }) => object)(accToken),
  );
}
