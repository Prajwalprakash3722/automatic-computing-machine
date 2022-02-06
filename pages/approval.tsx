import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { parseRole, parseSociety } from "../Misc/parseSociety";
import { Transaction } from "../types";

const Approval = () => {
  const transaction = [
    {
      id: "",
      event: "",
      date: "",
      amount: 0,
      type: "",
      description: "",
      signedOff: "",
      society: "",
      createdAt: "",
      updatedAt: "",
      assets: [],
      LastStatus: false,
      level: 0,
      ApprovedComments: [],
      RejectedComments: [],
    },
  ];

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
  const [transactions, setTransactions] = useState<Transaction[]>(transaction);
  const [token, setToken] = useState<string | null>(null);
  const [sid, setSid] = useState<number | null>(null);
  const [role, setRole] = useState<number | null>(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setSid(parseInt(localStorage.getItem("sid") as string));
    setRole(parseInt(localStorage.getItem("role") as string));
    const data = {
      society: sid,
      role: role,
    };
    axios
      .post("/api/transaction/approval", data, {
        headers: {
          Authorization: token as string,
        },
      })
      .then((res) => {
        toast.success("Transactions fetched successfully");
        setTransactions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [role, sid, token]);

  const Approve = async (id: string) => {
    const data = {
      id: id,
      role: role,
    };
    try {
      await axios.post("/api/transaction/approve", data, {
        headers: {
          Authorization: token as string,
        },
      });
    } catch (err) {
      throw new Error(err as any);
    }
  };

  const handleSubmit = async (id: string) => {
    try {
      toast.promise(
        Approve(id),
        {
          loading: "Working on it...",
          success: "Transaction Approved successfully!",
          error: "You are not authorized to approve this transaction",
        },
        {
          duration: 3000,
        }
      );
      // window.reload();
    } catch (error) {
      toast.error(error as any);
    }
  };

  const Headers = [
    // "Sl. No.",
    "event",
    "date",
    "amount",
    "signedOff",
    "society",
    "type",
    "remarks",
    "Assets",
    "Remarks History",
    "Latest Status",
    "actions",
  ];

  return (
    <>
      <Toaster />
      <div>
        <div className="border-2 border-blue-400 w-full max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-lg ">
          <div className="px-6 py-4 text-3xl font-bold">
            <h2 className=" text-center  text-transparent bg-gradient-to-r bg-clip-text from-blue-500 to bg-green-500">
              Pending Transactions for {parseRole(role as number)}
            </h2>
          </div>
        </div>
        <section className="flex flex-col mt-4">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-800 rounded-lg">
                <table className="min-w-full divide-y divide-gray-800 ">
                  <thead className="bg-gray-800">
                    <tr>
                      {Headers.map((header) => (
                        <>
                          <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"
                            key={JSON.stringify(header)}
                          >
                            {header}
                          </th>
                        </>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-gray-700 divide-y divide-gray-500">
                    {transactions.map((transaction, index) => (
                      <>
                        <tr id={transaction.id} key={transaction.id}>
                          {/* <td className="px-4  whitespace-nowrap text-sm font-medium text-white">
                            {index + 1}
                          </td> */}
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">
                            {transaction.event}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">
                            {transaction.date}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">
                            {transaction.amount}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">
                            {transaction.signedOff}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">
                            {transaction.society}
                          </td>
                          <td className="py-4 whitespace-nowrap text-sm font-medium text-white">
                            <span
                              className={`flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full ${TransactionType(
                                transaction.type
                              )}`}
                            >
                              {transaction.type}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">
                            {transaction.description}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">
                            <a
                              href={transaction.id}
                              className="text-blue-400 hover:text-blue-500 hover:underline"
                            >
                              {transaction.assets &&
                              transaction.assets.length > 0
                                ? `${transaction.assets.length} Assets`
                                : "0 Assets"}
                            </a>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">
                            {transaction.ApprovedComments.length > 0 && (
                              <>
                                {transaction.ApprovedComments.map(
                                  (comment: any) => {
                                    console.log(comment);
                                    return (
                                      <>
                                        <span key={JSON.stringify(comment)}>
                                          remarks by{" "}
                                          {parseRole(
                                            parseInt(comment.by) as number
                                          )}
                                          {": "}
                                          {comment.comment}
                                          <br />
                                        </span>
                                      </>
                                    );
                                  }
                                )}
                              </>
                            )}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">
                            {transaction.LastStatus
                              ? `Approved by ${parseRole(transaction.level)}`
                              : `Approved by ${parseRole(transaction.level)}`}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-white">
                            {transaction.type !== "open" &&
                              role! > transaction.level && (
                                <>
                                  <div className="flex items-start justify-between">
                                    <button
                                      onClick={() => {
                                        handleSubmit(transaction.id!);
                                      }}
                                      className="m-2 text-green-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1"
                                    >
                                      <CheckCircleIcon className="h-6 w-6" />
                                    </button>
                                    <div className="m-2 text-red-500 md:m-0 hover:underline bg-slate-50 rounded-md p-1">
                                      <XCircleIcon className="h-6 w-6" />
                                    </div>
                                  </div>
                                </>
                              )}
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Approval;
