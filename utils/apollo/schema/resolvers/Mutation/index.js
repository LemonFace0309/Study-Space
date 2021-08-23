import User from 'models/User';
import Space from 'models/Spaces';
const Mutation = {
  createSpace: async (_, { input }) => {
    const { name, description, spaceId } = input;

    let result = {};
    try {
      const space = new Space({
        name,
        description,
        participants: [],
        spaceId,
        isActive: true,
      });

      result = await space.save();
      console.debug('Created new space:', result);
    } catch (err) {
      console.debug('Cannot upload new space to database: ', err);
    }
    return result;
  },
  addUserToSpace: async (_, { input }) => {
    const { spaceId, userId } = input;

    let space = {};
    try {
      // Filters for the Space with the given spaceId
      const filter = { spaceId };

      // Updates by pushing userId into the participants array attribute
      const update = {
        $push: { participants: userId },
      };

      // Mongoose returns the space before the update occurs by default.
      // {new:true} is the option argument that tells mongoose to return the space after the update occurs.
      // populate('participants') fetches the corresponding User object for each object ID in the Space's participants attribute.
      // Mongoose queries are not Promises by default. exec() turns the query into a Promise so we can use async/await after calling populate()
      space = await Space.findOneAndUpdate(filter, update, { new: true }).populate('participants').exec();
      console.debug('Updated space after populating participant field:', space);
    } catch (err) {
      console.debug('Cannot upload new space to database:', err);
    }
    return space;
  },
  removeUserFromSpace: async (_, { input }) => {
    const { spaceId, userId } = input;

    let space = {};
    try {
      // $pull removes the specified element from an array in mongoDB.
      const filter = { spaceId };
      const update = {
        $pull: { participants: userId },
      };

      // Mongoose returns the space before the update occurs by default.
      // {new:true} is the option argument that tells mongoose to return the space after the update occurs.
      // populate('participants') fetches the corresponding User object for each object ID in the Space's participants attribute.
      // Mongoose queries are not Promises by default. exec() turns the query into a Promise so we can use async/await after calling populate()
      space = await Space.findOneAndUpdate(filter, update, { new: true }).populate('participants').exec();

      console.debug('Updated space after removing a participant:', space);
    } catch (err) {
      console.debug('Cannot upload new space to database: ', err);
    }
    return space;
  },
};
export default Mutation;
