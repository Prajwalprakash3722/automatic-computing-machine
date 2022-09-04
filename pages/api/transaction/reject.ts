import { ApiRequest } from './add';
import type { NextApiResponse } from 'next'
import Prisma from "../../../lib/prisma"
import { parseSociety, parseRole } from '../../../Misc/parseSociety';
import { authenticated } from './add';


export default authenticated(async function handler(req: ApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const id = req.body.id;
    const role = req.body.role as number;
    const comment = req.body.comment;
    const transactions = await Prisma.transaction.findUnique({
      where: {
        id: id,
      }
    })
    if (transactions!.level <= role) {
      await Prisma.transaction.update({
        where: {
          id: id,
        },
        data: {
          level: transactions!.level - 1,
          LastStatus: false,
        }
      })
      await Prisma.rejectedComments.create({
        data: {
          by: JSON.stringify(role),
          comment: comment,
          transaction: {
            connect: {
              id: id,
            }
          }
        }
      })
      res.status(200).json({ message: 'Transaction Rejected' })
    }
    else {
      res.status(401).json({ message: 'You are not authorized to reject this transaction' });
    }
    res.status(200).json(transactions)

  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went Wrong' })
  }
}
)