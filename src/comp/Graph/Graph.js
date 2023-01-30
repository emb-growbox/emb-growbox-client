import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function Graph({ graphData, labels, label, title, color, scaleY }) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: graphData,
        borderColor: color,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        max: scaleY.max,
        min: scaleY.min,
      },
    },
  };
  return <Line options={options} data={data} />;
}

export default Graph;
