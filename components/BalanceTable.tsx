import Link from "next/link";
import { useMemo, useState } from "react";
import { ColumnFilter } from "../Misc/ColFilter";
import { Transaction } from "../types";
import { useTable, usePagination, useFilters } from "react-table";
import { PencilIcon } from "@heroicons/react/solid";
import { TrashIcon } from "@heroicons/react/solid";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Router from "next/router";
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

  const [level, setLevel] = useState<number>(0);

  useMemo(() => setLevel(parseInt(localStorage.getItem("role") as string)), []);
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/transaction/delete/${id}`, {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      });
      toast.success("Transaction Deleted");
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
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
  /**
   *
   * @returns Checks if the logged user is counsellor or branch counsellor and returns the respective access
   */
  const isEditable = () => {
    if (
      parseInt(localStorage.getItem("role")!) === 2 ||
      parseInt(localStorage.getItem("role")!) === 4
    ) {
      return false;
    } else return true;
  };

  const colFilterer = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

  const data = useMemo(() => transaction, [transaction]);

  const columns = useMemo(
    () => [
      {
        Header: "Event",
        accessor: "event",
        width: 200,
        filterable: true,
        filter: colFilterer,
      },
      {
        Header: "Date",
        accessor: "date",
        width: 200,
        filterable: true,
        filter: colFilterer,
      },
      {
        Header: "Amount",
        accessor: `amount`,
        width: 200,
        filterable: true,
        filter: colFilterer,
      },
      {
        Header: "Signed Off by",
        accessor: "signedOff",
        width: 200,
        filterable: true,
        filter: colFilterer,
      },
      {
        Header: "Society",
        accessor: "society",
        width: 200,
        filterable: true,
        filter: colFilterer,
      },
      {
        Header: "Remarks",
        accessor: "description",
        width: 200,
        filterable: true,
        filter: colFilterer,
      },
    ],
    [colFilterer]
  );

  function Table({ columns, data }: any) {
    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
      useTable<Transaction>({ columns, data }, useFilters);

    // Render the UI for your table
    return (
      <table
        className="min-w-full divide-y divide-gray-800 "
        {...getTableProps()}
      >
        <thead className="bg-gray-800">
          {headerGroups.map((headerGroup, index) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={index + Math.random() * 1000000}
            >
              {headerGroup.headers.map((column) => (
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  {...column.getHeaderProps()}
                  key={index + Math.random() * 1000}
                >
                  {column.render("Header")}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Transaction Type
              </th>
              {isEditable() && (
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          ))}
        </thead>
        <tbody
          className="bg-gray-700 divide-y divide-gray-500"
          {...getTableBodyProps()}
        >
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <>
                <tr
                  {...row.getRowProps()}
                  key={row.original.id}
                  className="transform transition duration-200 hover:bg-gray-600 cursor-pointer"
                  onDoubleClick={() => {
                    Router.push(`/transaction/${row.original.id}`);
                  }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"
                        {...cell.getCellProps()}
                        key={cell.column.id}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                  <td className="px-16 py-4 whitespace-nowrap text-sm font-medium text-white">
                    <span
                      className={`flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full ${TransactionType(
                        row.original.type
                      )}`}
                    >
                      {row.original.type}
                    </span>
                  </td>
                  {isEditable() && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {row.original.type !== "open" &&
                        row.original.level <= 4 &&
                        row.original!.level <= level && (
                          <>
                            <div className="flex items-start justify-between">
                              <Link
                                href="/edit/[id]"
                                as={`/edit/${row.original.id}`}
                              >
                                <a className="tooltip m-2 text-green-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                                  <span className="tooltiptext">Edit</span>
                                  <PencilIcon className="h-6 w-6" />
                                </a>
                              </Link>

                              <div
                                onClick={() => {
                                  handleDelete(row.original.id!);
                                }}
                                className="tooltip m-2 text-red-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1"
                              >
                                <span className="tooltiptext">Delete</span>
                                <TrashIcon className="h-6 w-6" />
                              </div>
                            </div>
                          </>
                        )}
                    </td>
                  )}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <section className="flex flex-col  ">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-800 rounded-lg">
              <Table columns={columns} data={data} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BalCard;
