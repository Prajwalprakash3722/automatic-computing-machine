export type Transaction = {
  id?: string;
  event: string;
  date: string;
  amount: number;
  type: string;
  description: string;
  signedOff: string;
  society: string;
  assets: Assets[];
  LastStatus: boolean;
  level: number;
  ApprovedComments: ApprovedComments[];
  RejectedComments: RejectedComments[];
};

export type User = {
  ieeeid: string;
  password: string;
}

interface ApprovedComments {
  comment: string;
  by: string;
}

interface RejectedComments {
  comment: string;
  by: string;
}

type Assets = {
  url: string;
  type: string;
}