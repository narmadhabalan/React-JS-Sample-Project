import React from 'react';
import './TransactionTable.css'; // Import your CSS styles
import { dummyTransactionsdata } from './dummyTransactionDatas';
import {US,IN,GB,FR, SA, BA, LI} from 'country-flag-icons/react/3x2'; 
import { IoEllipsisVerticalCircleSharp, IoPencil, IoAdd, IoTrash } from 'react-icons/io5';
import { BsArrowDownUp} from "react-icons/bs";
import { useState,useEffect } from 'react';
import {TransactionDetails} from './TransactionDetails';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TransactionDetailsPage from './TransactionDetailsPage';
import Content from './Content';

const TransactionTable = ({ transactions }) => {
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const navigate = useNavigate();

  // Helper function to get a random flag component
  function getRandomFlagComponent() {
    const flagComponents = [
    US,IN,GB,FR, SA, BA, LI
      // Add more flag components here
    ];
    const randomIndex = Math.floor(Math.random() * flagComponents.length);
    return flagComponents[randomIndex];
  }
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };


  const sortColumn = (columnName) => {
    if (sortedColumn === columnName) {
      setSortDirection(-sortDirection);
    } else {
      setSortedColumn(columnName);
      setSortDirection(1);
    }
  };

  const sortedData = [...dummyTransactionsdata].sort((a, b) => {
    const valueA = a[sortedColumn];
    const valueB = b[sortedColumn];

    if (valueA === undefined) {
      return 1 * sortDirection;
    }

    if (valueB === undefined) {
      return -1 * sortDirection;
    }

    if (sortedColumn === 'amount' || sortedColumn === 'usdEquivalent') {
      return (valueA - valueB) * sortDirection;
    } else {
      return valueA.localeCompare(valueB) * sortDirection;
    }
  });
  
  // const handleRowClick = (transaction) => {
  //   console.log('Clicked transaction:', transaction);
  //   setSelectedTransaction(transaction);
  // };

  // useEffect(() => {
  //   if (selectedTransaction) {
  //     navigate(`/transaction-details/${selectedTransaction.id}`);
  //   }
  // }, [navigate, selectedTransaction]);
  const handleRowClick = (transaction) => {
    console.log('Clicked transaction:', transaction);
    window.location.href = `/transaction-details/${transaction.id}`;
  };


  return (
    <div className="transaction-table">
      <table>
        <thead>
          <tr>
          <th>
              <div onClick={() => sortColumn('transactionDate')} className="column-header">
                <span className="column-name">Transaction Date</span>
                <span className={`sort-icon ${sortedColumn === 'transactionDate' ? (sortDirection === 1 ? '' : 'rotate180') : ''}`}>
                  <BsArrowDownUp />
                </span>
              </div>
            </th>
            <th>
              <div onClick={() => sortColumn('invoiceNumber')} className="column-header">
                <span className="column-name">Invoice Number</span>
                <span className={`sort-icon ${sortedColumn === 'invoiceNumber' ? (sortDirection === 1 ? '' : 'rotate180') : ''}`}>
                  <BsArrowDownUp />
                </span>
              </div>
            </th>
            <th>
              <div onClick={() => sortColumn('payer')} className="column-header">
                <span className="column-name">Payer</span>
                <span className={`sort-icon ${sortedColumn === 'payer' ? (sortDirection === 1 ? '' : 'rotate180') : ''}`}>
                  <BsArrowDownUp />
                </span>
              </div>
            </th>
            <th>
              <div onClick={() => sortColumn('payee')} className="column-header">
                <span className="column-name">Payee</span>
                <span className={`sort-icon ${sortedColumn === 'payee' ? (sortDirection === 1 ? '' : 'rotate180') : ''}`}>
                  <BsArrowDownUp />
                </span>
              </div>
            </th>
            <th>
              <div onClick={() => sortColumn('amount')} className="column-header">
                <span className="column-name">Amount</span>
                <span className={`sort-icon ${sortedColumn === 'Amount' ? (sortDirection === 1 ? '' : 'rotate180') : ''}`}>
                  <BsArrowDownUp />
                </span>
              </div>
            </th>
            <th>
              <div onClick={() => sortColumn('usd equivalent')} className="column-header">
                <span className="column-name">USD Equivalent</span>
                <span className={`sort-icon ${sortedColumn === 'usd equivalent' ? (sortDirection === 1 ? '' : 'rotate180') : ''}`}>
                  <BsArrowDownUp />
                </span>
              </div>
            </th>
            <th>
              <div onClick={() => sortColumn('status')} className="column-header">
                <span className="column-name">Status</span>
                <span className={`sort-icon ${sortedColumn === 'status' ? (sortDirection === 1 ? '' : 'rotate180') : ''}`}>
                  <BsArrowDownUp />
                </span>
              </div>
            </th>
           <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map(transaction => (
            <tr key={transaction.id} onClick={()=>handleRowClick(transaction)}>
              <td>{transaction.transactionDate}</td>
              <td><a href="#">
                  <span style={{ color: 'blue'}}>
                    {transaction.invoiceNumber}
                  </span>
                </a></td>
              <td>
              {React.createElement(getRandomFlagComponent(), {
                size: 10,
                style: { marginRight: '2px', width: '40', height:'30' } 
              })}{/* Display random flag */}
                {transaction.payer}</td>
              <td>
              {React.createElement(getRandomFlagComponent(), {
                size: 10,
                style: { marginRight: '2px', width: '40', height:'30' }
              })}{/* Display random flag */}
                {transaction.payee}</td>
              <td>&#x20B9;{transaction.amount.toLocaleString()}</td>
              <td>${transaction.usdEquivalent.toLocaleString()}</td>
              <td>{transaction.status}</td>
              <td>
                {/* Dropdown with dummy clickable fields */}
                <div className="dropdown"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '80%',
                  }}
                >
                   <IoEllipsisVerticalCircleSharp
                    size={30}
                    color="#D3D3D3"
                    onClick={toggleDropdown}
                  />
                  {showDropdown && (
                    <div className="dropdown-content">
                      <a href="#"><IoPencil /> Edit</a>
                      <a href="#"><IoAdd /> Add</a>
                      <a href="#"><IoTrash /> Delete</a>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {selectedTransaction && <TransactionDetails transaction={selectedTransaction} />} */}
    </div>
    
  );
};

export default TransactionTable;
