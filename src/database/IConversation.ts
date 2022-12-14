import conversations from "../database/conversations.json";

export type IConversation = typeof conversations[0] & {
  id?: string;
  author?: string;
  date?: string;
};
