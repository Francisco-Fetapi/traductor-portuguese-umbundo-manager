import { NextApiRequest, NextApiResponse } from "next";
import words from "../../database/words.json";

export default function ListWords(req: NextApiRequest, res: NextApiResponse) {
  // Antes de dar um git push, copiar os dados dessa resposta.
  return res.json({ words });
}
