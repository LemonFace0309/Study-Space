import User from 'models/User';
import Space from 'models/Spaces';

const Query = {
  users: async (_, { userIds, email, name }) => {
    // Fetch only the current session user by Name and Email
    if (email && name) {
      try {
        const user = await User.findOne({ name, email });
        console.debug('Fetching session user:', user);
        return [user];
      } catch (err) {
        console.debug('Cannot fetch user', err);
      }
    }

    // Fetches users that have an id found in userIds
    const filter = {
      _id: {
        $in: userIds,
      },
    };

    let users = [];
    try {
      users = await User.find(filter);
      console.debug('Fetching users with specified userIds:', users);
    } catch (err) {
      console.debug(err);
    }

    return users;
  },

  spaces: async (_, { spaceIds }) => {
    // Fetch all spaces
    if (spaceIds?.length == 0) {
      console.debug('Fetching all spaces:');
      // populate('participants') fetches the corresponding User object for each object ID in the Space's participants attribute.
      // Mongoose queries are not Promises by default. exec() turns the query into a Promise so we can use async/await after calling populate()
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
      // populate('participants') fetches the corresponding User object for each object ID in the Space's participants attribute.
      // Mongoose queries are not Promises by default. exec() turns the query into a Promise so we can use async/await after calling populate()
      spaces = await Space.find(filter).populate('participants').exec();
      console.debug('Fetching spaces with specified spaceIds', spaces);
    } catch (err) {
      console.debug(err);
    }
    return spaces;
  },
};
export default Query;
