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


  const PROD_FRONTEND = process.env.FRONTEND_URL;


  const allowedOrigins = [
    PROD_FRONTEND,
    "http://localhost:5173",
    "http://localhost:3000",
  ];

  function isAllowedOrigin(origin) {
    if (!origin) return true;
    if (allowedOrigins.includes(origin)) return true;
    if (origin.endsWith(".vercel.app")) return true;
    return false;
  }

  // Global CORS Middleware
  app.use(
    cors({
      origin: function (origin, callback) {
        if (isAllowedOrigin(origin)) {
          callback(null, true);
        } else {
          console.log(" BLOCKED ORIGIN:", origin);
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  // Preflight handler
  app.options("*", (req, res) => {
    const origin = req.headers.origin;

    if (isAllowedOrigin(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    return res.sendStatus(200);
  });

  app.use(express.json());

  // Authentication middleware
  app.use(authMiddleware);

  // Models
  const User = require("./models/User");
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");

  // Login route with proper CORS
  app.post("/login", async (req, res) => {
    const origin = req.headers.origin;

    if (isAllowedOrigin(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
    }
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

      return res.json({ token, role: user.role, username });
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      return res.status(500).json({ error: "Server error" });
    }
  });


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
      origin: function (origin, callback) {
        if (isAllowedOrigin(origin)) callback(null, true);
        else callback(new Error("Not allowed by CORS"));
      },
      credentials: true,
    },
  });

  // MongoDB
  const PORT = process.env.PORT || 4000;
  await mongoose.connect(process.env.MONGO_URI);

  // Start server
  app.listen(PORT, () => {
    console.log(` Server ready at port ${PORT}`);
  });
}

// Start server
start().catch((err) => {
  console.error(err);
  process.exit(1);
});
