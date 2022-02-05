export type Transaction = {
  id?: string;
  event: string;
  date: string;
  amount: number;
  type: string;
  description: string;
  signedOff: string;
  society: string;
  assets: string[];
};

export type User = {
  ieeeid: string;
  password: string;
}