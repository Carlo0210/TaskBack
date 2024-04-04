// models/Department.js
const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  departmentCode: {
    type: String,
    required: true,
    unique: true
  },
  departmentName: {
    type: String,
    required: true
  },
  departmentPhone: {
    type: String,
    required: true
  },
  departmentAddress: {
    type: String,
    required: true
  }
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
