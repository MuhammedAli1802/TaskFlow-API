const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/completed', reportController.getCompletedTasks);
router.get('/pending', reportController.getPendingTasks);
router.get('/summary', reportController.getSystemSummary);

module.exports = router;