import { gql } from '@apollo/client';

export const GET_USER = gql`
  query ($name: String!, $email: String!) {
    user(name: $name, email: $email) {
      _id
      friends
      todos {
        _id
        task
        isCompleted
      }
    }
  }
`;
