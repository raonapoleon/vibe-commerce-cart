import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Vibe Commerce
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/cart" className="nav-links">
              Cart ({totalItems})
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;