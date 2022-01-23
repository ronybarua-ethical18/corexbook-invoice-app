// const { ErrorHandler } = require("../../../../helpers/errors");
const { ErrorHandler } = require("../../../../helpers/errors");
const CategoryModel = require("../models/category");

const createCategory = async (req, res, next) => {
  try {
    const category = await CategoryModel.create(req.body);
    res.send({
      status: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const category = await CategoryModel.find()
    res.send({
      status: true,
      message: "categories fetched successfully",
      category,
    });
  } catch (err) {
    next(err);
  }
};
const getCategory = async (req, res, next) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (category) {
      res.send({
        status: true,
        message: "Category fetched successfully",
        category,
      });
    } else {
      throw new ErrorHandler("No records found regarding this id", 404);
    }
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (category) {
      res.send({
        status: true,
        message: "Category updated successfully",
        category,
      });
    } else {
      throw new Error("No record found regarding this id", 404);
    }
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await CategoryModel.findByIdAndDelete(req.params.id);
    if (category) {
      res.send({
        status: true,
        message: "Category deleted successfully",
        category,
      });
    } else {
      throw new ErrorHandler("No records found regarding this id", 404);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { createCategory, getCategories, getCategory, updateCategory, deleteCategory };
