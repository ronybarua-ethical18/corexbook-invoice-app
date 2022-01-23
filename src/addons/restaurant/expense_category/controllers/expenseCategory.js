const { ErrorHandler } = require("../../../../helpers/errors");
const ExpenseCategory = require("../models/expenseCategory");

const createExpenseCategory = async (req, res, next) => {
  try {
    const expenseCategory = await ExpenseCategory.create(req.body);
    res.send({
      status: true,
      message: "Expense category created successfully",
      expenseCategory,
    });
  } catch (error) {
    next(error);
  }
};

const getExpensesCategories = async (req, res, next) => {
  try {
    const expenseCategory = await ExpenseCategory.find();
    res.send({
      status: true,
      message: "All expense categories fetched successfully",
      expenseCategory,
    });
  } catch (error) {
    next(error);
  }
};

const getExpensesCategory = async (req, res, next) => {
  try {
    const expenseCategory = await ExpenseCategory.findById(req.params.id);
    if (expenseCategory) {
      res.send({
        status: true,
        message: "Expense category fetched successfully",
        expenseCategory,
      });
    } else {
      throw new ErrorHandler("No records found regarding this id", 404);
    }
  } catch (error) {
    next(error);
  }
};

const updateExpensesCategory = async (req, res, next) => {
  try {
    const expenseCategory = await ExpenseCategory.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (expenseCategory) {
      res.send({
        status: true,
        message: "Expense Category updated successfully",
        expenseCategory,
      });
    } else {
      throw new Error("No record found regarding this id", 404);
    }
  } catch (err) {
    next(err);
  }  
};

const deleteExpensesCategory = async (req, res, next) => {
  try {
    const expenseCategory = await ExpenseCategory.findByIdAndDelete(req.params.id);
    if (expenseCategory) {
      res.send({
        status: true,
        message: "Expense category deleted successfully",
        expenseCategory,
      });
    } else {
      throw new ErrorHandler("No records found regarding this id", 404);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createExpenseCategory,
  getExpensesCategories,
  getExpensesCategory,
  updateExpensesCategory,
  deleteExpensesCategory
};
