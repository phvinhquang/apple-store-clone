const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    orderer: {
      fullname: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    products: {
      items: [
        {
          _id: false,
          productId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Product",
          },
          name: { type: String, required: true },
          amount: { type: Number, required: true },
        },
      ],
      totalAmount: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
