
const express = require('express');
const router = express.Router();
const controller = require('../controllers/expenseController');
router.get('/', controller.getExpenses);
module.exports = router;
