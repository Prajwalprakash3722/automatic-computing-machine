import { Transaction } from "../types";

interface Props {
  openBalance: number;
  transactions: Transaction[];
}

const HeaderCards = ({ openBalance, transactions }: Props) => {
  const parseRupees = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  const lastTransaction = transactions[transactions.length - 1];

  const debitTranscations = transactions.filter(
    (transaction) => transaction.type === "debit"
  );
  const creditTranscations = transactions.filter(
    (transaction) => transaction.type === "credit"
  );

  const balance =
    openBalance +
    creditTranscations.reduce((acc, curr) => acc + curr.amount, 0) -
    debitTranscations.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <>
      <div>
        <div>
          <h2 className="text-4xl font-bold pt-4 text-gray-800 text-center bg-blue-100">
            IEEE RVCE SB
          </h2>
        </div>
        <div className="flex flex-col bg-blue-100 p-4 justify-evenly gap-4 md:flex-row lg:p-12">
          <div className="w-full bg-white p-6 rounded-lg shadow-lg md:w-1/2 lg:w-1/3 border-2 border-indigo-400">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Opening Balance for{" "}
              <span className="text-indigo-400">
                {new Date().getFullYear()}
              </span>
            </h2>
            <p className="text-gray-700 text-2xl font-semibold">
              &#8377;{parseRupees(openBalance)}
            </p>
          </div>
          <div
            className={`w-full ${
              lastTransaction.type === "debit"
                ? "bg-red-100  border-red-500"
                : "bg-green-100 border-green-500"
            } p-6 rounded-lg shadow-lg md:w-1/2 lg:w-1/3 border-2`}
          >
            <h2 className="text-2xl font-bold text-gray-800">
              Latest Transaction on{" "}
              <span className="text-indigo-400">{lastTransaction.date}</span>
            </h2>
            <p className="text-gray-700 text-lg font-normal">
              {lastTransaction.event}
            </p>
            <p className="text-gray-700 text-2xl font-semibold">
              &#8377;{parseRupees(lastTransaction.amount)}
            </p>
          </div>
          <div className="w-full bg-white p-6 rounded-lg shadow-lg md:w-1/2 lg:w-1/3 border-2 border-indigo-400">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Current Balance as of{" "}
              <span className="text-indigo-400">
                {new Date().toLocaleDateString()}
              </span>
            </h2>
            <p className="text-gray-700 text-2xl font-semibold">
              &#8377;{parseRupees(balance)}
            </p>
          </div>
          <div className="w-full bg-white p-6 rounded-lg shadow-lg md:w-1/2 lg:w-1/3 border-2 border-indigo-400">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Amount Spent till{" "}
              <span className="text-indigo-400">
                {new Date().toLocaleDateString()}
              </span>
            </h2>
            <p className="text-gray-700 text-2xl font-semibold">
              &#8377;{parseRupees(openBalance - balance)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderCards;
