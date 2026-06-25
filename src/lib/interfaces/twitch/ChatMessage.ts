export interface ChatMessage {
  chatter: string;
  badges: Record<string, string>;
  message: string;
  color: string | null;
}

export interface APIChatMessage {
  user_id: string;
  messages: ChatMessage[];
}
