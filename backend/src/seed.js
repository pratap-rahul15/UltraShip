// Seed script will help to populate the database with some initial data.
// generate fake employees and an admin user.
require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker'); 
const Employee = require('./models/Employee');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// The Main seeding function
async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Employee.deleteMany({});
  await User.deleteMany({});

  // Generate 50 fake employees 
  const emps = [];
  for (let i=0;i<50;i++){
    emps.push(new Employee({
      name: faker.person.fullName(),   
      age: faker.number.int({ min: 20, max: 60 }),  
      class: ['A','B','C'][Math.floor(Math.random()*3)],
      subjects: faker.helpers.arrayElements(['Math','Physics','CS','Hindi','Operating Systems'], 3), 
      attendance: parseFloat((Math.random()*100).toFixed(2))
    }));
  }

  // Insert employees into DB 
  const saved = await Employee.insertMany(emps);

  // Create an admin user and a regular employee user
  const adminHash = await bcrypt.hash('AdminPass123', 10);
  const userHash = await bcrypt.hash('UserPass123', 10);

  // Admin user
  await User.create({ username: 'admin', passwordHash: adminHash, role: 'admin' });
  await User.create({ 
    username: 'employee1', 
    passwordHash: userHash, 
    role: 'employee', 
    employeeId: saved[0]._id 
  });

  // Close connection
  console.log('Seed complete');
  process.exit(0);
}

// Run the seed function and handle errors
seed().catch(e => { console.error(e); process.exit(1); });
