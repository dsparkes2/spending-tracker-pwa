const Expense = require("../models/Expense");

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find()
      .populate("user")
      .populate("household")
      .populate("budget")
      .populate("budgetCategory")
      .sort({ date: -1 });

    res.render("expenses", { expenses });
  } catch (error) {
    console.error("Error loading expenses:", error);
    res.status(500).send("Unable to load expenses.");
  }
};
