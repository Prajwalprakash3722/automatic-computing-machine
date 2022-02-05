import { ApiRequest } from './add';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next'
import Prisma from "../../../lib/prisma"
import { parseSociety } from '../../../Misc/parseSociety';
import { authenticated } from './add';


export default authenticated(async function handler(req: ApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  try {

  }
  catch (err) {
    res.status(500).json({ message: 'Something went Wrong' })
  }
}
)