
const Budget = require('../models/Budget');
exports.getBudget = async (req, res) => {
    const budget = await Budget.findOne();
    res.render('budget', { budget });
};
