const express = require('express');
const router = express.Router();

const products = require('../products');
const CartItem = require('../models/CartItem');

router.get('/products', (req, res) => {
  res.json(products);
});

router.get('/cart', async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    res.json({ cartItems: cartItems, total: total.toFixed(2) });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/cart', async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = products.find((p) => p.id === productId);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    let existingItem = await CartItem.findOne({ productId: productId });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      res.json(existingItem);
    } else {
      const newItem = new CartItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
      });
      await newItem.save();
      res.status(201).json(newItem);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/cart/:id', async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const item = await CartItem.findOneAndDelete({ productId: productId });

    if (!item) {
      return res.status(404).json({ msg: 'Item not in cart' });
    }
    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/cart/item/:productId', async (req, res) => {
  const productId = parseInt(req.params.productId);
  const { quantity } = req.body;

  try {
    if (quantity <= 0) {
      const item = await CartItem.findOneAndDelete({ productId: productId });
      if (!item) {
        return res.status(404).json({ msg: 'Item not in cart' });
      }
      return res.json({ msg: 'Item removed' });
    } else {
      const item = await CartItem.findOneAndUpdate(
        { productId: productId },
        { quantity: quantity },
        { new: true }
      );
      if (!item) {
        return res.status(404).json({ msg: 'Item not in cart' });
      }
      return res.json(item);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/checkout', async (req, res) => {
  const { cartItems, total } = req.body;

  if (!cartItems || cartItems.length === 0 || !total) {
    return res.status(400).json({ msg: 'Cannot checkout with an empty cart' });
  }

  try {
    const receipt = {
      receiptId: `REC-${Date.now()}`,
      total: total,
      itemsPurchased: cartItems.length,
      timestamp: new Date().toISOString(),
    };

    await CartItem.deleteMany({});

    res.json(receipt);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;