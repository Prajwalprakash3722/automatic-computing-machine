// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Prisma from "../../../lib/prisma/"



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
