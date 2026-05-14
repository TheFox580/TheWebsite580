import { authProvider } from "./authProvider";
import { ApiClient } from "@twurple/api";
import { EventSubWsListener } from "@twurple/eventsub-ws";

const apiClient = new ApiClient({ authProvider });

export const listener = new EventSubWsListener({ apiClient });
listener.start();
