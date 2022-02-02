import axios from "axios";
import { verify } from "jsonwebtoken";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import prisma from "../../lib/prisma";
import { parseSociety } from "../../Misc/parseSociety";
import type { Transaction } from "../../types";

interface Props {
  transaction: Transaction;
}

export default function Edit({ transaction }: Props) {
  const soc = [
    "Main",
    "Computer Society",
    "Communication Society",
    "SPS",
    "APS",
    "RAS",
    "PES",
    "Sight",
    "WIE",
  ];

  const [data, setData] = useState<Transaction>(transaction);
  const [token, setToken] = useState<string | null>(null);
  const [sid, setSid] = useState<number | null>(1);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    // setSid(localStorage.getItem("sid") as unknown as number);
  }, []);
  const create = async (data: Transaction) => {
    try {
      await axios.post("http://localhost:3000/api/transaction/edit", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      throw new Error(error as any);
    }
  };
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    data: Transaction
  ) => {
    e.preventDefault();
    try {
      toast.promise(
        create(data),
        {
          loading: "Working on it...",
          success: "Transaction Updated successfully!",
          error: "Oops! something went wrong.",
        },
        {
          duration: 3000,
        }
      );
    } catch (error) {
      toast.error(error as any);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Toaster reverseOrder={false} />
      {token ? (
        <>
          <div className="flex flex-col gap-2 md:w-1/3">
            <form
              className="grid grid-cols-1 gap-y-6 shadow-lg p-8 bg-[#131415] rounded-lg"
              onSubmit={(event) => {
                handleSubmit(event, data);
              }}
            >
              <h1 className="font-bold text-3xl md:text-4xl text-white tracking-wide text-center">
                Edit Transaction
              </h1>
              <span className="font-bold text-lg text-white text-center underline">
                Transaction Id: {transaction.id}
              </span>
              <input
                className="focus:outline-none block w-full shadow-sm py-3 text-gray-900 px-4 mb-2 bg-slate-200 placeholder-gray-500  border-gray-700 rounded-md"
                type="text"
                id="event"
                value={data.event}
                placeholder="Event Name"
                onChange={(e) => setData({ ...data, event: e.target.value })}
                required
              />
              <input
                className="focus:outline-none block w-full shadow-sm py-3 text-gray-900 px-4 mb-2 bg-slate-200 placeholder-gray-500  border-gray-700 rounded-md"
                type="date"
                value={new Date(data.date).toISOString().split("T")[0]}
                onChange={(e) => setData({ ...data, date: e.target.value })}
                placeholder="Event date"
                required
              />
              <input
                className="focus:outline-none block w-full shadow-sm py-3 text-gray-900 px-4 mb-2 bg-slate-200 placeholder-gray-500  border-gray-700 rounded-md"
                type="float"
                onChange={(e) =>
                  setData({ ...data, amount: parseInt(e.target.value) })
                }
                placeholder="Event Amount"
                value={data.amount}
                required
              />
              <div className="relative inline-block w-full text-gray-900">
                <select
                  className="focus:outline-none w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
                  placeholder="Amount Type"
                  onChange={(e) => setData({ ...data, type: e.target.value })}
                  required
                  value={data.type}
                >
                  <option value="debit">Debit</option>
                  <option value="credit">Credit</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <textarea
                placeholder="Description...."
                className="focus:outline-none w-full h-16 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                required
                value={data.description}
              />
              <input
                className="focus:outline-none block w-full shadow-sm py-3 text-gray-900 px-4 mb-2 bg-slate-200 placeholder-gray-500  border-gray-700 rounded-md"
                type="text"
                onChange={(e) =>
                  setData({ ...data, signedOff: e.target.value })
                }
                placeholder="Signed Off By"
                required
                value={data.signedOff}
              />
              <div className="relative inline-block w-full text-gray-900">
                <select
                  className="focus:outline-none w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
                  placeholder="Society"
                  onChange={(e) =>
                    setData({ ...data, society: e.target.value })
                  }
                  required
                  value={data.society}
                >
                  {sid === 1 ? (
                    <>
                      {soc.map((s, index) => (
                        <option value={s} key={index}>
                          {s}
                        </option>
                      ))}
                    </>
                  ) : (
                    <option>{parseSociety(sid as number)}</option>
                  )}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <button
                type="submit"
                className="w-full justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update
              </button>
            </form>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-center text-2xl font-bold m-4">
            Please{" "}
            <Link href="/login" prefetch={true} passHref={true}>
              <a className="text-blue-400 underline">Login</a>
            </Link>{" "}
            to view your account
          </h1>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(context: { query: { id: any } }) {
  const { id } = context.query;

  const transaction = await prisma.transaction.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      event: true,
      date: true,
      amount: true,
      type: true,
      description: true,
      signedOff: true,
      society: true,
    },
  });
  return {
    props: {
      transaction,
    },
  };
}
