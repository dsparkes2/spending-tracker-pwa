const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema(
  {
    household: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Household",
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    amount: {
      type: Number,
      required: true,
      min: 0
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    date: {
      type: Date,
      default: Date.now
    },

    notes: {
      type: String,
      trim: true
    },

    receiptImage: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Expense", ExpenseSchema);
