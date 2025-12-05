// Schema definition for the Employee Management GraphQL API
// using Apollo Server and GraphQL
// Includes types, queries, mutations, filtering, sorting, and pagination.
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String!
    subjects: [String!]!
    attendance: Float!
    flagged: Boolean     
  }

  type PaginatedEmployees {
    data: [Employee!]!
    page: Int!
    pageSize: Int!
    total: Int!
  }

  type Query {
    employees(page: Int, pageSize: Int, search: String): PaginatedEmployees!
    employee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(
      name: String!
      age: Int!
      class: String!
      subjects: [String!]!
      attendance: Float!
    ): Employee!

    updateEmployee(
      id: ID!
      name: String
      age: Int
      class: String
      subjects: [String!]
      attendance: Float
      flagged: Boolean       
    ): Employee!

    deleteEmployee(id: ID!): Boolean!

    flagEmployee(id: ID!, flagged: Boolean!): Employee!   # OPTIONAL BUT USEFUL
  }
`;

module.exports = typeDefs;
