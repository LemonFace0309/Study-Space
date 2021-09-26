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
      throw err;
    }
    return spaces;
  },
  registeredParticipantsInSpace: async (_, { spaceId }) => {
    try {
      const space = await Space.findOne({ spaceId }); // finds guest and registered users
      const allParticipants = space.participants;
      const registeredPartcipantIds = allParticipants.filter((p) => p.userId).map((p) => p.userId);

      const populatedRegisteredParticipants = await User.find({ _id: { $in: registeredPartcipantIds } });
      return populatedRegisteredParticipants;
    } catch (err) {
      console.warn(`Unable to fetch users from space ${spaceId}:`, err);
      throw err;
    }
  },
  hostsInSpace: async (_, { spaceId }) => {
    try {
      const space = await Space.findOne({ spaceId }).populate('hosts.userId').exec();
      const hosts = space.hosts.map((host) => host.userId);
      return hosts;
    } catch (err) {
      console.warn(`Unable to fetch users from space ${spaceId}:`, err);
      throw err;
    }
  },
};
export default Query;
