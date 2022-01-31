import type { NextPage } from "next";
import Head from "next/head";
import AddModal from "../components/AddModal";
import BalanceList from "../components/TransactionsList";
import BalCard from "../components/HeaderCard";
import { Transaction } from "../types";
import { useState } from "react";
import InfoGraphics from "../components/InfoGraphics";
import Prisma from "../lib/prisma";

export async function getServerSideProps() {
  const transactions = await Prisma.transaction.findMany();
  return {
    props: {
      transaction: transactions,
    },
  };
}

interface Props {
  transaction: Transaction[];
}

export default function Index({ transaction }: Props) {
  const [transactions, setTransactions] = useState<Transaction[]>(transaction);

  const [modal, setModalOpen] = useState(false);
  const [infographics, setInfographics] = useState(false);
  return (
    <div>
      <Head>
        <title>Accounts | IEEE RVCE</title>
        <meta name="description" content="accounts maintaining for ieee rvce" />
        <link rel="icon" href="/icons/android-chrome-512x512.png" />
      </Head>
      <BalCard
        openBalance={transactions[0] ? transactions[0].amount : 0}
        transactions={transactions}
      />

      <div className="flex flex-col md:flex-row items-center justify-center m-4">
        {!infographics && (
          <AddModal
            modal={modal}
            setModalOpen={setModalOpen}
            transactions={transactions}
            setTransactions={setTransactions}
          />
        )}
        {!modal && (
          <InfoGraphics
            modal={infographics}
            setModalOpen={setInfographics}
            transactions={transactions}
          />
        )}
      </div>

      <BalanceList transactions={transactions} />
    </div>
  );
}
