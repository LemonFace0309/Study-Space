import { gql } from '@apollo/client';

export const GET_USER = gql`
  query ($name: String!, $email: String!) {
    user(name: $name, email: $email) {
      _id
      name
      username
      friends
      todos {
        _id
        task
        isCompleted
      }
    }
  }
`;
