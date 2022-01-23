// const { ErrorHandler } = require("../../../../helpers/errors");
const { ErrorHandler } = require("../../../../helpers/errors");
const ExpenseModel = require("../models/expense");
const { groupExpenseByMarchant } = require("../utils");

const createExpense = async (req, res, next) => {
  try {
    const expense = await ExpenseModel.create({
      ...req.body,
      marchant:req.user.marchant
    })

    res.send({
      staus:true,
      expense
    })
   
  
  } catch (error) {
    next(error);
  }
};

const expenseByMarchant = async (req, res, next) => {
  try {
    const expense = await groupExpenseByMarchant();
    res.send({
      status: true,
      message: "All expenses fetched successfully",
      expense,
    });
  } catch (error) {
    next(error);
    console.log(error)
  }
};

const getAllExpense = async (req, res, next) => {
  try {
    let { page } = req.query;
    if (!page) {
      page = 1;
    }

    const size = 5;
    const limit = parseInt(size);
    const skip = (page - 1) * size;
    const total_expense = await ExpenseModel.find();
    const expense = await ExpenseModel.find({marchant:req.user.marchant})
      .populate("marchant", "first_name last_name email company _id")
      .limit(limit)
      .skip(skip);
    res.send({
      status: true,
      message: "Expenses fetched successfully",
      expense,
      total_expense: total_expense.length,
      per_page: size,
    });
  } catch (error) {
    next(error);
  }
};

const getExpense = async (req, res, next) => {
  try {
    const expense = await ExpenseModel.findById(req.params.id);
    if (expense) {
      res.send({
        status: true,
        message: "Expense fetched successfully",
        expense,
      });
    } else {
      throw new ErrorHandler("No records found regarding this id", 404);
    }
  } catch (error) {
    next(error);
  }
};

const updateExpense = async (req, res, next) => {
  try {
    const expense = await ExpenseModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (expense) {
      res.send({
        status: true,
        message: "Expense updated successfully",
        expense,
      });
    } else {
      throw new Error("No record found regarding this id", 404);
    }
  } catch (err) {
    next(err);
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    const expense = await ExpenseModel.findByIdAndDelete(req.params.id);
    if (expense) {
      res.send({
        status: true,
        message: "Expense deleted successfully",
        expense,
      });
    } else {
      throw new ErrorHandler("No records found regarding this id", 404);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createExpense,
  getAllExpense,
  getExpense,
  updateExpense,
  deleteExpense,
  expenseByMarchant,
};
