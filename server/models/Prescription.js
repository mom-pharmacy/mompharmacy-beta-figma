
const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);
