const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceSchema = Schema(
  {
    invoice_number: { type: String },
    total_items: Number,
    items: [
      {
        description: {
          type: String,
          require: [true, "Description must not be empty"],
        },
        quantity: {
          type: Number,
          require: [true, "Quantity must not be empty"],
        },
        unit_amount: {
          type: Number,
          require: [true, "Unit amount must not be empty"],
        },
        total: {
          type: Number,
          require: [true, "Total must not be empty"],
        },
      },
    ],
    date: {
      type: Date,
    },
    due_date: {
      type: Date,
    },
    sub_total: { type: String },
    discount: Number,
    tax: Number,
    grand_total: { type: String },
    already_paid: Number,
    amount_due: {
      type: String
    },
    currency: { type: String },
    notes: { type: String },
    invoicer: {
      name: {
        type: String,
        required: [true, "Name must not be empty"],
      },
      email: String,
      address: String,
      mobile: String,
      logo: String,
    },
    customer: {
      name: {
        type: String,
        required: [true, "Name must not be empty"],
      },
      email: String,
      address: String,
      mobile: String,
    },
    user: {
      user_id: { type: String },
      device_info: { type: String },
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("invoices", invoiceSchema);
