// routes/laboratoryRoutes.js
const express = require('express');
const router = express.Router();
const laboratoryController = require('../controllers/laboratoryController');

router.post('/', laboratoryController.createLaboratory);
router.get('/', laboratoryController.getAllLaboratories);
router.get('/:id', laboratoryController.getLaboratoryById);
router.put('/:id', laboratoryController.updateLaboratory);
router.delete('/:id', laboratoryController.deleteLaboratory);

module.exports = router;
