import React, { useEffect, useState } from 'react';
import FundingBarChart from './FundingBarChart';
import FundingLineChart from './FundingLineChart';

const FundingLoader = () => {
  const [fundingData, setFundingData] = useState(null);

  useEffect(() => {
    fetch('/funding.json')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(setFundingData)
      .catch(err => console.error('Error loading data:', err));
  }, []);

  return (
    <div>
      <h1>Funding Data</h1>
      <FundingBarChart data={fundingData} />
      <FundingLineChart data={fundingData} />
    </div>
  );
};

export default FundingLoader;
