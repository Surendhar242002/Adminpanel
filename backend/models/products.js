const mongoose = require('mongoose')
// structure formation or mongoose schema
 const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      trim: true,
      required: [true, "Product name is required"],
      minlength: [2, "Product name must be at least 2 characters"]
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"]
    },

    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0
    },

    category: {
      type: String,
      trim: true,
      required: [true, "Category is required"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Product", productSchema); // sending data from one to the another file => interact with the database 