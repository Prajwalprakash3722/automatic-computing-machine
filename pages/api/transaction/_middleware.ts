
import type { NextFetchEvent, NextRequest } from 'next/server'


/**
 * @param req 
 * @param ev 
 * @description Checks if the request has a valid user
 */
export function middleware(req: NextRequest, ev: NextFetchEvent) {

  const token = req.headers.get('Authorization') || '';

  console.log(token);


}