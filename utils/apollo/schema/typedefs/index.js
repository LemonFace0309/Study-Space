import { gql } from '@apollo/client';

const typeDefs = gql`
  type Query {
    user(name: String!, email: String!): User
    users(userIds: [ID]): [User]
    todos(userId: [ID]!): [Todo!]!
    spaces(spaceIds: [ID]): [Space]
  }

  type Mutation {
    createSpace(input: CreateSpaceInput!): Space
    # TODO:
    # updateSpace(input: SpaceInput): Space
    addUserToSpace(input: AddUserToSpaceInput!): Space
    removeUserFromSpace(input: RemoveUserFromSpaceInput!): Space
  }

  input CreateSpaceInput {
    name: String!
    description: String!
    userId: ID!
    spaceId: ID!
  }

  input RemoveUserFromSpaceInput {
    spaceId: ID!
    userId: ID!
  }

  input AddUserToSpaceInput {
    spaceId: ID!
    userId: ID!
  }

  type User {
    friends: [ID]
    _id: ID
    name: String
    email: String
    username: String
    phoneNumber: String
    password: String
    type: String
    image: String
    todos: [Todo!]
    createdAt: String
    updatedAt: String
  }

  type Todo {
    _id: ID!
    task: String!
    isCompleted: Boolean!
  }

  enum FriendStatus {
    NOT_FRIENDS
    REQUESTED
    FRIENDS
  }

  type Friend {
    requester: ID
    recipient: ID
    requester_email: String
    recipient_email: String
    status: FriendStatus
    createdAt: String
    updatedAt: String
  }

  type Space {
    name: String
    description: String
    spaceId: ID!
    isActive: Boolean!
    music: String
    participants: [User!]
    createdAt: String!
    updatedAt: String!
  }
`;

export default typeDefs;
