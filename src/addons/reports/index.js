const express = require("express");
const router = express.Router();
const {genPOSreceipt}=require("./controllers/index.js")

//receipt
router.post("/pos/:id", genPOSreceipt);

module.exports = router;
