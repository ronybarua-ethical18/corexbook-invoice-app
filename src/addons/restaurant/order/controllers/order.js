const OrderModel = require("../models/order");
const { ErrorHandler } = require("../../../../helpers/errors");
const { groupByCategory } = require("../../utils");

const { PDFReceiptStream } = require("../../../reports/utils/post_receipt");

const createOrder = async (req, res, next) => {
  try {
    const order = await OrderModel.create(req.body);

    const pdfStream = await PDFReceiptStream({}, order);

    res
      .writeHead(200, {
        "Content-Length": Buffer.byteLength(pdfStream),
        "Content-Type": "application/pdf",
        "Content-disposition": "attachment;filename=test.pdf",
      })
      .end(pdfStream);
  } catch (error) {
    next(error);
  }
};

const menuByCategory = async (req, res, next) => {
  try {
    const menu = await groupByCategory("common");
    res.send({
      status: true,
      message: "All menu fetched successfully",
      menu,
    });
  } catch (err) {
    next(err);
  }
};

const getOrders = async (req, res, next) => {
  try {
    let { page } = req.query;
    if (!page) {
      page = 1;
    }
    let size = 5;

    const limit = parseInt(size);
    const skip = (page - 1) * size;
    const totalOrders = await OrderModel.find();
    const order = await OrderModel.find().limit(limit).skip(skip);

    res.send({
      status: true,
      message: "Orders fetched successfully",
      order,
      total_order: totalOrders.length,
      per_page: size,
    });
  } catch (error) {
    next(error);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (order) {
      res.send({
        status: true,
        message: "Order fetched successfully",
        order,
      });
    } else {
      throw new ErrorHandler("No records found regarding this is", 404);
    }
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const updateOrder = await OrderModel.findByIdAndUpdate(req.params.id, req.body);
    const pdfStream = await PDFReceiptStream({}, updateOrder);
    res
      .writeHead(200, {
        "Content-Length": Buffer.byteLength(pdfStream),
        "Content-Type": "application/pdf",
        "Content-disposition": "attachment;filename=test.pdf",
      })
      .end(pdfStream);
  } catch (err) {
    next(err);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const order = await OrderModel.findByIdAndDelete(req.params.id);
    if (order) {
      res.send({
        status: true,
        message: "Order deleted successfully",
        order,
      });
    } else {
      throw new ErrorHandler("No records found regarding this is", 404);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  menuByCategory,
};
