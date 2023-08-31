import React, { useState } from 'react';

export const EditableTransactionForm = ({transaction,transactions,onSave, onCancel, setIsEditMode }) => {
  const [editedTransaction, setEditedTransaction] = useState(transaction);
  const [istransaction, setTransactions] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    onSave(editedTransaction);
  
    const updatedTransactions = transactions.map((t) =>
      t.id === editedTransaction.id ? editedTransaction : t
    );
  
    setTransactions(updatedTransactions);
    setIsEditMode(false);
  };

  return (
    <div>
      {/* Render form fields based on your requirements */}
      <input
        type="text"
        name="transactionDate"
        value={editedTransaction.transactionDate}
        onChange={handleInputChange}
      />
      {/* ... other input fields */}
      <Button onClick={handleSaveClick}>Save</Button>
      <Button onClick={onCancel}>Cancel</Button>
    </div>
  );
};
