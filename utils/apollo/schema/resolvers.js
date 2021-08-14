import User from 'models/User';
import Space from 'models/Spaces';

export const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      const { userIds, email, name } = args;
      console.debug('args', args, 'userIds', userIds, 'context', context);

      // Fetch only the current session user by Name and Email
      if (email && name) {
        try {
          const user = await User.findOne({ name, email });
          return [user];
        } catch (err) {
          console.debug('Cannot fetch user', err);
        }
      }

      // For Query by ID
      const filter = {
        _id: {
          $in: userIds,
        },
      };

      let users = [];
      try {
        users = await User.find(filter);
        console.debug('users', users);
      } catch (err) {
        console.debug(err);
      }

      return users;
    },

    spaces: async (parent, args, context) => {
      const { spaceIds } = args;
      console.debug('args', args, 'spaceIds', spaceIds);

      // Fetch all spaces
      if (spaceIds?.length == 0) {
        const spaces = await Space.find({}).populate('participants').exec();
        return spaces;
      }

      // For Query by ID
      const filter = {
        spaceId: {
          $in: spaceIds,
        },
      };

      let spaces = {};
      try {
        spaces = await Space.find(filter).populate('participants').exec();
      } catch (err) {
        console.debug(err);
      }
      return spaces;
    },
  },
  Mutation: {
    createSpace: async (parent, args, context) => {
      console.debug('createSpace', args);
      const { input } = args;
      const { name, description, userId, spaceId } = input;

      let result = {};
      try {
        const space = new Space({
          name,
          description,
          participants: [],
          spaceId,
          isActive: true,
          music: '',
        });

        result = await space.save();
        console.debug('new space', result);
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

      let space = {};
      try {
        // The new option returns the space after the update
        const filter = { spaceId };
        const update = {
          $push: { participants: userId },
        };
        space = await Space.findOneAndUpdate(filter, update, { new: true }).populate('participants').exec();
        console.debug('Updated space after populating participant field:', space);
      } catch (err) {
        console.debug('Cannot upload new space to database: ', err);
      }
      return space;
    },
    removeUserFromSpace: async (parent, args, context) => {
      console.debug('removeUserFromSpace', args);
      const {
        input: { spaceId, userId },
      } = args;

      let space = {};
      try {
        // The new option returns the space after the update
        const filter = { spaceId };
        const update = {
          $pull: { participants: userId },
        };
        space = await Space.findOneAndUpdate(filter, update, { new: true }).populate('participants').exec();

        console.debug('Updated space after removing a participant:', space);
      } catch (err) {
        console.debug('Cannot upload new space to database: ', err);
      }
      return space;
    },
  },
};
