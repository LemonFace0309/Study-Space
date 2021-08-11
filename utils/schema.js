import { ApolloServer, gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type User {
    friends: [ID]
    _id: ID
    name: String
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

  type Query {
    users(userIds: [ID]): [User]
    spaces(spaceIds: [ID]): [Space]
  }
`;
// Sample Id's to test out in graphql gui
// const userIds = ["60ff51c8684e9e2206a83bfb", "609ccafca1c3fe54cca40121"];
// const spaceIds = ["e3749900-ef9f-11eb-a133-cb7556fca63a", "bd3b5480-efa0-11eb-a133-cb7556fca63a"];

export const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      const { userIds } = args;
      console.debug('args', args, 'userIds', userIds);
      const data = [];

      await dbConnect;
      for (let _id of userIds) {
        const user = await User.findOne({ _id });
        data.push(user);
      }
      return data;
    },

    spaces: async (parent, args, context) => {
      const { spaceIds } = args;
      console.debug('args', args, 'spaceIds', spaceIds);
      const data = [];

      await dbConnect;
      for (let spaceId of spaceIds) {
        const space = await Space.findOne({ spaceId });
        data.push(space);
      }
      return data;
    },
  },
};
