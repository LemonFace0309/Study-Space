import { ApolloServer, gql } from 'apollo-server-micro';
import dbConnect from 'utils/dbConnect';

import User from 'models/User';
import Space from 'models/Spaces';

const typeDefs = gql`
  type User {
    friends: [ID!]
    _id: ID!
    name: String!
    email: String!
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
    requester: ID!
    recipient: ID!
    requester_email: String
    recipient_email: String
    status: FriendStatus!
    createdAt: String!
    updatedAt: String!
  }

  type Space {
    name: String!
    description: String
    spaceId: ID!
    isActive: Boolean!
    music: String
    participants: [ID!]
    createdAt: String!
    updatedAt: String!
  }

  input SpaceInput {
    name: String!
    description: String
    spaceId: ID!
    music: String
    participants: [ID!]
  }

  type Query {
    users(userIds: [ID!], name: String, email: String): [User]
    spaces(spaceIds: [ID!]!): [Space]
  }

  type Mutation {
    createSpace(input: SpaceInput!): Space
  }
`;
// Sample Id's to test out in graphql gui
// const userIds = ["60ff51c8684e9e2206a83bfb", "609ccafca1c3fe54cca40121"];
// const spaceIds = ["e3749900-ef9f-11eb-a133-cb7556fca63a", "bd3b5480-efa0-11eb-a133-cb7556fca63a"];

const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      const { userIds, name, email } = args;
      const data = [];

      await dbConnect;

      if (name && email) {
        const user = await User.findOne({ name, email });
        data.push(user);
        return data;
      }

      for (let _id of userIds) {
        const user = await User.findOne({ _id });
        data.push(user);
      }
      return data;
    },

    spaces: async (parent, args, context) => {
      const { spaceIds } = args;
      const data = [];

      await dbConnect;
      for (let spaceId of spaceIds) {
        const space = await Space.findOne({ spaceId });
        data.push(space);
      }
      return data;
    },
  },
  Mutation: {
    createSpace: async (parent, args, context) => {
      console.log('parent:', parent, 'args:', args, 'context:', context);

      await dbConnect;
      const space = new Space({
        name,
        description,
        music,
        spaceId,
        participants,
      });
      const result = space.save();
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
