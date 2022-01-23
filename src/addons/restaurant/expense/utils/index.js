const Expense = require("../models/expense")
const groupExpenseByMarchant = async () => {
  const expenses = await Expense.aggregate([
    {
      $lookup: {
        from: "marchants",
        localField: "marchant",
        foreignField: "_id",
        as: "marchant",
      },
    },
    {
      $unwind: "$marchant",
    },
    {
      $group: {
        _id: "$marchant._id",
        marchant: {
          $first: "$marchant.email",
        },
        expense: {
          $push: {
            _id: "$_id",
            category: "$category",
            price: "$price",
            date: "$date",
          },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
 console.log(expenses)
  return expenses;
};

module.exports = { groupExpenseByMarchant };
