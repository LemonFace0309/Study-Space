import axios from 'axios';
import { getSession } from 'next-auth/client';

import { GET_USER } from '@/utils/apollo/templates/User';

const getUser = async () => {
  const userSession = await getSession();
  if (!userSession) return;
  const { name, email } = userSession.user;
  try {
    const result = await axios.post('/api/graphql', {
      query: GET_USER.loc.source.body,
      variables: { name, email },
    });
    if (result?.data) {
      const user = { ...userSession.user, ...result.data?.data?.user };
      console.debug('User:', user);
      return user;
    }
  } catch (err) {
    console.debug(err);
    return null;
  }
  return null;
};

export default getUser;
