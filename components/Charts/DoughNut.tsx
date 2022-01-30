import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

interface Props {
  label: string[];
}

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ label }: Props) {
  const data = {
    labels: label,
    datasets: [
      {
        data: [
          "6000",
          "18000",
          "8000",
          "7000",
          "4000",
          "15000",
          "6000",
          "6000",
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
      }}
      height={400}
      width={400}
    />
  );
}
