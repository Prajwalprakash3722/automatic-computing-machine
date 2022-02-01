import { Transaction } from "../types";
import BalCard from "./BalanceCard";
import generatePDF from "./DataFormatter/WholePdfGen";

interface Props {
  transactions: Transaction[];
}

const TransactionsList = ({ transactions }: Props) => {
  return (
    <div className="flex flex-col bg-slate-50 p-8 justify-evenly gap-2">
      <div className="flex flex-col justify-start">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row">
            <button
              onClick={() => {
                generatePDF( transactions );
              }}
              className="m-2 hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm cursor-pointer"
            >
              Generate Report (PDF)
            </button>
            <button className="m-2 hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm cursor-pointer">
              Generate Report (Excel)
            </button>
          </div>
          <div>
            {/*
           TODO : Add Filtering Feature
           */}
          </div>
        </div>
        <div>
          {transactions.map((transaction, index) => (
            <BalCard key={index} transaction={transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default TransactionsList;
