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

  // Authentication middleware (attaches req.user if token present)
  app.use(authMiddleware);

  // Login route
  const User = require("./models/User");
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");

  app.post("/login", async (req, res) => {
    res.header("Access-Control-Allow-Origin", FRONTEND);
    res.header("Access-Control-Allow-Credentials", "true");
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
      console.error(err);
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

  // Connect to MongoDB
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

// Start the server
start().catch((err) => {
  console.error(err);
  process.exit(1);
});
