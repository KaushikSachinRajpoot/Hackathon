import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  sizes: [String],
  category: String,
  inStock: Boolean,
});

const Product = mongoose.model("Product", productSchema);
export default Product;
