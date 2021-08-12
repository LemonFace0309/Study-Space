import dbConnect from 'utils/dbConnect';
import User from 'models/User';
import Space from 'models/Spaces';
export const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      console.debug('args', args, 'userIds', userIds);
      const { userIds, email, name } = args;
      const data = [];

      await dbConnect;

      // Query by Name and Email
      if (email && name) {
        const user = await User.findOne({ name, email });
        data.push(user);
        return data;
      }

      // For Query by ID
      for (let _id of userIds) {
        const user = await User.findOne({ _id });
        data.push(user);
      }
      return await data;
    },

    spaces: async (parent, args, context) => {
      console.debug('args', args, 'spaceIds', spaceIds);
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
};
