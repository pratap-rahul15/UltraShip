import { gql } from "@apollo/client";

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee(
    $name: String!
    $age: Int!
    $class: String!
    $subjects: [String!]!
    $attendance: Float!
  ) {
    addEmployee(
      name: $name
      age: $age
      class: $class
      subjects: $subjects
      attendance: $attendance
    ) {
      id
      name
      age
      class
      subjects
      attendance
      flagged        
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!
    $name: String
    $age: Int
    $class: String
    $subjects: [String!]
    $attendance: Float
    $flagged: Boolean
  ) {
    updateEmployee(
      id: $id
      name: $name
      age: $age
      class: $class
      subjects: $subjects
      attendance: $attendance
      flagged: $flagged
    ) {
      id
      name
      age
      class
      subjects
      attendance
      flagged
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

export const FLAG_EMPLOYEE = gql`
  mutation FlagEmployee($id: ID!, $flagged: Boolean!) {
    flagEmployee(id: $id, flagged: $flagged) {
      id
      flagged
    }
  }
`;
