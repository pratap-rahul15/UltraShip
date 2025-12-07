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

  // FRONTEND URL from Render env
  const FRONTEND = process.env.FRONTEND_URL;
  console.log("CORS ALLOW ORIGIN:", FRONTEND);

  // Global CORS
  app.use(
    cors({
      origin: FRONTEND,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  // Preflight handler (CRITICAL for Vercel)
  app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", FRONTEND);
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    return res.sendStatus(200);
  });

  app.use(express.json());

  // Authentication middleware (attaches req.user if token present)
  app.use(authMiddleware);

  // Login route
  const User = require("./models/User");
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");

  app.post("/login", async (req, res) => {
    // Return proper CORS headers for login route
    res.header("Access-Control-Allow-Origin", FRONTEND);
    res.header("Access-Control-Allow-Credentials", "true");

    console.log("REQ BODY DEBUG:", req.body);

    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      console.log("DB USER FOUND:", user);

      if (!user) {
        console.log("LOGIN ERROR: user not found");
        return res.status(400).json({ error: "Invalid username or password" });
      }

      const match = await bcrypt.compare(password, user.passwordHash);
      console.log("PASSWORD MATCH RESULT:", match);

      if (!match) {
        console.log("LOGIN ERROR: incorrect password");
        return res.status(400).json({ error: "Invalid username or password" });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role, employeeId: user.employeeId },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        token,
        role: user.role,
        username: user.username,
      });

    } catch (err) {
      console.error("LOGIN SERVER ERROR:", err);
      return res.status(500).json({ error: "Server error" });
    }
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ user: req.user, loaders: require("./dataloader")() }),
  });

  await server.start();

  // Apply Apollo middleware to Express app
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: {
      origin: FRONTEND,
      credentials: true,
    },
  });

  // Connect to MongoDB and start the server
  const PORT = process.env.PORT || 4000;

  await mongoose.connect(process.env.MONGO_URI);

  // Start the server
  app.listen(PORT, () => {
    console.log(` Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

// Start the server
start().catch((err) => {
  console.error(err);
  process.exit(1);
});
