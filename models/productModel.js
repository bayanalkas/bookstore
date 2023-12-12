const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the book name."]
      },
      
      author: {
        type: String,
      },

      quantity:{
        type: Number,
        required: true,
        default: 0,
      },
        
      price:{
        type: Number,
      },

      image:{
        type: String,
        required: false,
      },

      inStock: {
        type: Boolean
      }
    },

      {
        timestamps: true
      }
      
  );


const Product = mongoose.model('Product', productSchema);
module.exports = Product;