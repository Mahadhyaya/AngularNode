const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const { ObjectId } = require('mongodb');


mongoose.connect('mongodb+srv://mhsooryakumar8:sooryaMongo@cluster0.jjuymox.mongodb.net/product', { useNewUrlParser: true, useUnifiedTopology: true });

const ProductSchema = new mongoose.Schema({
  // id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  
});

const Product = mongoose.model('Products', ProductSchema);

app.use(cors());
app.use(express.json());

// Get all products
app.get('/user/getAll', (req, res) => {
  console.log('Requested')
    Product.find({})
    .then((products) => {
      
      // console.log('pro', products)
      res.status(201).json(products);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('An error occurred while querying the database.');
    });
});





// Delete Item

app.delete('/items/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  console.log('itemId', typeof itemId);
  // Product.findById()
  Product.findOneAndDelete({'_id':itemId})
  .then(()=> {
    console.log('Item Deleted')
    res.send(204);
  })
  .catch((eror) => {
    console.log('Error', eror);
    res.status(500).send('An Error Occured')
  })
})

// Update Item

app.put('/items/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  console.log(req.body, 'body');
  console.log('itemId', typeof itemId, itemId);
  // Product.findById()
  const data = req.body;
  Product.findByIdAndUpdate(itemId, {$set:data})
  .then(()=> {
    console.log('Item Updated')
    res.sendStatus(204);
  })
  .catch((eror) => {
    console.log('Error', eror);
    res.status(500).send('An Error Occured')
  })
})

// Create a new product
app.post('/user/create', (req, res) => {
  const product = new Product(req.body);
  console.log(product, 'ps')
  product.save()
  .then((data) => {
    console.log('coming')
    res.status(201).json(data);
  }, (err) => {
      console.log(err);
      res.status(500).send('An error occurred while saving the product to the database.');
      return;    
  })
});


// Start the server
app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
