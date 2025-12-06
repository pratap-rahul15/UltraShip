// This is the main entry point for the backend server using Express and Apollo Server.
require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { authMiddleware } = require("./auth");
const cors = require("cors");

// Initialize the Express application and Apollo Server
async function start() {
  const app = express();

  // Use FRONTEND_URL from env or allow all during initial setup
  const FRONTEND = process.env.FRONTEND_URL || "*";

  app.use(
    cors({
      origin: FRONTEND,
      credentials: true,
    })
  );

  app.use(express.json());

  // Authentication middleware 
  app.use(authMiddleware);

  // Models
  const User = require("./models/User");
  const Employee = require("./models/Employee");
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");

// Auth Routes
  app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ error: "Invalid username or password" });

      const match = await bcrypt.compare(password, user.passwordHash);
      if (!match) return res.status(400).json({ error: "Invalid username or password" });

      const token = jwt.sign(
        { id: user._id, role: user.role, employeeId: user.employeeId },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({ token, role: user.role, employeeId: user.employeeId || null });
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      return res.status(500).json({ error: "Server error" });
    }
  });


  app.get("/create-admin", async (req, res) => {
    try {
      const existing = await User.findOne({ username: "admin" });
      if (existing) return res.json({ message: "Admin already exists" });

      const hash = await bcrypt.hash("AdminPass123", 10);

      await User.create({
        username: "admin",
        passwordHash: hash,
        role: "admin",
        employeeId: null,
      });

      res.json({ message: "Admin created (admin / AdminPass123)" });
    } catch (err) {
      console.error("ADMIN CREATE ERROR:", err);
      res.status(500).json({ error: "Unable to create admin" });
    }
  });

  // Apollo Server Setup
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ user: req.user, loaders: require("./dataloader")() }),
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: {
      origin: FRONTEND,
      credentials: true,
    },
  });

  const PORT = process.env.PORT || 4000;

  // Connect to MongoDB
  await mongoose.connect(process.env.MONGO_URI);

  // Start the server
  app.listen(PORT, () => {
    console.log(` Server running at port ${PORT}`);
  });
}

// Start the server
start().catch((err) => {
  console.error(err);
  process.exit(1);
});
