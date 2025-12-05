// Model definition for Employee using Mongoose ODM.
// This schema includes fields for name, age, class, subjects, attendance, role, flag, and timestamps.
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, index: true },
  age: Number,
  class: String,
  subjects: [String],
  attendance: { type: Number, default: 0 }, 
  role: { type: String, enum: ['employee', 'admin'], default: 'employee' },
  flag: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Index for sorting & filtering
EmployeeSchema.index({ attendance: -1, age: 1 });

module.exports = mongoose.model('Employee', EmployeeSchema);
