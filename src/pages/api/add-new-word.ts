// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";
import { IWord } from "../../database/IWord";
import * as words from "../../helpers/Word";
import fs from "fs";

export type IResponseProps = {
  status: string;
  message?: string;
  name?: string;
  data?: any;
  wordSent?: IWord;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    req.body.examples = req.body.formatedExamples;
    delete req.body.formatedExamples;
    const wordSent = req.body as IWord;
    wordSent.date = new Date().toString();

    if (words.alreadyExists(wordSent.pt)) {
      return res.json({
        status: "error",
        message: "A palvra que está tentando cadastrar já existe",
      });
    }

    const cookies = nookies.get({ req });
    wordSent.author = cookies.name;
    const allWords = words.all();
    allWords.unshift(wordSent);

    const dataToSave = JSON.stringify(allWords, null, 2);

    fs.writeFile("src/database/words.json", dataToSave, (err) => {
      if (err) throw err;
      console.log("Erro ao tentar salvar dados no arquivo words.json.");
    });

    res
      .status(200)
      .json({ status: "success", message: "", name: cookies.name, wordSent });
  } catch (e: any) {
    res.status(200).json({ status: "error", message: e.message });
  }
}
