

// Add Item to Cart
router.post('/add', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1; // Increment quantity
    } else {
      cart.items.push({ productId, quantity: 1});
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Item Quantity
router.put('/update', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1); // Remove item if quantity is 0
      } else {
        cart.items[itemIndex].quantity = quantity; // Update quantity
      }
      await cart.save();
      return res.status(200).json(cart);
    }

    res.status(404).json({ message: 'Item not found in cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove Item from Cart
router.delete('/remove', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => !item.productId.equals(productId));
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Cart Details
router.get('/', async (req, res) => {
  const { userId } = req.query;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId', 'name price description imageUrl');
    res.status(200).json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

