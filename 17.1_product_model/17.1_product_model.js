// Let’s create a mongoose product model with validation for an e-commerce site.
// The product should have the following:
// name, a string, which is required and should be unique.
// category, a string, which is required.
// isActive, a boolean.
// details, which is an embedded object that includes:
// a description, a string, which is required and has to be at least 10 letters in length.
// Price, is a number, which is required and has to be a positive value,
// discount, is a number, which is not required but the default is 0 if not inputted.
// an array of images which must include at least two images
// a phone number which is required and has to be a valid Israeli phone number.
// DateAdded, which by default gives the current date

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    details: {
        description: {
            type: String,
            required: true,
            minlength: 10,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        discount: {
            type: Number,
            default: 0,
        },
    },
    images: {
        type: [{
            type: String,
            validate: {
                validator: function (v) {
                    return v.length >= 2;
                },
                message: 'Product must have at least two images.',
            },
        }],
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(\+972|0)(-)?(([23489]{1}\d{7})|[5]{1}\d{8})$/.test(v);
            },
            message: 'Please enter a valid Israeli phone number.',
        },
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

// Add at least 3 products to your database.

const mongoose = require('mongoose');
const Product = require('./models/Product'); 

// Connection URI
const uri = 'mongodb://localhost:27017/blog_database'; 

// Connect to the MongoDB server
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Create three products
    const productsData = [
      {
        name: 'Product 1',
        category: 'Electronics',
        isActive: true,
        details: {
          description: 'This is a great product.',
          price: 299.99,
          discount: 10,
        },
        images: ['image1.jpg', 'image2.jpg'],
        phoneNumber: '+972-123456789',
      },
      {
        name: 'Product 2',
        category: 'Clothing',
        isActive: true,
        details: {
          description: 'High-quality clothing item.',
          price: 49.99,
        },
        images: ['image3.jpg', 'image4.jpg'],
        phoneNumber: '+972-987654321',
      },
      {
        name: 'Product 3',
        category: 'Home Decor',
        isActive: false,
        details: {
          description: 'Beautiful home decor piece.',
          price: 79.99,
        },
        images: ['image5.jpg', 'image6.jpg'],
        phoneNumber: '+972-555555555',
      },
    ];

    // Insert products into database
    Product.insertMany(productsData)
      .then((result) => {
        console.log(`${result.length} products inserted.`);
      })
      .catch((err) => {
        console.error('Error inserting products:', err);
      })
      .finally(() => {
        // Close the connection when done
        mongoose.disconnect();
      });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
