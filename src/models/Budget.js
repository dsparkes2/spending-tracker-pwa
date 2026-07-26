
const mongoose = require('mongoose');
const BudgetSchema = new mongoose.Schema({
    totalBudget: Number,
    spentAmount: Number,
    sharedUsers: Array
});
module.exports = mongoose.model('Budget', BudgetSchema);
