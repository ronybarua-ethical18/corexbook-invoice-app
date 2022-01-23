const express = require("express");
const router = express.Router();
const {
  createInvoice,
  getInvoices,
  getInvoice,
  updateInvoice,
  deleteInvoice,
} = require("./controllers");

//Create an Invoice
router.post("/", createInvoice);

//get all invoices
router.get("/", getInvoices);

//get single invoice
router.get("/:id", getInvoice);

//update single invoice
router.patch("/:id", updateInvoice);

//delete single invoice
router.delete("/:id", deleteInvoice);

module.exports = router;
