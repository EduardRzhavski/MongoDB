// Create the right routes and use postman to test your work to do the following:

// Create
// 1.	Create a product

// Read
// 1.	Get all products
// 2.	Get a specific product
// 3.	Get products that are active
// 4.	Get products with a specific price range 
// (example min = 50 max = 500)


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Product = require('./models/Product');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json());

// Routes

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
