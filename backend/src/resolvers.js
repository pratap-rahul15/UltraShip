// Resolvers for the Employee Management GraphQL API
// Implements queries and mutations with authorization checks
// Mongoose models are used for data access and manipulation.
const Employee = require("./models/Employee");

const resolvers = {
  Query: {
    // Fetch paginated, searchable employees
    employees: async (_, { page = 1, pageSize = 10, search = "" }, { user }) => {
      if (!user) throw new Error("Unauthorized");

      const query = {};

      // Employees can ONLY see themselves
      if (user.role === "employee") {
        query._id = user.employeeId;
      }

      // Search by name, class, subject
      if (search.trim() !== "") {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { class: { $regex: search, $options: "i" } },
          { subjects: { $regex: search, $options: "i" } },
        ];
      }

      const skip = (page - 1) * pageSize;

      const [employees, total] = await Promise.all([
        Employee.find(query).skip(skip).limit(pageSize),
        Employee.countDocuments(query),
      ]);

      return {
        data: employees,
        page,
        pageSize,
        total,
      };
    },

    // Fetch single employee
    employee: async (_, { id }, { user }) => {
      if (!user) throw new Error("Unauthorized");

      // employee can only see their own data
      if (user.role === "employee" && user.employeeId !== id) {
        throw new Error("Access denied");
      }

      return await Employee.findById(id);
    },
  },

  Mutation: {
    // Add new employee (admin only)
    addEmployee: async (_, args, { user }) => {
      if (!user || user.role !== "admin") throw new Error("Not authorized");
      return await Employee.create(args);
    },

    // Update employee data (admin only)
    updateEmployee: async (_, { id, ...updates }, { user }) => {
      if (!user || user.role !== "admin") throw new Error("Not authorized");

      const emp = await Employee.findByIdAndUpdate(id, updates, { new: true });
      if (!emp) throw new Error("Employee not found");

      return emp;
    },

    // Delete employee data (admin only)
    deleteEmployee: async (_, { id }, { user }) => {
      if (!user || user.role !== "admin") throw new Error("Not authorized");
      await Employee.findByIdAndDelete(id);
      return true;
    },

    // Flag / Unflag employee (admin only)
    flagEmployee: async (_, { id, flagged }, { user }) => {
      if (!user || user.role !== "admin") throw new Error("Not authorized");

      const updated = await Employee.findByIdAndUpdate(
        id,
        { flagged },
        { new: true }
      );

      if (!updated) throw new Error("Employee not found");
      return updated;
    },
  },
};

module.exports = resolvers;

