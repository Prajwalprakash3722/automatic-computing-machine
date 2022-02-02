import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Transaction } from "../../types";
import { parseSociety } from "../../Misc/parseSociety";

interface Props {
  label: string[];
  transactions: Transaction[];
  sid?: number | null;
}

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ label, transactions, sid }: Props) {
  const mainTransactions = transactions.filter(
    (transaction) =>
      transaction.society === "Main" && transaction.type !== "open"
  );

  const computerSocietyTransactions = transactions.filter(
    (transaction) => transaction.society === "Computer Society"
  );
  const communicationSocietyTransactions = transactions.filter(
    (transaction) => transaction.society === "Communication Society"
  );
  const spsTransactions = transactions.filter(
    (transaction) => transaction.society === "SPS"
  );
  const apsTransactions = transactions.filter(
    (transaction) => transaction.society === "APS"
  );
  const sightTransactions = transactions.filter(
    (transaction) => transaction.society === "Sight"
  );
  const wieTransactions = transactions.filter(
    (transaction) => transaction.society === "WIE"
  );
  const rasTransactions = transactions.filter(
    (transaction) => transaction.society === "RAS"
  );

  const mainTotal = mainTransactions.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);

  const computerSocietyTotal = computerSocietyTransactions.reduce(
    (acc, curr) => {
      return acc + curr.amount;
    },
    0
  );

  const communicationSocietyTotal = communicationSocietyTransactions.reduce(
    (acc, curr) => {
      return acc + curr.amount;
    },
    0
  );
  const spsTotal = spsTransactions.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
  const apsTotal = apsTransactions.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
  const sightTotal = sightTransactions.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
  const wieTotal = wieTransactions.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);
  const rasTotal = rasTransactions.reduce((acc, curr) => {
    return acc + curr.amount;
  }, 0);

  const makeSocData = (society: number) => {
    const txs = transactions.filter(
      (transaction) => transaction.society === parseSociety(society)
    );

    return {
      labels: txs.map((tx) => tx.event),
      datasets: [
        {
          data: txs.map((tx) => tx.amount),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 64, 64, 0.2)",
            "rgba(75, 192, 84, 0.2)",
            "rgba(75, 84, 192, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(75, 192, 84, 1)",
            "rgba(75, 84, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const data = {
    labels: label,
    datasets: [
      {
        data: [
          mainTotal,
          computerSocietyTotal,
          communicationSocietyTotal,
          spsTotal,
          apsTotal,
          sightTotal,
          wieTotal,
          rasTotal,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 64, 64, 0.2)",
          "rgba(75, 192, 84, 0.2)",
          "rgba(75, 84, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(75, 192, 84, 1)",
          "rgba(75, 84, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  /**
   * @description Here the societies will be only able to see their transactions
   */

  return (
    <>
      {sid === 1 ? (
        <>
          <h1 className="text-center font-semibold text-xl text-slate-900">
            Amount Spent By Societies
          </h1>
          <Doughnut
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                title: {
                  display: true,
                  text: "Amount Spent By Societies",
                },
              },
            }}
            height={400}
            width={400}
          />
        </>
      ) : (
        <>
          <h1 className="text-center font-semibold text-xl text-slate-900">{`Amount Spent By ${parseSociety(
            sid as number
          )}`}</h1>
          <Doughnut
            data={makeSocData(sid as number)}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                title: {
                  display: true,
                  text: `Amount Spent By ${parseSociety(sid as number)}`,
                },
              },
            }}
            height={400}
            width={400}
          />
        </>
      )}
    </>
  );
}
