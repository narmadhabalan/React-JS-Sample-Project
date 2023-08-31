import React from 'react';
import { icons } from 'react-icons';
import { FcCurrencyExchange, FcViewDetails } from "react-icons/fc";

const Card = ({ title,icons, content }) => (
  <div className="card">
    
    <h2>{title}</h2>
    <p>{content}</p>
    <div className='icon'>
    {icons}
    </div>
  </div>
);

const App = () => {
  const totalTransactions = 100; // Replace with actual data
  const totalAmount = "$5000"; // Replace with actual data
  const transactionsInThirdState = 30; // Replace with actual data

  return (
    <div className="app">
      <Card title="300K USD" icons={<FcCurrencyExchange />} content={totalTransactions} />
      <Card title="Total Amount" icons={<FcViewDetails />} content={totalAmount} />
      <Card title="Transaction Status" icons={<FcViewDetails />} content={transactionsInThirdState} />
    </div>
  );
};

export default App;
