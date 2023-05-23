const express = require("express");

const employee = require("./employee");

const router = express.Router();
router.use("/employee", employee);

module.exports = router;
