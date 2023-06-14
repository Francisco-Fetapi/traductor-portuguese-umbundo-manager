import { NextApiRequest, NextApiResponse } from "next";
import { getConversations } from "../../api-firebase";

export default async function ListWords(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const conversations = await getConversations();
  return res.json(conversations);
}
