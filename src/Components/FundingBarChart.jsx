import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const FundingBarChart = ({ data }) => {
  if (!data) return <p>Loading chart...</p>;

  const totalsByYear = data.reduce((acc, curr) => {
    const year = curr.year;
    const amount = curr.amount;

    if (!acc[year]) acc[year] = 0;
    acc[year] += amount;

    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(totalsByYear),
    datasets: [
      {
        label: 'Total Funding',
        data: Object.values(totalsByYear),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default FundingBarChart;
