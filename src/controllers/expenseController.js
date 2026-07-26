
const Expense = require('../models/Expense');
exports.getExpenses = async (req, res) => {
    const expenses = await Expense.find();
    res.render('expenses', { expenses });
};
