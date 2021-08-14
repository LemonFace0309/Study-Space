import dbConnect from 'utils/dbConnect';
import User from 'models/User';
import Space from 'models/Spaces';

export const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      const { userIds, email, name } = args;
      console.debug('args', args, 'userIds', userIds, 'context', context);
      const data = [];

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
      return data;
    },

    spaces: async (parent, args, context) => {
      const { spaceIds } = args;
      console.debug('args', args, 'spaceIds', spaceIds);
      const data = [];

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
  Mutation: {
    createSpace: async (parent, args, context) => {
      console.debug('createSpace', args);
      const { input } = args;
      const { name, description, userId, spaceId } = input;
      const space = new Space({
        name,
        description,
        participants: { _id: userId },
        spaceId,
        isActive: true,
        music: '',
      });
      let result = {};
      try {
        result = await space.save();
        console.debug('new space', result);
        return result;
      } catch (err) {
        console.debug('Cannot upload new space to database: ', err);
      }
      return result;
    },
    addUserToSpace: async (parent, args, context) => {
      console.debug('AddUserToSpace', args);
      const {
        input: { spaceId, userId },
      } = args;

      const filter = { spaceId };
      const update = {
        $push: { participants: { _id: userId } },
      };

      let space = {};
      try {
        space = await Space.findOneAndUpdate(filter, update, { new: true });
        console.debug(space);
      } catch (err) {
        console.debug('Cannot upload new space to database: ', err);
      }
      return space;
    },
  },
};
