const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseCategory = Schema(
  {
    title: { type: String, required: [true, "Category title is required"], unique: true, trim: true },
    merchant: { type: mongoose.Types.ObjectId, ref: "marchant" },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("expense_category", expenseCategory);
