// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { verify } from 'jsonwebtoken';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import Prisma from "../../../lib/prisma"





export const authenticated = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  const atoken = req.headers.authorization?.split(' ')[1];

  verify(atoken!, process.env.ACCESS_TOKEN_SECRET as string, async function (err, decoded) {
    if (!err && decoded) {

      //! Any idea how to pass the decoded token to the handler ?

      return await fn(req, res);
    }

    res.status(401).json({ message: 'Auth Failed' });
  });
};

export default authenticated(async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {

    const transaction = req.body;
    const savedTransaction = await Prisma.transaction.create({ data: transaction });
    res.status(200).json(savedTransaction)
  }
  catch (err) {
    res.status(500).json({ message: 'Something went Wrong' })
  }
}
)