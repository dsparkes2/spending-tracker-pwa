
const express = require('express');
const router = express.Router();
const controller = require('../controllers/budgetController');
router.get('/', controller.getBudget);
module.exports = router;
