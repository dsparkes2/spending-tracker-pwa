const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema(
  {
    household: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Household",
      required: true
    },

    year: {
      type: Number,
      required: true
    },

    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12
    },

    status: {
      type: String,
      enum: ["Draft", "Active", "Closed"],
      default: "Draft"
    },

    copiedFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Budget",
      default: null
    }
  },
  {
    timestamps: true
  }
);

BudgetSchema.index(
  { household: 1, year: 1, month: 1 },
  { unique: true }
);

module.exports = mongoose.model("Budget", BudgetSchema);

