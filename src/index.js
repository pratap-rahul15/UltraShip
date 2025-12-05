// This is the main entry point for the backend server using Express and Apollo Server.
require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { authMiddleware } = require('./auth');

// Initialize the Express application and Apollo Server
async function start() {
  const app = express();

  app.use(authMiddleware); 

// Apply authentication middleware, so that each request can have user info attached to it.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ user: req.user, loaders: require('./dataloader')() })
  });

  // Start the Apollo Server
  await server.start();

 // Apply the Apollo GraphQL middleware and set the path to /graphql
  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT || 4000;

  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  // Start the server
  app.listen(PORT, () => {

    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });

}

// Start the server and handle any errors.
start().catch(err => {

  console.error(err);

  process.exit(1);
});
