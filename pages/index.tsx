import type { NextPage } from "next";
import Head from "next/head";
import AddModal from "../components/AddModal";
import BalanceList from "../components/TransactionsList";
import BalCard from "../components/HeaderCard";
import { Transaction } from "../types";
import { useState } from "react";
import InfoGraphics from "../components/InfoGraphics";

const Home: NextPage = () => {
  const [transactions, setTransactions] = useState([
    {
      id: "1",
      amount: 625996.42,
      date: new Date().toLocaleDateString(),
      description: "Opening Balance as of January 2022",
      event: "Opening Balance",
      signedOff: "Shashank Dhavala",
      type: "open",
      society: "main",
    },
  ]);

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
        openBalance={transactions[0].amount}
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
};

export default Home;
