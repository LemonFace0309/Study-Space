import { gql } from '@apollo/client';

export const typeDefs = gql`
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

  input SpaceInput {
    name: String
    description: String
    spaceId: ID
    isActive: Boolean
    music: String
    userId: ID
  }

  type Mutation {
    createSpace(input: SpaceInput): Space
    # updateSpace(input: SpaceInput): Space
    addUserToSpace(input: SpaceInput): Space
    removeUserFromSpace(input: SpaceInput): Space
  }
  type Query {
    users(userIds: [ID], name: String, email: String): [User]
    spaces(spaceIds: [ID]): [Space]
  }
`;
