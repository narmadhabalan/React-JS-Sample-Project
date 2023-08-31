import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Content from './Content';
import TransactionTable from './TransactionTable';
import TransactionDetailsPage from './TransactionDetailsPage';
import { dummyTransactionsdata } from './dummyTransactionDatas';

function App() {
  const transactions = dummyTransactionsdata;
  const [isTransactionDetailsPage, setIsTransactionDetailsPage] = useState(false);

  return (
    <Router>
      <div className='App'>
        
        {!isTransactionDetailsPage && (
          <>
            <Content />
            <TransactionTable transactions={transactions} />
          </>
        )}
        <Routes>
          <Route
            path="/transaction-details/:id"
            element={<TransactionDetailsPage setIsTransactionDetailsPage={setIsTransactionDetailsPage} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
