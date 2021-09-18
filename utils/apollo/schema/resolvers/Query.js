import User from 'models/User';
import Space from 'models/Spaces';

const Query = {
  user: async (_, { email, name }) => {
    // Fetch only the single user by Name and Email
    let user;
    try {
      user = await User.findOne({ name, email });
    } catch (err) {
      console.warn('Cannot fetch user:', err);
    }

    return user;
  },
  users: async (_, { userIds }) => {
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
  todos: (parent, { userId }) => {
    try {
      const user = User.findById(userId);
      if (!user) throw new Error('User not found');
      return user?.todos;
    } catch (err) {
      console.debug(err);
      throw new Error(err);
    }
  },
  spaces: async (_, { spaceIds }) => {
    // Fetch all spaces if an spaceIds is empty
    if (spaceIds?.length == 0) {
      const spaces = await Space.find({});
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
      spaces = await Space.find(filter);
      console.debug('Retrieved spaces with specified spaceIds', spaces);
    } catch (err) {
      console.warn('Unable to retrieve spaces:', err);
    }
    return spaces;
  },
};
export default Query;
