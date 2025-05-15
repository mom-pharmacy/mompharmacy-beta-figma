const Report = require('../models/report.models'); 
const jwt = require("jsonwebtoken");

const getuserId = async (req, res) => {
    try {
        const { userId, report } = req.body;

        const newReport = new Report({

            userId,report,
        });

        await newReport.save();
        res.status(201).json(newReport);
    } catch (error) {
        console.error("Error in getuserId:", error);
        res.status(500).json({ message: 'Server error' });
    }
};


const createreport = async (req, res) => {
    try {
        const { report } = req.body;

        const newReport = new Report({

            report,
        });

        await newReport.save();
        res.status(201).json({newReport});
    } catch (error) {
        console.error("Error in createreport:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getreport = async (req, res) => {
    try {
        const reports = await Report.find().populate("Donar");
        res.status(200).json(reports);
    } catch (error) {
        console.error("Error in getreport:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getuserId, createreport, getreport };