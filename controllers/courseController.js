// controllers/courseController.js
const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
  try {
    const { courseTitle, courseType, units } = req.body;

    const existingCourse = await Course.findOne({ courseTitle });
    if (existingCourse) {
      return res.status(400).json({ error: 'Course with the same title already exists' });
    }

    const course = new Course({ courseTitle, courseType, units });
    await course.save();
    res.status(201).json({ message: 'Course created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controllers/courseController.js

exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseTitle, courseType, units } = req.body;

    const existingCourse = await Course.findOne({ courseTitle, _id: { $ne: id } });
    if (existingCourse) {
      return res.status(400).json({ error: 'Course with the same title already exists' });
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, { courseTitle, courseType, units }, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json({ message: 'Course deleted successfully', course: deletedCourse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
