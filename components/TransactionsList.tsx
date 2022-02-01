import { Transaction } from "../types";
import BalanceTable from "./BalanceTable";
import generatePDF from "./PdfGen/WholePdfGen";

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
                generatePDF({ transactions });
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
          <BalanceTable transaction={transactions} />
        </div>
      </div>
    </div>
  );
};
export default TransactionsList;
