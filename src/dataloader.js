// DataLoader setup for batching and caching database requests.
// Here the dataLoader for fetching Employees by their IDs.
const DataLoader = require('dataloader');
const Employee = require('./models/Employee');

// Export a function that creates and returns DataLoader instances
module.exports = () => {

    // DataLoader for batching Employee fetches by ID.
  return {
    employeeById: new DataLoader(async (ids) => {
      const objs = await Employee.find({ _id: { $in: ids } }).lean();
      const map = new Map(objs.map(o => [o._id.toString(), o]));
      return ids.map(id => map.get(id.toString()) || null);
    })
  };
};
