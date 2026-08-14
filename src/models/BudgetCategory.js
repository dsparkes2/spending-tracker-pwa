const mongoose = require("mongoose");

const BudgetCategorySchema = new mongoose.Schema(
  {
    budget: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Budget",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    monthlyLimit: {
      type: Number,
      required: true,
      min: 0
    },

    isCustom: {
      type: Boolean,
      default: false
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

BudgetCategorySchema.index(
  { budget: 1, name: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "BudgetCategory",
  BudgetCategorySchema
);
