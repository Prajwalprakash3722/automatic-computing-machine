import { ApiRequest } from './add';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next'
import Prisma from "../../../lib/prisma"
import { authenticated } from './add';


export default authenticated(async function handler(req: ApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
  }

  try {

    const assets = await Prisma.asset.findMany({
      select: {
        id: true,
        url: true,
        type: true,
      }
    })
    res.status(200).json(assets)
    console.log(assets);


  }
  catch (err) {
    res.status(500).json({ message: 'Something went Wrong' })
  }
}
)