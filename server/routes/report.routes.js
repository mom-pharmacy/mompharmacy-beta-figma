const express = require('express');
const router = express.Router();
const routerController = require("../controllers/report.controllers");

// post,get
router.post('/userIDdetails', routerController.getuserId);
router.post('/repotdetails', routerController.createreport);
router.get('/reportdetails/get', routerController.getreport);

module.exports = router;