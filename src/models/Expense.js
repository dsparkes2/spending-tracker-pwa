
const mongoose = require('mongoose');
const ExpenseSchema = new mongoose.Schema({
    amount: Number,
    category: String,
    date: Date,
    notes: String,
    user: String,
    receiptImage: String
});
module.exports = mongoose.model('Expense', ExpenseSchema);
