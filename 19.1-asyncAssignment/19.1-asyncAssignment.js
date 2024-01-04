// Refactor your products code for using async and await.

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/blog_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  // ... (unchanged)
});

const Product = mongoose.model('Product', productSchema);

app.use(bodyParser.json());

// Create a product
app.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const result = await newProduct.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific product
app.get('/products/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get active products
app.get('/products/active', async (req, res) => {
  try {
    const activeProducts = await Product.find({ isActive: true });
    res.json(activeProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get products within a specific price range
app.get('/products/price-range', async (req, res) => {
  try {
    const { min, max } = req.query;
    const productsInRange = await Product.find({
      'details.price': { $gte: min, $lte: max },
    });
    res.json(productsInRange);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a product
app.put('/products/:productId', async (req, res) => {
  const { isActive, details } = req.body;
  const allowedFields = ['isActive', 'details.discount'];

  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific product
app.delete('/products/:productId', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete all products
app.delete('/products', async (req, res) => {
  try {
    const result = await Product.deleteMany();
    res.json({ message: `${result.deletedCount} products deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
