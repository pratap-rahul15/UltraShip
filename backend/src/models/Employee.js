// Model definition for Employee using Mongoose ODM.
// This schema includes fields for name, age, class, subjects, attendance, role, flag, and timestamps.
const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  class: { type: String, required: true },
  subjects: { type: [String], required: true },
  attendance: { type: Number, required: true },

  // Indicate if an employee is flagged
  flagged: {                    
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Employee", EmployeeSchema);

