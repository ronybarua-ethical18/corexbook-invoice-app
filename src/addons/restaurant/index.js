const express = require("express");
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("./category/controllers/category");
const router = express.Router();
const {
  createMenu,
  getMenu,
  deleteMenu,
  getAllMenu,
  updateMenu,
  menuByMarchant,
} = require("./menu/controllers/menu");
const {
  createExpense,
  getAllExpense,
  getExpense,
  updateExpense,
  deleteExpense,
  expenseByMarchant,
} = require("./expense/controllers/expense");
const {
  createExpenseCategory,
  getExpensesCategories,
  getExpensesCategory,
  updateExpensesCategory,
  deleteExpensesCategory,
} = require("./expense_category/controllers/expenseCategory");
const {
  createOrder,
  getOrders,
  menuByCategory,
  getOrder,
  deleteOrder,
  updateOrder,
} = require("./order/controllers/order");
const { signup, verifyEmail, login } = require("./auth/controllers/auth");
const { verifyMarchant, verifyToken } = require("./auth/middlewares/verify");
const { addUser, getUsers, userByMarchant } = require("./auth/controllers/user");
const { getMarchants } = require("./auth/controllers/marchant");

// auth route
router.post('/auth/signup', signup)
router.post('/auth/verify-email', verifyEmail)
router.post('/auth/login', verifyMarchant, login)

// user route
router.post('/auth/user', addUser)
router.get('/auth/user', getUsers)
router.get('/auth/user/marchant', userByMarchant)

// marchant routes
router.get('/marchant', getMarchants)


//category routes
router.post("/category", createCategory);
router.get("/category", getCategories);
router.get("/category/:id", getCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

//expense category routes
router.post("/expense_category", createExpenseCategory);
router.get("/expense_category", getExpensesCategories);
router.get("/expense_category/:id", getExpensesCategory);
router.put("/expense_category/:id", updateExpensesCategory);
router.delete("/expense_category/:id", deleteExpensesCategory);

//menu routes
router.post("/menu", createMenu);
router.get("/menu", getAllMenu);
router.get("/menu/:id", getMenu);
router.put("/menu/:id", updateMenu);
router.delete("/menu/:id", deleteMenu);

// menu by marchant
router.get('/menu/marchant', menuByMarchant)

//expense routes
router.post("/expense",verifyToken, createExpense);
router.get("/expense",verifyToken, getAllExpense);
router.get("/expense/:id", getExpense);
router.put("/expense/:id", updateExpense);
router.delete("/expense/:id", deleteExpense);

// expense by marchant
router.get('/expense/marchant', expenseByMarchant)

//order routes
router.post("/order", createOrder);
router.get("/order", getOrders);
router.get("/order/menu", menuByCategory);
router.get("/order/:id", getOrder);
router.put("/order/:id", updateOrder);
router.delete("/order/:id", deleteOrder);

module.exports = router;
