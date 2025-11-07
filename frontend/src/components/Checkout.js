import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [showReceipt, setShowReceipt] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const { name, email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    try {
      const res = await axios.post('/api/checkout', {
        cartItems,
        total: cartTotal,
      });
      setReceipt(res.data);
      setShowReceipt(true);
      clearCart();
      setFormData({ name: '', email: '' });
    } catch (err) {
      console.error('Checkout failed:', err);
      alert('Checkout failed. Please try again.');
    }
  };

  const closeReceipt = () => {
    setShowReceipt(false);
    navigate('/');
  };

  const renderReceiptModal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Thank you for your order, {name}!</h3>
        
        <div className="receipt-info">
          <p>
            <strong>Receipt ID:</strong>
            <span>{receipt.receiptId}</span>
          </p>
          <p>
            <strong>Items:</strong>
            <span>{receipt.itemsPurchased}</span>
          </p>
          <p>
            <strong>Date:</strong>
            <span>{new Date(receipt.timestamp).toLocaleString()}</span>
          </p>
          <p className="receipt-total">
            <strong>Total Paid:</strong>
            <span>₹{parseFloat(receipt.total).toFixed(2)}</span>
          </p>
        </div>

        <button onClick={closeReceipt} style={{marginTop: '20px'}}>Close</button>
      </div>
    </div>
  );

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <button type="submit" disabled={cartItems.length === 0}>
          Pay ₹{cartTotal.toFixed(2)}
        </button>
      </form>
      {showReceipt && receipt && renderReceiptModal()}
    </div>
  );
};

export default Checkout;