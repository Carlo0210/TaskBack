// controllers/laboratoryController.js
const Laboratory = require('../models/Laboratory');

exports.createLaboratory = async (req, res) => {
  try {
    const laboratory = new Laboratory(req.body);
    await laboratory.save();
    res.status(201).json(laboratory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllLaboratories = async (req, res) => {
  try {
    const laboratories = await Laboratory.find();
    res.json(laboratories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLaboratoryById = async (req, res) => {
  try {
    const laboratory = await Laboratory.findById(req.params.id);
    if (laboratory) {
      res.json(laboratory);
    } else {
      res.status(404).json({ message: 'Laboratory not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateLaboratory = async (req, res) => {
  try {
    const { id } = req.params;
    const laboratory = await Laboratory.findByIdAndUpdate(id, req.body, { new: true });
    if (laboratory) {
      res.json(laboratory);
    } else {
      res.status(404).json({ message: 'Laboratory not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteLaboratory = async (req, res) => {
  try {
    const { id } = req.params;
    const laboratory = await Laboratory.findByIdAndDelete(id);
    if (laboratory) {
      res.json({ message: 'Laboratory deleted' });
    } else {
      res.status(404).json({ message: 'Laboratory not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
