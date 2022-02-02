// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Prisma from "../../../lib/prisma"
import { authenticated } from './add';


const parseSociety = (society: number) => {

  let soc;

  switch (society) {
    case 1:
      soc = '';
      break;
    case 2:
      soc = 'Computer Society'
      break;

    case 3:
      soc = 'Communication Society'
      break;

    case 4:
      soc = 'SPS'
      break;

    case 5:
      soc = 'APS'
      break;

    case 6:
      soc = 'RAS'
      break;

    case 7:
      soc = 'PES'
      break;

    case 8:
      soc = 'Sight'
      break;

    case 9:
      soc = 'WIE'
      break;
  }
  return soc;
}



export default authenticated(async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  try {

    const soc = parseSociety(req.body.society);

    if (soc !== '') {

      const transactions = await Prisma.transaction.findMany({

        where: {
          society: parseSociety(req.body.society)
        }
      });
      res.status(200).json(transactions)
    }
    else if (soc === '') {

      const transactions = await Prisma.transaction.findMany();
      res.status(200).json(transactions)
    }
  }
  catch (err) {
    res.status(500).json({ message: 'Something went Wrong' })
  }
}
)