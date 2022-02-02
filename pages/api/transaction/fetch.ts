// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Prisma from "../../../lib/prisma"
import { parseSociety } from '../../../Misc/parseSociety';
import { authenticated } from './add';


export default authenticated(async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  try {

    const soc = parseSociety(req.body.society);

    if (soc !== 'Main') {

      const transactions = await Prisma.transaction.findMany({

        where: {
          society: parseSociety(req.body.society)
        }
      });
      res.status(200).json(transactions)
    }
    else if (soc === 'Main') {

      const transactions = await Prisma.transaction.findMany();
      res.status(200).json(transactions)
    }
  }
  catch (err) {
    res.status(500).json({ message: 'Something went Wrong' })
  }
}
)