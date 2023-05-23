const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please provide employee name"],
  },
  position: {
    type: String,
    require: [true, "Employee position is required"],
  },
  office: {
    type: String,
    require: [true, "Please mention employee office"],
  },
  age: {
    type: Number,
    require: [true, "Employee age is required"],
  },
  start_date: {
    type: Date,
    require: [true, "Please give employee start date."],
  },
  salary: {
    type: Number,
    require: [true, "Employee salary is required"],
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
