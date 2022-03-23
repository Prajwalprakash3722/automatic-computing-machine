/* eslint-disable @next/next/no-img-element */
import { PaperClipIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import TimeLine from "../../components/TimeLine";
import prisma from "../../lib/prisma";
import { parseRole, parseSociety } from "../../Misc/parseSociety";
import type { Transaction } from "../../types";
interface Props {
  transaction: Transaction;
}

export default function View({ transaction }: Props) {
  const parseRupees = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

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
  const [sid, setSid] = useState<number | null>(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setSid(parseInt(localStorage.getItem("sid") as string));
    toast.success("Transaction loaded");
  }, []);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen">
      <Toaster reverseOrder={false} />
      {token ? (
        <>
          {data ? (
            <>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Transaction Details
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Transaction id: {data.id}
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Event Name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data.event}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Society
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data.society}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Amount
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {parseRupees(data.amount)}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Signed Off by
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data.signedOff}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Description
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data.description}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Attachments
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {data.assets.length > 0 ? (
                          <ul
                            role="list"
                            className="border border-gray-200 rounded-md divide-y divide-gray-200"
                          >
                            {data.assets.map((asset, index) => {
                              return (
                                <>
                                  <li
                                    className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                                    key={asset.url}
                                  >
                                    <div className="w-0 flex-1 flex items-center">
                                      <PaperClipIcon
                                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                      />
                                      <span className="ml-2 flex-1 w-0 truncate">
                                        Attachments - {index + 1}
                                      </span>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                      <a
                                        href={asset.url}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        View
                                      </a>
                                    </div>
                                  </li>
                                </>
                              );
                            })}
                          </ul>
                        ) : (
                          <p>No attachments</p>
                        )}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Latest Status
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {!data.LastStatus ? "Rejected " : "Approved"}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Last {!data.LastStatus ? "Rejected" : "Approved"} By
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {transaction.LastStatus
                          ? `${parseRole(transaction.level)}`
                          : `${parseRole(transaction.level + 2)}`}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <br />
              <TimeLine transaction={data} />
            </>
          ) : (
            <>
              <h1 className="text-center text-2xl font-bold m-4 text-blue-400">
                No Id Found, Go back and refresh
              </h1>
            </>
          )}
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
      LastStatus: true,
      level: true,
      assets: {
        select: {
          id: true,
          url: true,
          type: true,
        },
      },
    },
  });
  return {
    props: {
      transaction,
    },
  };
}
