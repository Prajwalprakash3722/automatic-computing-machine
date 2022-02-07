import { ApiRequest } from './add';
import type { NextApiResponse } from 'next'
import Prisma from "../../../lib/prisma"
import { parseSociety } from '../../../Misc/parseSociety';
import { authenticated } from './add';


export default authenticated(async function handler(req: ApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  try {

    const soc = parseSociety(req.body.society);
    const role = req.body.role as number;
    if (soc !== 'Main') {

      const transactions = await Prisma.transaction.findMany({
        where: {
          society: parseSociety(req.body.society),
          level: {
            gte: role - 1
          }
        },
        include: {
          ApprovedComments: {
            select: {
              comment: true,
              by: true,
            }
          },
          assets: {
            select: {
              id: true,
              url: true,
              type: true,
            }
          },
          RejectedComments: {
            select: {
              comment: true,
              by: true,
            }
          },
        },
      });
      res.status(200).json(transactions)
    }
    else if (soc === 'Main') {

      const transactions = await Prisma.transaction.findMany({
        where: {
          level: {
            gte: role - 1
          }
        },
        include: {
          RejectedComments: {
            select: {
              comment: true,
              by: true,
            }
          },
          assets: {
            select: {
              url: true,
              type: true,
            }
          },
          ApprovedComments: {
            select: {
              comment: true,
              by: true,
            }
          },
        }
      });
      res.status(200).json(transactions)
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went Wrong' })
  }
}
)