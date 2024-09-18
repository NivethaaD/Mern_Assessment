const express = require('express');
const router = express.Router();
const Employee = require('../models/employeeModel');

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get an employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new employee
const createEmployee = async (req, res) => {
  try {
    console.log(req.body);
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Error creating employee:', error); // Log the error for debugging
    res.status(400).json({
      error: 'Bad request',
      details: error.message, // Include detailed error message
      stack: error.stack // Optional: Include stack trace for more details
    });
  }
};


// Update an employee by ID
const updateEmployeeById = async (req, res) => {
  try {
    console.log(req.body)
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ error: 'Bad request', details: error.message });
  }
};

// Delete an employee by ID
const deleteEmployeeById = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Define routes using the functions
router.get('/getAllEmployees', getAllEmployees); // Get all employees
router.get('/getEmployee/:id', getEmployeeById); // Get employee by ID
router.post('/employeesNew', createEmployee); // Create a new employee
router.put('/employees/update/:id', updateEmployeeById); // Update employee by ID
router.delete('/employees/delete/:id', deleteEmployeeById); // Delete employee by ID

module.exports = router;
