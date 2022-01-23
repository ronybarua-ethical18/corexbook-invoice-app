const InvoiceModel = require("../models/inventory");
const { ErrorHandler } = require("../../../helpers/");

const createInvoice = async (req, res, next) => {
  try {
    const invoice = await InvoiceModel.create(req.body);
    if (req.body !== "") {
      invoice.save();
      res.send({
        status: true,
        message: "Invoice created successfully",
        invoice,
      });
    } else {
      throw new ErrorHandler("Something went wrong in client side", 400);
    }
  } catch (err) {
    next(err);
  }
};

//get all invoicces
const getInvoices = async (req, res, next) => {
  try {
    const invoice = await InvoiceModel.find();
    res.send({
      status: true,
      message: "Invoices fetched successfully",
      invoice,
    });
  } catch (err) {
    next(err);
  }
};

//get single invoice by id
const getInvoice = async (req, res, next) => {
  try {
    const invoice = await InvoiceModel.findById(req.params.id);
    if (invoice) {
      res.send({
        status: true,
        message: "Invoice fetched successfully",
        invoice,
      });
    } else {
      throw new Error("No record found regarding this id", 400);
    }
  } catch (err) {
    next(err);
  }
};

//update single invoice by id
const updateInvoice = async (req, res, next) => {
  try {
    const invoice = await InvoiceModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (invoice) {
      res.send({
        status: true,
        message: "Invoice updated successfully",
        invoice,
      });
    } else {
      throw new Error("No record found regarding this id", 400);
    }
  } catch (err) {
    next(err);
  }
};

//delete single invoice by id
const deleteInvoice = async (req, res, next) => {
  try {
    const invoice = await InvoiceModel.findByIdAndDelete(req.params.id);
    if (invoice) {
      res.send({
        status: true,
        message: "Invoice deleted successfully",
        invoice,
      });
    } else {
      throw new Error("No record found regarding this id", 400);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createInvoice,
  getInvoices,
  getInvoice,
  updateInvoice,
  deleteInvoice,
};
