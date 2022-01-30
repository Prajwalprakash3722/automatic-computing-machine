/* eslint-disable @next/next/no-img-element */
import { Transaction } from "../types";

type BalanceCardProps = {
  transaction: Transaction;
};
const BalCard = ({ transaction }: BalanceCardProps) => {
  const parseRupees = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  return (
    <>
      <div
        className={`w-full ${
          transaction.type === "debit"
            ? "bg-red-100 border-red-500"
            : "bg-green-100 border-green-500"
        } p-6 rounded-lg shadow-lg  border-2 mt-4`}
      >
        <h2 className="text-2xl font-bold mb-2 text-gray-800 first-letter:capitalize">
          {transaction.event}
          {" on "}
          <span className="text-indigo-400">{transaction.date}</span>
        </h2>
        <p className="text-gray-700 text-2xl font-semibold">
          Amount:{" "}
          <span className="text-stone-600">
            &#8377;{parseRupees(transaction.amount)}
          </span>
        </p>
        <p className="text-slate-700 text-xl font-semibold">
          Signed off by: {transaction.signedOff}
        </p>
        <p className="text-slate-700 text-xl font-normal">
          Society: {transaction.society}
        </p>
        <p className="text-gray-700 text-md font-medium">
          {transaction.description}
        </p>
      </div>
    </>
  );
};

export default BalCard;
