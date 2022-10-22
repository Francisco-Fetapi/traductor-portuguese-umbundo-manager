// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nookies from "nookies";

export type IResponseProps = {
  status: string;
  message: string;
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseProps>
) {
  console.log(req.body);

  const cookies = nookies.get({ req });
  //   validar
  // organizar dados (exemplos)
  // cadastrar
  await new Promise((res, rej) => {
    setTimeout(() => {
      res(null);
    }, 1 * 1000);
  });
  res.status(200).json({ status: "", message: "", name: cookies.name });
}
