const express = require("express");
const router = express.Router();

router.use("/invoices", require("../addons/invoices/"));
router.use("/marchants", require("../addons/marchant"));
router.use("/upload", require("../addons/upload"));
router.use("/restaurants", require("../addons/restaurant"));
router.use("/reports", require("../addons/reports"));

module.exports = router;
