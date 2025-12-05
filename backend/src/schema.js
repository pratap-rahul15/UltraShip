// Schema definition for the Employee Management GraphQL API
// using Apollo Server and GraphQL
// Includes types, queries, mutations, filtering, sorting, and pagination.
const { gql } = require('apollo-server-express');

// GraphQL type definitions
module.exports = gql`
  type Employee {
    id: ID!
    name: String!
    age: Int
    class: String
    subjects: [String]
    attendance: Float
    flag: Boolean
    createdAt: String
  }

  type PageInfo {
    total: Int
    page: Int
    pageSize: Int
    hasNext: Boolean
  }

  type EmployeePage {
    items: [Employee!]!
    pageInfo: PageInfo!
  }

  input EmployeeFilter {
    nameContains: String
    minAttendance: Float
    classEquals: String
  }

  enum EmployeeSortField { name age attendance createdAt }
  enum SortDirection { ASC DESC }

  type Query {
    employees(
      page: Int = 1,
      pageSize: Int = 10,
      filter: EmployeeFilter,
      sortField: EmployeeSortField = createdAt,
      sortDirection: SortDirection = DESC
    ): EmployeePage!

    employee(id: ID!): Employee
    me: User
  }

  input EmployeeInput {
    name: String!
    age: Int
    class: String
    subjects: [String]
    attendance: Float
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: ID!
    username: String!
    role: String!
    employeeId: ID
  }

  type Mutation {
    addEmployee(input: EmployeeInput!): Employee
    updateEmployee(id: ID!, input: EmployeeInput!): Employee
    deleteEmployee(id: ID!): Boolean

    login(username: String!, password: String!): AuthPayload
    signup(username: String!, password: String!, role: String): AuthPayload
  }
`;
