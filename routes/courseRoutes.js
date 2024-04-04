// routes/courseRoutes.js

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.post('/', courseController.createCourse);
router.get('/', courseController.getAllCourses);
router.put('/:id', courseController.updateCourse); // Update endpoint
router.delete('/:id', courseController.deleteCourse); // Delete endpoint

module.exports = router;
