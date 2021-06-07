import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
const bcrypt = require('bcrypt')

import dbConnect from '../../../utils/dbConnect'
import User from '../../../models/User'

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect()
        const { email, password } = credentials
        const user = await User.findOne({
          email,
          type: 'credentials',
        })
        if (!user) {
          return null
        }
        const matched = await bcrypt.compare(password, user.password)
        const parsedUser = (({ _id, name, email }) => ({ _id, name, email }))(
          user
        )
        return matched && parsedUser
      },
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      if (account.type === 'credentials') {
        return true
      } else if (
        account.provider === 'google' &&
        profile.verified_email === true &&
        profile.email.endsWith('@gmail.com')
      ) {
        return true
      } else {
        return false
      }
    },
    async jwt(token, user, account, profile, isNewUser) {
      return token
    },
  },
  session: {
    jwt: true,
  },
  database: process.env.DATABASE_URL,
}

export default NextAuth(options)
