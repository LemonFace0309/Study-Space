import { getSession } from 'next-auth/client';

import { GET_USER } from '@/utils/apollo/templates/User';
import { initializeApollo } from '@/utils/apollo/client';

const getUser = async (req) => {
  const userSession = await getSession({ req });
  if (!userSession) return;
  const { name, email } = userSession.user;
  try {
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query({
      query: GET_USER,
      variables: { name, email },
    });

    if (data?.user) {
      const user = { ...userSession.user, ...data.user };
      console.debug('User:', user);
      return user;
    }
  } catch (err) {
    console.debug('Unable to fetch user:', err);
    return null;
  }
  return null;
};

export default getUser;
