import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Transaction } from "../../types";

interface Props {
  label: string[];
  transactions: Transaction[];
}

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ label, transactions }: Props) {
  const mainTransactions = transactions.filter(
    (transaction) =>
      transaction.society === "main" && transaction.type !== "open"
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

  return (
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
  );
}
