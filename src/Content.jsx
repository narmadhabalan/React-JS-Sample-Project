import React from 'react';

const Card = ({ title, content }) => (
  <div className="card">
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
);

const App = () => {
  const totalTransactions = 100; // Replace with actual data
  const totalAmount = "$5000"; // Replace with actual data
  const transactionsInThirdState = 30; // Replace with actual data

  return (
    <div className="app">
      <Card title="300K USD" content={totalTransactions} />
      <Card title="Total Amount"  content={totalAmount} 
      />
      <Card title="Transaction Status" content={transactionsInThirdState} />
    </div>
  );
};

export default App;
