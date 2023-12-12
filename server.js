const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Product = require('./models/productModel');
const app = express();
const PORT = 3000;

app.get('/favicon.ico', (req, res) => res.status(204));


app.use(cors()); 
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// Route directly for REST request 
app.post('/product', async (req, res) => {
  try 
  {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  }  
  catch (error) 
  {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
});

// Get all products
app.get('/products', async (req, res) => {
  try 
  {
    const products = await Product.find({});
    res.json(products);
  } 
  catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a single product by ID
app.get('/products/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findById(id);
    
    if (!product){
      return res.status(404).json(
        {message: `Product not found with id ${id}`}
        );
      }

    res.status(200).json(product);   
  } 
  
  catch (error) {
    res.status(500).send(error.message);
  }

});

// Modify
app.put('/products/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product){
      return res.status(404).json(
        {message: `Product not found with id ${id}`}
        );
      }
    
    // to show updates immediately 
    const updatedProduct = await Product.findById(id);

    res.status(200).json(updatedProduct);
  } 
  
  catch (error) {
    res.status(500).send(error.message);
  }

});

// Delete
app.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product){
      return res.status(404).json(
        {message: `Product not found with id ${id}`}
        );
    }
    
    res.json({ message: "Product deleted successfully" });
  } 
  
  catch (error) {
    res.status(500).send(error.message);
  }

});

// Connect to mangoose
mongoose.connect('mongodb+srv://bayanalkhass:<passwords>@bookstoremern-cluster.ho4lgxe.mongodb.net/Node-API')
  .then(() => {
    console.log("successfully connected to MongoDB!");
    app.listen(PORT, () => {
      console.log(`Node API is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });