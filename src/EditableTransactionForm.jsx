import React, { useState } from 'react';
import { Button, Form} from 'react-bootstrap';

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
      <Form>
        <Form.Group controlId="transactionDate">
          <Form.Label>Transaction Date</Form.Label>
          <Form.Control
            type="text"
            name="transactionDate"
            value={editedTransaction.transactionDate}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="invoiceNumber">
          <Form.Label>Invoice Number</Form.Label>
          <Form.Control
            type="text"
            name="invoiceNumber"
            value={editedTransaction.invoiceNumber}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="payer">
          <Form.Label>Payer</Form.Label>
          <Form.Control
            type="text"
            name="payer"
            value={editedTransaction.payer}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="payee">
          <Form.Label>Payee</Form.Label>
          <Form.Control
            type="text"
            name="payee"
            value={editedTransaction.payee}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="text"
            name="amount"
            value={editedTransaction.amount}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="amount">
          <Form.Label>USD Equivalent</Form.Label>
          <Form.Control
            type="text"
            name="usdEquivalent"
            value={editedTransaction.usdEquivalent}
            onChange={handleInputChange}
          />
        </Form.Group>
      </Form>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="primary" onClick={handleSaveClick}>
          Save
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
