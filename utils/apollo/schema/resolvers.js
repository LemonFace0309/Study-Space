import dbConnect from 'utils/dbConnect';
import User from 'models/User';
import Space from 'models/Spaces';

export const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      const { userIds, email, name } = args;
      console.debug('args', args, 'userIds', userIds);
      const data = [];

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
      return data;
    },

    spaces: async (parent, args, context) => {
      const { spaceIds } = args;
      console.debug('spaceIds', spaceIds);
      const data = [];

      for (let spaceId of spaceIds) {
        const space = await Space.findOne({ spaceId });
        data.push(space);
      }
      return data;
    },
  },
  Mutation: {
    createSpace: async (parent, args, context) => {
      const {
        input: { name, description, participants, spaceId },
      } = args;

      const space = new Space({
        name,
        description,
        participants: { participants },
        spaceId,
        isActive: true,
        music: '',
      });
      let result = {};
      try {
        result = await space.save();
        console.debug('result', result);
        return result;
      } catch (err) {
        console.debug('Cannot upload new space to database: ', err);
      }
      return;
    },
  },
};
