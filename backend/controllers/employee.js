const error = require("../utils/error");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Employee = require("../models/employee");

const getEmployeesData = catchAsyncErrors(async (req, res, next) => {
  const { page, resPerPage, sortBy, order, search } = req.body;

  if (!(page || resPerPage)) {
    return error(res, next, "Page and results per page are required");
  }

  let employees;
  const searchQuery = {
    $or: [
      { name: { $regex: search, $options: "i" } },
      { position: { $regex: search, $options: "i" } },
      { office: { $regex: search, $options: "i" } },
    ],
  };

  if (sortBy) {
    employees = await Employee.find(searchQuery)
      .sort({
        [sortBy]: order,
      })
      .skip((page - 1) * resPerPage)
      .limit(resPerPage);
  } else {
    employees = await Employee.find(searchQuery)
      .skip((page - 1) * resPerPage)
      .limit(resPerPage);
  }

  const totalEmployees = await Employee.countDocuments();
  const count = await Employee.countDocuments(searchQuery);

  res.status(200).json({
    success: true,
    data: {
      employees,
      page,
      resPerPage,
      count,
      totalEmployees,
    },
  });
});

const addEmployees = catchAsyncErrors(async (req, res, next) => {
  const { employees } = req.body;

  if (!employees || employees.length === 0) {
    return error(res, next, "Add atleast one employee");
  }

  for (let i = 0; i < employees.length; ++i) {
    await Employee.create(employees[i]);
  }

  res.status(201).json({
    success: true,
  });
});

module.exports = {
  getEmployeesData,
  addEmployees,
};
