import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dummyTransactionsdata } from './dummyTransactionDatas'; 
import { TransactionDetails } from './TransactionDetails';
import { EditableTransactionForm } from './EditableTransactionForm'; 
import { Button, ButtonGroup} from 'react-bootstrap';

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
        setIsTransactionDetailsPage(false); 
      };
    }, [id, setIsTransactionDetailsPage]);

    const handleEditClick = () => {
        setIsEditMode(true);
      };
    
      const handleSaveClick = (updatedTransaction) => {
      
        const updatedTransactions = dummyTransactionsdata.map((t) =>
          t.id === updatedTransaction.id ? updatedTransaction : t
        );
      
        setTransaction(updatedTransactions); 
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
                    transaction={transaction} 
                    onSave={handleSaveClick}
                    onCancel={handleCancelClick}
                    transactions={dummyTransactionsdata} 
                    setIsEditMode={setIsEditMode} 
                />

              ) : (
                <div>
                  <TransactionDetails transaction={transaction} />
                  <ButtonGroup>
                  <Button onClick={handleEditClick}>Edit</Button>
                  </ButtonGroup>
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
