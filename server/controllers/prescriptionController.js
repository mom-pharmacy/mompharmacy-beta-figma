
const Prescription = require('../models/Prescription');
const fs = require('fs');
const path = require('path');
exports.addPrescription = async (req, res) => {
    try {
        const { userId } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        if (!userId || !imageUrl) {
            return res.status(400).json({ message: 'User ID and image are required' });
        }

        const newPrescription = new Prescription({ userId, imageUrl });
        await newPrescription.save();
        res.status(201).json(newPrescription);
    } catch (err) {
        res.status(500).json({ message: 'Error uploading prescription', error: err.message });
    }
};


exports.deletePrescription = async (req, res) => {
    try {
        const { id } = req.params;
        const prescription = await Prescription.findById(id);
        
        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        const filePath = path.join(__dirname, '..', prescription.imageUrl);
        fs.unlink(filePath, (err) => {
            if (err) console.error('Error deleting file:', err);
        });

        await Prescription.findByIdAndDelete(id);
        res.status(200).json({ message: 'Prescription deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting prescription', error: err.message });
    }

};

exports.getPrescriptionById = async (req, res) => {
    try {
        const { id } = req.params;
        const prescription = await Prescription.findById(id);

        if (!prescription) {
            return res.status(404).json({ message: 'Prescription not found' });
        }

        res.status(200).json(prescription);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching prescription', error: err.message });
    }
};

exports.getAllPrescriptions = async (req, res) => {
    try {
        const { userId } = req.query;
        const filter = userId ? { userId } : {};

        const prescriptions = await Prescription.find(filter);
        res.status(200).json(prescriptions);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching prescriptions', error: err.message });
    }
};