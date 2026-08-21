const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/completed', reportController.getCompletedCounts);
router.get('/pending', reportController.getPendingCounts);
router.get('/total', reportController.getTotalCounts);
router.get('/summary', reportController.getSystemSummary);
router.get('/high-priority', reportController.getHighPriorityCounts);
router.get('/in-progress', reportController.getInProgressCounts);

module.exports = router;