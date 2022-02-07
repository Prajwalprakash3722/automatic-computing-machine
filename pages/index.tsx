import type { NextPage } from "next";
import Head from "next/head";
import AddModal from "../components/AddModal";
import BalanceList from "../components/TransactionsList";
import BalCard from "../components/HeaderCard";
import { Transaction } from "../types";
import { useEffect, useState } from "react";
import InfoGraphics from "../components/InfoGraphics";
import Prisma from "../lib/prisma";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

/**
 * @note We are not having any server-side rendering here as the rendering depends on some data from client side
 */
export default function Index() {
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
      level: 1,
      ApprovedComments: [],
      RejectedComments: [],
    },
  ];

  const isEditable = (role: number) => {
    if (role === 2 || role === 4) {
      return false;
    } else return true;
  };

  const [transactions, setTransactions] = useState<Transaction[]>(transaction);
  const [modal, setModalOpen] = useState(false);
  const [infographics, setInfographics] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [sid, setSid] = useState<number | null>(null);
  const [role, setRole] = useState<number | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setSid(parseInt(localStorage.getItem("sid") as string));
    setRole(parseInt(localStorage.getItem("role") as string));

    const data = {
      society: sid,
    };
    axios
      .post("/api/transaction/fetch", data, {
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
  }, [sid, token]);

  // transactions.filter((transaction) => transaction.level >= role!)
  return (
    <div>
      <Head>
        <title>Accounts | IEEE RVCE</title>
        <meta name="description" content="accounts maintaining for ieee rvce" />
        <link rel="icon" href="/icons/android-chrome-512x512.png" />
      </Head>
      <Toaster />
      {token ? (
        <>
          <BalCard
            openBalance={transactions[0]?.amount ?? 0}
            transactions={transactions.filter(
              (transaction) => transaction.level >= role!
            )}
            sid={sid}
            role={role}
          />
          <div className="flex flex-col md:flex-row items-center justify-center m-4">
            {!infographics && isEditable(role!) && (
              <AddModal
                modal={modal}
                setModalOpen={setModalOpen}
                transactions={transactions.filter(
                  (transaction) => transaction.level >= role!
                )}
                setTransactions={setTransactions}
                sid={sid}
              />
            )}
            {!modal && transactions && transactions.length > 0 && (
              <InfoGraphics
                modal={infographics}
                setModalOpen={setInfographics}
                transactions={transactions.filter(
                  (transaction) => transaction.level >= role!
                )}
                sid={sid}
              />
            )}
          </div>
          <BalanceList
            transactions={transactions.filter(
              (transaction) => transaction.level >= role!
            )}
            sid={sid}
          />
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-center text-2xl font-bold m-4">
              Please{" "}
              <Link href="/login" prefetch={true} passHref={true}>
                <a className="text-blue-400 underline">Login</a>
              </Link>{" "}
              to view your account
            </h1>
          </div>
        </>
      )}
    </div>
  );
}
