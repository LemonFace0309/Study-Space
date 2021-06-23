import PropTypes from 'prop-types';
import { getSession } from 'next-auth/client';

import User from '../models/User';
import dbConnect from '../utils/dbConnect';

const Home = ({ session }) => {
  session = JSON.parse(session);
  console.debug(session);

  return <h1>WELCOME :D</h1>;
};

Home.propTypes = {
  session: PropTypes.string.isRequired,
};

export default Home;

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  await dbConnect();

  let newSession;
  if (session) {
    const user = await User.findOne({
      email: session.user.email,
    });
    newSession = { ...session, user };
    console.log('Session:', newSession);
  }

  return {
    props: {
      session: JSON.stringify(newSession), // otherwise nextjs throws error - can't serialize data
    },
  };
};
