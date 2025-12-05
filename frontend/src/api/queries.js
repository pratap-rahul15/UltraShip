import { gql } from "@apollo/client";

export const GET_EMPLOYEES = gql`
  query GetEmployees($page: Int, $pageSize: Int, $search: String) {
    employees(page: $page, pageSize: $pageSize, search: $search) {
      data {
        id
        name
        age
        class
        subjects
        attendance
        flagged        
      }
      page
      pageSize
      total
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
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
