const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expense = Schema(
  {
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    price: { type: String },
    // createdBy: {
    //   type: String,
    //   trim: true,
    // },
    date: { type: String, default: Date.now()},
    marchant: {
      type: mongoose.Types.ObjectId,
      ref: "marchant",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("expense", expense);
