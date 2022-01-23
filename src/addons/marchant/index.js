const express = require("express");
const router = express.Router();
const { createMarchant,verifyMarchant } = require("./controllers");

//Create an Invoice
// router.post("/", createMarchant);
// router.put("/verify/:token", verifyMarchant);


module.exports = router;
