import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from './typedefs';
import { resolvers } from './resolvers';

// This is only used in apollo/client because it has to take in a makeExectuableSchema type, and not api/graphql.js
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
