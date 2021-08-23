import { gql } from '@apollo/client';

const typeDefs = gql`
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
    createdAt: String
    updatedAt: String
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
    spaceId: ID
    isActive: Boolean
    music: String
    participants: [User]
    createdAt: String
    updatedAt: String
  }

  input AddUserToSpaceInput {
    spaceId: ID!
    userId: ID!
  }
  input RemoveUserFromSpaceInput {
    spaceId: ID!
    userId: ID!
  }
  input CreateSpaceInput {
    name: String!
    description: String!
    spaceId: ID!
  }
  type Mutation {
    createSpace(input: CreateSpaceInput): Space
    # TODO:
    # updateSpace(input: SpaceInput): Space
    addUserToSpace(input: AddUserToSpaceInput): Space
    removeUserFromSpace(input: RemoveUserFromSpaceInput): Space
  }
  type Query {
    sessionUser(name: String!, email: String!): User
    users(userIds: [ID], name: String, email: String): [User]
    spaces(spaceIds: [ID]): [Space]
  }
`;
export default typeDefs;
