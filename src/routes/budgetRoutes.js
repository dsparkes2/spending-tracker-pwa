
const express = require('express');
const router = express.Router();
const controller = require('../controllers/budgetController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, controller.getBudget);
router.get('/new', authMiddleware, controller.newBudgetPage);
router.get('/categories', authMiddleware, controller.budgetCategoriesPage);
module.exports = router;
