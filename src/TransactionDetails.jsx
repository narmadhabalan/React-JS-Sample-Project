import React from 'react';

export const TransactionDetails = ({ transaction }) => {
  return (
    <div className="transaction-details">
      <h2>Transaction Details</h2>
      <p>Transaction Date: {transaction.transactionDate}</p>
      <p>Invoice Number: {transaction.invoiceNumber}</p>
      <p>Payer: {transaction.payer}</p>
      <p>Payee: {transaction.payee}</p>
      <p>Amount: {transaction.amount}</p>
      <p>USD Equivalent: {transaction.usdEquivalent}</p>
      <p>Status: {transaction.status}</p>
    </div>
  );
};
