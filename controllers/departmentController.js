// controllers/departmentController.js
const Department = require('../models/Department');

exports.createDepartment = async (req, res) => {
  try {
    const { departmentName, departmentPhone, departmentAddress } = req.body;
    
    // Find the last department to determine the next department code
    const lastDepartment = await Department.findOne().sort({ departmentCode: -1 });
    let nextDepartmentCode = 'D01'; // Default starting code
    if (lastDepartment) {
      // Extract the numeric part of the last department code and increment it
      const lastDepartmentCodeNumeric = parseInt(lastDepartment.departmentCode.slice(1));
      nextDepartmentCode = 'D' + ('0' + (lastDepartmentCodeNumeric + 1)).slice(-2); // Increment the numeric part and ensure it's two digits
    }

    const newDepartment = new Department({ departmentCode: nextDepartmentCode, departmentName, departmentPhone, departmentAddress });
    await newDepartment.save();
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    if (!departments || departments.length === 0) {
      return res.status(404).json({ message: 'No departments found' });
    }
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update Department by ID
// controllers/departmentController.js
// Update Department by ID
exports.updateDepartment = async (req, res) => {
  try {
    const { id } = req.params; // Ensure that the correct parameter name is used here
    const { departmentCode, departmentName, departmentPhone, departmentAddress } = req.body;

    const existingDepartment = await Department.findOne({ departmentCode, _id: { $ne: id } });
    if (existingDepartment) {
      return res.status(400).json({ message: 'Another department with this code already exists' });
    }

    const updatedDepartment = await Department.findByIdAndUpdate(id, { departmentCode, departmentName, departmentPhone, departmentAddress }, { new: true });
    if (!updatedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.json(updatedDepartment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete Department by ID
exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDepartment = await Department.findByIdAndDelete(id);
    if (!deletedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
