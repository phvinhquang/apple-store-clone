const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        amount: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
  },
  role: { type: String, required: true },
});

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.findIndex(
    (product) => product.productId.toString() === product._id.toString()
  );
  let newQuantity = 1;
  const updatedCart = [...this.cart];

  if (cartProductIndex >= 0) {
    // Sản phẩm đã có trong cart
    newQuantity = this.cart[cartProductIndex].quantiy + 1;
    updatedCart[cartProductIndex].quantity = newQuantity;
  } else {
    // Nếu sản phẩm chưa có trong cart
    updatedCart.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }

  this.cart = updatedCart;
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
