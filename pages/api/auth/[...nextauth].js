import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';

const bcrypt = require('bcrypt');

import dbConnect from 'utils/dbConnect';
import User from 'models/User';
import NextAuthProvidersUser from 'models/NextAuthUser';

const options = {
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
    Providers.Credentials({
      async authorize(credentials) {
        await dbConnect();
        const { email, password } = credentials;
        const user = await User.findOne({
          email,
          type: 'credentials',
        });
        if (!user) {
          return null;
        }
        const matched = await bcrypt.compare(password, user.password);
        const parsedUser = (({ _id, name, email }) => ({ _id, name, email }))(user);
        return matched && parsedUser;
      },
    }),
  ],
  adapter: Adapters.TypeORM.Adapter(
    // The first argument should be a database connection string or TypeORM config object
    process.env.DATABASE_URL,
    // The second argument can be used to pass custom models and schemas
    {
      models: {
        User: NextAuthProvidersUser,
      },
    }
  ),

  callbacks: {
    async signIn(user, account, profile) {
      if (account.type === 'credentials') {
        return true;
      } else if (
        account.provider === 'google' &&
        profile.verified_email === true &&
        profile.email.endsWith('@gmail.com')
      ) {
        return true;
      } else {
        return false;
      }
    },
    async jwt(token, user, account, profile, isNewUser) {
      return token;
    },
  },
  session: {
    jwt: true,
    signingKey: process.env.JWT_SECRET,
  },
  database: process.env.DATABASE_URL,
};

export default NextAuth(options);
