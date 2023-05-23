const express = require("express");
const Employee = require("../controllers/employee");

const router = express.Router();

router.post("/all", Employee.getEmployeesData);
router.post("/add", Employee.addEmployees);

module.exports = router;
