// Resolvers for the Employee Management GraphQL API
// Implements queries and mutations with authorization checks
// Mongoose models are used for data access and manipulation.
const Employee = require('./models/Employee');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Helper function to convert Mongoose document to plain object with camelCase id.

const toCamel = doc => {
  if (!doc) return null;
  const { _id, __v, ...rest } = doc.toObject ? doc.toObject() : doc;
  return { id: _id.toString(), ...rest };
};

// Resolvers implementation including Query and Mutation types is defined here.
module.exports = {
  Query: {
    employees: async (_, { page=1, pageSize=10, filter, sortField='createdAt', sortDirection='DESC' }) => {
      const query = {};
      if (filter) {
        if (filter.nameContains) query.name = { $regex: filter.nameContains, $options: 'i' };
        if (typeof filter.minAttendance === 'number') query.attendance = { $gte: filter.minAttendance };
        if (filter.classEquals) query.class = filter.classEquals;
      }

// Build sort object
      const sort = { [sortField]: sortDirection === 'ASC' ? 1 : -1 };
      const total = await Employee.countDocuments(query);
      const items = await Employee.find(query)
        .sort(sort)
        .skip((page-1)*pageSize)
        .limit(pageSize)
        .lean();
// Return paginated result
      return {
        items: items.map(i => ({ id: i._id.toString(), ...i })),
        pageInfo: {
          total,
          page,
          pageSize,
          hasNext: page * pageSize < total
        }
      };
    },

// Fetch single employee by ID
    employee: async (_, { id }) => {
      const emp = await Employee.findById(id);
      return toCamel(emp);
    },

// Fetch current authenticated user
    me: async (_, __, { user }) => {
      if (!user) return null;
      const u = await User.findById(user.id).lean();
      if (!u) return null;
      return { id: u._id.toString(), username: u.username, role: u.role, employeeId: u.employeeId };
    }
  },

// Mutation resolvers for adding, updating, deleting employees and user authentication.
  Mutation: {
    addEmployee: async (_, { input }, { user }) => {
      if (!user || user.role !== 'admin') throw new Error('Not authorized');
      const emp = new Employee(input);
      await emp.save();
      return toCamel(emp);
    },

// Update employee details with authorization checks
    updateEmployee: async (_, { id, input }, { user }) => {
      if (!user) throw new Error('Not authorized');
      // employees can update only their own record (if role employee)
      if (user.role === 'employee' && user.employeeId?.toString() !== id) {
        throw new Error('Not authorized to update this record');
      }
      const updated = await Employee.findByIdAndUpdate(id, input, { new: true });
      return toCamel(updated);
    },

// Delete employee record, only admin allowed
    deleteEmployee: async (_, { id }, { user }) => {
      if (!user || user.role !== 'admin') throw new Error('Not authorized');
      await Employee.findByIdAndDelete(id);
      return true;
    },

    // User signup mutation
    signup: async (_, { username, password, role }) => {
      const existing = await User.findOne({ username });
      if (existing) throw new Error('Username taken');
      const hash = await bcrypt.hash(password, 10);
      const user = new User({ username, passwordHash: hash, role: role || 'employee' });
      await user.save();
      const token = jwt.sign({ id: user._id, role: user.role, employeeId: user.employeeId }, process.env.JWT_SECRET);
      return { token, user: { id: user._id.toString(), username: user.username, role: user.role } };
    },
    
// User login mutation
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error('Invalid credentials');
      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) throw new Error('Invalid credentials');
      const token = jwt.sign({ id: user._id, role: user.role, employeeId: user.employeeId }, process.env.JWT_SECRET);
      return { token, user: { id: user._id.toString(), username: user.username, role: user.role } };
    }
  }
};
