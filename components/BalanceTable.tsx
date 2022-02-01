import Link from "next/link";
import { useMemo } from "react";
import { ColumnFilter } from "../Misc/ColFilter";
import { Transaction } from "../types";
import { useTable, usePagination, useFilters } from "react-table";

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
        Header: "Type",
        accessor: "type",
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
      // TODO add a edit button which redirects to `/edit/{id}`
      // {
      //   Header: "Edit",
      //   accessor: "edit",
      //   width: 200,
      //   filterable: true,
      //   filter: colFilterer,
      // },
    ],
    []
  );

  function Table({ columns, data }: any) {
    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable(
        {
          columns,
          data,
        },
        useFilters
      );

    // Render the UI for your table
    return (
      <table
        className="min-w-full divide-y divide-gray-800 "
        {...getTableProps()}
      >
        <thead className="bg-gray-800">
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column) => (
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  {...column.getHeaderProps()}
                  key={index}
                >
                  {column.render("Header")}
                </th>
              ))}
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
              <tr {...row.getRowProps()} key={i}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white"
                      {...cell.getCellProps()}
                      key={i}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <>
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

// TODO Below extra things are to be added
// ! The amount has not been parsed in the table.
/*
 {parseRupees(amount)}
 
 */

// ! This is the background color classifier for the table add this in type column
{
  /* <span
  className={`flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full ${TransactionType(
    item.type
  )}`}
>
  {item.type}
</span>; */
}
