const mongoose = require("mongoose");

const user_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: [
        "admin",
        "doctor",
        "receptionist",
        "patient",
      ],
      default: "patient",
    },

    subscription_plan: {
      type: String,
      enum: ["free", "pro"],
      default: "free",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "User",
  user_schema
);