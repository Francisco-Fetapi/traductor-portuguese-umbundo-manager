import { NextApiRequest, NextApiResponse } from "next";
import * as words from "../../helpers/Word";

export default function ListWords(req: NextApiRequest, res: NextApiResponse) {
  // Antes de dar um git push, copiar os dados dessa resposta.
  return res.json({ words: words.all() });
}
