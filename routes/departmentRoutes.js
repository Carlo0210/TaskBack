// routes/departmentRoutes.js
const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// Create a new Department
router.post('/', departmentController.createDepartment);

// Read all Departments
router.get('/', departmentController.getAllDepartments);

// Update a Department by ID
router.put('/:id', departmentController.updateDepartment);

// Delete a Department by ID
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;
