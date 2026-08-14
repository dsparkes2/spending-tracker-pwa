
const express = require('express');
const router = express.Router();
const controller = require('../controllers/budgetController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, controller.getBudget);

module.exports = router;
