import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const FundingLineChart = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) return <p>No data available.</p>;

  const yearsSet = new Set();
  const industryYearMap = {};

  data.forEach(entry => {
    const { industry, year, amount } = entry;

    if (!industry || !year || typeof amount !== 'number') {
      console.warn('Skipping invalid entry:', entry);
      return;
    }

    yearsSet.add(year);

    if (!industryYearMap[industry]) industryYearMap[industry] = {};
    if (!industryYearMap[industry][year]) industryYearMap[industry][year] = 0;

    industryYearMap[industry][year] += amount;
  });

  const sortedYears = Array.from(yearsSet).sort();

  const datasets = Object.entries(industryYearMap).map(([industry, yearMap]) => ({
    label: industry,
    data: sortedYears.map(year => yearMap[year] || 0),
    borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
    fill: false,
    tension: 0.3
  }));

  const chartData = {
    labels: sortedYears,
    datasets
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
          callback: value => `$${value.toLocaleString()}`
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default FundingLineChart;
