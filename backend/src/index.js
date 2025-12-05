// This is the main entry point for the backend server using Express and Apollo Server.
require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const { authMiddleware } = require("./auth");

// Added imports
const cors = require("cors");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Initialize the Express application and Apollo Server
async function start() {
  const app = express();

  // 🔥 GLOBAL CORS (MUST BE FIRST)
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

  // 🔥 JSON body parsing
  app.use(express.json());

  // Apply authentication middleware, so that each request can have user info attached to it.
  app.use(authMiddleware);

  // ⭐ Login API Route
  app.post("/login", async (req, res) => {
    // CORS for login
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
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

      return res.json({
        token,
        role: user.role,
        employeeId: user.employeeId || null,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      user: req.user,
      loaders: require("./dataloader")(),
    }),
  });

  // Start the Apollo Server
  await server.start();

  // 🔥 Apollo middleware with correct CORS
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  const PORT = process.env.PORT || 4000;

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

// Start the server and handle any errors.
start().catch((err) => {
  console.error(err);
  process.exit(1);
});
