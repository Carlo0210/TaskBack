// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseTitle: {
    type: String,
    required: true
  },
  courseType: {
    type: String,
    required: true
  },
  units: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Course', courseSchema);
