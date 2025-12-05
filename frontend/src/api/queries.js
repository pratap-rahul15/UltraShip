// Queries related to employee data.
import { gql } from "@apollo/client";


// Query to fetch a paginated list of employees with their details.
export const GET_EMPLOYEES = gql`
  query Employees($page: Int!, $pageSize: Int!) {
    employees(page: $page, pageSize: $pageSize) {
      items {
        id
        name
        age
        class
        subjects
        attendance
      }
      pageInfo {
        total
        page
        pageSize
        hasNext
      }
    }
  }
`;
