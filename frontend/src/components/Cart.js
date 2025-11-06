import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } =
    useContext(CartContext);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/">Go shopping!</Link>
        </p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.productId} className="cart-item">
              <div>
                <strong>{item.name}</strong>
                <br />
                <small>
                  ₹{item.price.toFixed(2)} x {item.quantity}
                </small>
              </div>
              <div className="cart-item-controls">
                <div className="quantity-selector">
                  <button
                    className="quantity-btn"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.productId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ₹{cartTotal.toFixed(2)}</h3>
          </div>
          <div className="cart-actions">
            <Link to="/checkout">
              <button disabled={cartItems.length === 0}>
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;