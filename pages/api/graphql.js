import { ApolloServer, gql } from 'apollo-server-micro';
import dbConnect from 'utils/dbConnect';
import asyncForEach from '@/utils/asyncForEach';

import User from 'models/User';
import Space from 'models/Spaces';

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

  type Query {
    users(userIds: [ID]): [User]
    spaces(spaceIds: [ID]): [Space]
  }
`;
// Sample Id's to test out in graphql gui
// const userIds = ["60ff51c8684e9e2206a83bfb", "609ccafca1c3fe54cca40121"];
// const spaceIds = ["e3749900-ef9f-11eb-a133-cb7556fca63a", "bd3b5480-efa0-11eb-a133-cb7556fca63a"];

const resolvers = {
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

      // Does the same thing as above
      // await asyncForEach(userIds, async (_id) => {
      //   const user = await User.findOne({ _id });
      //   data.push(user);
      // });
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

const apolloServer = new ApolloServer({ typeDefs, resolvers });

const startServer = apolloServer.start();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', 'https://studio.apollographql.com');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
