// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  assignedTo: { type: String, required: true }, // Changed to match tableNumber type
  createdBy: { type: String }, // Reference to User model for instructor
  roomName: { type: String, required: true }, // Room name for the task
  departmentCode: { type: String, required: true }, // Department code for the task
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed'], // Define possible values for status
    default: 'pending' // Default value for status
  },
  picture: {
    type: String,
  },
  allottedDateAndTime: {
    type: Date, // Assuming you want to store a date and time
    required: true
  },
  pictureAnswer: {
    type: String,
  },
});

// Middleware to convert string date to Date object before saving
taskSchema.pre('save', function(next) {
  // Assuming the date and time is in Philippines time
  const philippinesTimeOffset = 8 * 60 * 60 * 1000; // Offset for Philippines time (in milliseconds)
  const localDate = new Date(); // Get current date and time in local time
  const philippinesDate = new Date(localDate.getTime() + philippinesTimeOffset); // Convert to Philippines time

  this.allottedDateAndTime = philippinesDate; // Set the allottedDateAndTime field to Philippines time
  next();
});

module.exports = mongoose.model('Task', taskSchema);
