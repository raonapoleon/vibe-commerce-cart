import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { cartItems, addToCart, updateQuantity } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  const QuantitySelector = ({ item }) => {
    return (
      <div className="quantity-selector">
        <button
          className="quantity-btn"
          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
        >
          -
        </button>
        <span className="quantity-display">{item.quantity}</span>
        <button
          className="quantity-btn"
          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
        >
          +
        </button>
      </div>
    );
  };

  return (
    <div className="product-list-container">
      <h2>Products</h2>
      <div className="product-list">
        {products.map((product) => {
          const cartItem = cartItems.find(
            (item) => item.productId === product.id
          );

          return (
            <div key={product.id} className="product-item">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>₹{product.price.toFixed(2)}</p>
              </div>
              {cartItem ? (
                <QuantitySelector item={cartItem} />
              ) : (
                <button onClick={() => addToCart(product.id, 1)}>
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;