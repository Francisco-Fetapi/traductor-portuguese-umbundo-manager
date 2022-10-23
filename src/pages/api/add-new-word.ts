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
  res: NextApiResponse<IResponseProps>
) {
  const wordSent = req.body as IWord;

  if (words.alreadyExists(wordSent.pt)) {
    res.json({
      status: "error",
      message: "A palvra que está tentando cadastrar já existe",
    });
  }

  // const allWords = words.all();

  const dataToSave = JSON.stringify({
    pt: "Ola Mundo",
    um: "Ola Mundo em Umbundo",
    class: "Nothing",
    examples: [],
  });

  fs.appendFile("src/database/words.json", dataToSave, (err) => {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });

  const cookies = nookies.get({ req });

  res
    .status(200)
    .json({ status: "success", message: "", name: cookies.name, wordSent });
}

//   validar
// organizar dados (exemplos)
// cadastrar
