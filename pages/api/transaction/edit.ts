// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Prisma from "../../../lib/prisma"
import { Transaction } from '../../../types';

interface TransactionOptions extends Transaction {

  Aid?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {

    const {
      id,
      event,
      date,
      amount,
      type,
      description,
      signedOff,
      society,
      assets }: TransactionOptions = req.body;

    await Prisma.transaction.update({
      where: {
        id: id
      },
      data: {
        event,
        date,
        amount,
        type,
        description,
        signedOff,
        society,
      }
    });
    res.status(200)
  }
  catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Something went Wrong' })
  }
}
