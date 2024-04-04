// models/Laboratory.js
const mongoose = require('mongoose');

const laboratorySchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true
  },
  departmentCode: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Laboratory', laboratorySchema);
