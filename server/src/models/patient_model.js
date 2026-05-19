const mongoose = require("mongoose");

const patient_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    contact: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      default: "",
    },

    blood_group: {
      type: String,
      default: "",
    },

    allergies: {
      type: [String],
      default: [],
    },

    medical_conditions: {
      type: [String],
      default: [],
    },

    emergency_contact: {
      type: String,
      default: "",
    },

    profile_image: {
      type: String,
      default: "",
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Patient", patient_schema);
