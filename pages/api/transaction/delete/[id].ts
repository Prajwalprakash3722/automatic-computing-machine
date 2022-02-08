import { ApiRequest } from '../add';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next'
import Prisma from "../../../../lib/prisma"
import { authenticated } from '../add';


export default authenticated(async function handler(req: ApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  const id = req.query.id as string;
  //! Change this to level from user object from middleware
  const level = 2;
  try {
    const transaction = await Prisma.transaction.findUnique({
      where: {
        id: id as string
      }
    });
    if (!transaction) {
      res.status(404).json({ message: 'Transaction not found' });
    }
    else if (transaction!.level > level) {
      res.status(403).json({ message: 'Insufficient permissions' });
    }
    else {
      res.status(200).json({ message: "Successfully Deleted" });
    }
  }
  catch (err) {
    res.status(500).json({ message: 'Something went Wrong' })
  }
}
)