import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dummyTransactionsdata } from './dummyTransactionDatas'; // Your data source
import { TransactionDetails } from './TransactionDetails';
import { EditableTransactionForm } from './EditableTransactionForm'; // Your existing TransactionDetails component

const TransactionDetailsPage = ({setIsTransactionDetailsPage}) => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setIsTransactionDetailsPage(true);
    const fetchTransactionDetails = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const fetchedTransaction = dummyTransactionsdata.find(
          (transaction) => transaction.id === parseInt(id)
        );

        if (fetchedTransaction) {
          setTransaction(fetchedTransaction);
        } else {
          console.error('Transaction not found');
        }
      } catch (error) {
        console.error('Error fetching transaction details:', error);
      }
    };

    fetchTransactionDetails();
    return () => {
        setIsTransactionDetailsPage(false); // Set the flag back to false when leaving the details page
      };
    }, [id, setIsTransactionDetailsPage]);

    const handleEditClick = () => {
        setIsEditMode(true);
      };
    
      const handleSaveClick = (updatedTransaction) => {
        // Update the transaction data in the main array
      
        const updatedTransactions = dummyTransactionsdata.map((t) =>
          t.id === updatedTransaction.id ? updatedTransaction : t
        );
      
        // Replace dummyTransactionsdata with updatedTransactions in your data source
      
        setTransaction(updatedTransactions); // Update the currently displayed transaction
        setIsEditMode(false);
      };
      
    
      const handleCancelClick = () => {
        setIsEditMode(false);
      };

      return (
        <div className="transaction-details-page">
          {transaction ? (
            <div>
              {isEditMode ? (
                <EditableTransactionForm
                    transaction={transaction} // Pass the transaction data here
                    onSave={handleSaveClick}
                    onCancel={handleCancelClick}
                    transactions={dummyTransactionsdata} // Pass the transactions array here
                    setIsEditMode={setIsEditMode} // Pass the setIsEditMode function here
                />

              ) : (
                <div>
                  <TransactionDetails transaction={transaction} />
                  <Button onClick={handleEditClick}>Edit</Button>
                </div>
              )}
            </div>
          ) : (
            <p>Loading transaction details...</p>
          )}
        </div>
      );
    };

export default TransactionDetailsPage;
