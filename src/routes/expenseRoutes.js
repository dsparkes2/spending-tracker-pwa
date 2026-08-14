
const express = require('express');
const router = express.Router();
const controller = require('../controllers/expenseController');
const authMiddleware = require('../middleware/authMiddleware');
router.get('/', authMiddleware, controller.getExpenses);
module.exports = router;
