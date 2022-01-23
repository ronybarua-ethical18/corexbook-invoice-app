const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema(
  {
    items: [
      
    ],
    total: { type: Number, trim: true },
    discount: { type: Number, trim: true, default:0 },
    sub_total: { type: Number, trim: true, default: 0 }, 
    tax: { type: Number, trim: true, default:0  },
    createdBy: { type: String, trim: true },
    phone: { type: String, trim: true },
    delivery_method: { type: String, trim: true },
    total_items: { type: Number, default:0 },
    marchant: { type: mongoose.Types.ObjectId, ref: "marchant" },
  },
  {
    timestamps:true
  }
);
module.exports = mongoose.model("order", orderSchema);
