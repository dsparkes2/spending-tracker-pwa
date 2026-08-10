Perfect. That actually makes this one easier because we don't have an older version to worry about.

We're going to create BudgetCategory.js from scratch.

Step 1 — Create the file

In GitHub, go to:

src → models

Click:

Add file → Create new file

Name it exactly:

BudgetCategory.js

Step 2 — Paste this code

Use the plain version below, since that worked better with GitHub for you:

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
