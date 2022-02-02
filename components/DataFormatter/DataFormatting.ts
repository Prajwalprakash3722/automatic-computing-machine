import type { Transaction } from "../../types";

export type DataRow = [string, string, string, string, string, string];

export const tableHeader: DataRow = [
  "Id",
  "Date",
  "society",
  "Amount",
  "Type",
  "Balance",
];

export function getTransactionRows(transactions: Transaction[], sid: number | null): DataRow[] {
  const tableRows: DataRow[] = [];
  let balance = 0;

  const parseRupees = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  transactions.forEach((data) => {
    if (data.type === "credit" || data.type === "open") balance += data.amount;
    else balance -= data.amount;


    const ticketData: DataRow = [
      data.id ?? "",
      data.date,
      data.society,
      parseRupees(data.amount),
      data.type,
      sid === 1 ? parseRupees(balance) : "",
    ];
    return tableRows.push(ticketData);
  });

  //balance is the same as Balance
  const summaryRow: DataRow = [
    "Total Balance",
    "",
    "",
    "",
    "",
    parseRupees(balance),
  ];
  if (sid === 1) {

    tableRows.push(summaryRow);
  }
  return tableRows;
}
