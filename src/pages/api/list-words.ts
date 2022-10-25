import { NextApiRequest, NextApiResponse } from "next";
import { getWords } from "../../api-firebase";

export default async function ListWords(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const words = await getWords();
  return res.json(words);
}
