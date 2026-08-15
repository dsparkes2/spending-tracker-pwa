const Expense = require("../models/Expense");
const User = require("../models/User");
exports.getExpenses = async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.redirect("/auth/login");
    }

    if (!user.household) {
      return res.send("Your account is not connected to a household yet.");
    }

    const expenses = await Expense.find({
      household: user.household
    })
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
