import { ApolloServer, gql } from 'apollo-server-micro';
import dbConnect from 'utils/dbConnect';
import User from 'models/User';
import { argsToArgsConfig } from 'graphql/type/definition';

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
    created: String
  }

  type Query {
    users(name: String): [User]
  }
`;

const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      const { name } = args;

      await dbConnect;
      const data = await User.findOne({ name: args.name });
      console.debug('data', data, 'args', args);
      return [data];
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
