const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoryModel = Schema(
  {
    title: { type: String, required: [true, "Category name is required"], unique: true },
    merchant: { type: mongoose.Types.ObjectId, ref: "marchant" },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("category", categoryModel);
