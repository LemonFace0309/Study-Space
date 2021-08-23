import User from 'models/User';
import Space from 'models/Spaces';
import dbConnect from '@/utils/dbConnect';

const Query = {
  sessionUser: async (_, { email, name }) => {
    await dbConnect();
    // Fetch only the current session user by Name and Email
    let sessionUser;
    try {
      sessionUser = await User.findOne({ name, email });
      console.debug('Fetching session user with sessionUser resolver:', sessionUser);
    } catch (err) {
      console.debug('Cannot fetch user', err);
    }

    return sessionUser;
  },
  users: async (_, { userIds }) => {
    await dbConnect();

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
    await dbConnect();

    // Fetch all spaces if an spaceIds is empty
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
