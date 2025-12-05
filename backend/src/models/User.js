// Model definition for User using Mongoose ODM.
const mongoose = require('mongoose');

// Schema for User with username, passwordHash, role, and optional reference to Employee.
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String,
  role: { type: String, enum: ['employee', 'admin'], default: 'employee' },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' } 
});

module.exports = mongoose.model('User', UserSchema);
