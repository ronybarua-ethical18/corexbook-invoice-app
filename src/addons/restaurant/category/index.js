const express = require("express");
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require("./controllers/category");
const router = express.Router();

//category routes
router.post("/category", createCategory);
router.get("/category", getCategories);
router.get("/category/:id", getCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

module.exports = router