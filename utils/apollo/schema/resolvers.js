import dbConnect from 'utils/dbConnect';
import User from 'models/User';
import Space from 'models/Spaces';
export const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      const { userIds, email, name } = args;
      console.debug('args', args, 'userIds', userIds);
      const data = [];

      await dbConnect;

      // Query by Name and Email
      if (email && name) {
        const user = await User.findOne({ name, email });
        data.push(user);
        return data;
      }

      // For Query by ID
      for (let id of userIds) {
        try {
          const user = await User.findById(id);
          data.push(user);
        } catch (err) {
          console.debug(err);
        }
      }
      return await data;
    },

    spaces: async (parent, args, context) => {
      const { spaceIds } = args;
      console.debug('args', args, 'spaceIds', spaceIds);
      const data = [];

      await dbConnect;
      for (let spaceId of spaceIds) {
        try {
          const space = await Space.findOne({ spaceId });
          data.push(space);
        } catch (err) {
          console.debug(err);
        }
      }
      return data;
    },
  },
};
