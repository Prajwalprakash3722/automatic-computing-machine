/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Transaction } from "../types";

type BalanceCardProps = {
  transaction: Transaction[];
};
const BalCard = ({ transaction }: BalanceCardProps) => {
  /**
   * @param num
   * @returns Neatly Formatted Indian Rupee
   */
  const parseRupees = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  const TransactionType = (type: string) => {
    switch (type) {
      case "credit":
        return "bg-green-500 text-green-800";
      case "open":
        return "bg-yellow-300 text-yellow-800";
      case "debit":
        return "bg-red-400 text-red-800";
    }
  };

  const tableHeaders = [
    "Event",
    "Date",
    "Amount",
    "Signed Off by",
    "Society",
    "Type",
    "Remarks",
  ];

  return (
    <>
      <section className="flex flex-col  ">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-800 rounded-lg">
              <table className="min-w-full divide-y divide-gray-800 ">
                <thead className="bg-gray-800">
                  <tr>
                    {tableHeaders.map((header, index) => (
                      <>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                          key={index}
                        >
                          {header}
                        </th>
                      </>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-gray-700 divide-y divide-gray-500">
                  {transaction.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {item.event}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {item.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white truncate">
                        &#8377; {parseRupees(item.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {item.signedOff}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {item.society}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap capitalize">
                        <span
                          className={`flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full ${TransactionType(
                            item.type
                          )}`}
                        >
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BalCard;
