// This file overrides the custom defined User Schema Next Auth puts into our database when a user signs in with SSO
import Adapters from 'next-auth/adapters';

// Extend the built-in models using class inheritance
export default class User extends Adapters.TypeORM.Models.User.model {
  // You can extend the options in a model but you should not remove the base
  // properties or change the order of the built-in options on the constructor

  username = '';
  phoneNumber = '';
  password = '';
  friends = [];
  type = 'credentials';
  __v = 0;
  constructor(name, email, image, emailVerified) {
    super(name, email, image, emailVerified);
  }
}

export const UserSchema = {
  name: 'User',
  target: User,
  columns: {
    ...Adapters.TypeORM.Models.User.schema.columns,

    // We don't need these, they're already defined with our Mongoose User model
    // username: {
    //   type: 'varchar',
    //   nullable: true,
    // },
    // phoneNumber: {
    //   type: 'varchar',
    //   nullable: true,
    // },
    // password: {
    //   type: 'varchar',
    //   nullable: true,
    // },
    // friends: {
    //   type: 'object',
    //   nullable: true,
    // },
  },
};
