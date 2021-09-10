// This file overrides the custom defined User Schema Next Auth puts into our database when a user signs in with SSO
import Adapters from 'next-auth/adapters';

class User extends Adapters.TypeORM.Models.User.model {
  // You can extend the options in a model but you should not remove the base
  // properties or change the order of the built-in options on the constructor
  constructor(name, email, image, emailVerified) {
    super(name, email, image, emailVerified);
    this.type = 'providers';
    this.__v = 0;
    this.friends = [];
    this.todos = [];
    this.username = '';
    // this.password = ''; Not sure if we want password field to be consistent with password users
  }
}

const UserSchema = {
  name: 'User',
  target: User,
  columns: {
    ...Adapters.TypeORM.Models.User.schema.columns,
  },
};

const NextAuthProvidersUser = {
  model: User,
  schema: UserSchema,
};

export default NextAuthProvidersUser;
