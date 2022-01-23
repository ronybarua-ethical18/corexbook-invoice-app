const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuModel = Schema(
  {
    title: {
      type: String,
      required: [true, "Title name is required"],
      trim: true,
    },
    price: { type: Number, required: [true, "Price is required"], trim: true },
    category: { type: mongoose.Types.ObjectId, ref: "category" },
    logo: {
      type: String,
      default: "http://localhost:8000/uploads/logo-1641384621274.jpg",
    },
    marchant: { type: mongoose.Types.ObjectId, ref: "marchant" },
    variation: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("menu", menuModel);
