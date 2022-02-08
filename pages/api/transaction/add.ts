// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { JwtPayload, verify } from 'jsonwebtoken';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import Prisma from "../../../lib/prisma"
import { Transaction } from '../../../types';

export interface ApiRequest extends NextApiRequest {
  user?: JwtPayload | String;
}

export const authenticated = (fn: NextApiHandler) => async (
  req: ApiRequest,
  res: NextApiResponse
) => {

  const atoken = req.headers.authorization;

  verify(atoken!, process.env.ACCESS_TOKEN_SECRET as string, async function (err, decoded) {
    if (!err && decoded) {

      req.user = decoded
      return await fn(req, res);
    }
    else if (err) {

      res.status(401).json({ message: 'Auth Failed' });
    }
  });
};

export default authenticated(async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {

    const {
      event,
      date,
      amount,
      type,
      description,
      signedOff,
      level,
      society,
      assets, ApprovedComments }: Transaction = req.body;
    const savedTransaction = await Prisma.transaction.create({
      data: {
        event,
        date,
        amount,
        type,
        level,
        description,
        signedOff,
        society,
        assets: {
          createMany: {
            data:
              [
                ...assets.map(asset => ({
                  url: asset.url,
                  type: asset.type
                }))
              ]
          }
        },
        ApprovedComments: {
          createMany: {
            data:
              [
                ...ApprovedComments.map(comment => ({
                  comment: comment.comment,
                  by: comment.by
                }))
              ]
          }
        }
      }
    });
    res.status(200).json(savedTransaction)
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went Wrong' })
  }
}
)