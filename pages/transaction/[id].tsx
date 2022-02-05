/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import prisma from "../../lib/prisma";
import { parseSociety } from "../../Misc/parseSociety";
import type { Transaction } from "../../types";

interface Props {
  transaction: Transaction;
}

export default function View({ transaction }: Props) {
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
          <div className="border-2 border-blue-400 w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg ">
            <div className="px-6 py-4 text-3xl font-bold">
              <h2 className=" text-center  text-transparent bg-gradient-to-r bg-clip-text from-blue-500 to bg-green-500">
                View Transaction
              </h2>
            </div>
          </div>
          <div>
            Assets:
            {data.assets.map((a) => {
              return (
                <>
                  <a href={a.link}>{a.link}</a>
                  <br />
                </>
              );
            })}
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
      assets: {
        select: {
          link: true,
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
