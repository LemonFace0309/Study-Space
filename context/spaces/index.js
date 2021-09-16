import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';

import * as userState from 'atoms/user';
import getUser from '@/utils/getUser';
import { useTodoContext, TodoProvider } from './TodoContext';
import { useSpotifyContext, SpotifyProvider } from './SpotifyContext';

export const useRoomContext = () => {
  return {
    ...useTodoContext(),
    ...useSpotifyContext(),
  };
};

export const RoomProvider = ({ children }) => {
  const [user, setUser] = useRecoilState(userState.user);

  const initUser = async () => {
    try {
      const newClient = await getUser();
      console.debug('newClient from context/spaces:', newClient);
      if (newClient) {
        setUser(newClient);
      }
    } catch (err) {
      console.debug('Unable to initialize user:', user);
    }
  };

  useEffect(() => {
    if (!user) {
      initUser();
    }
  }, []);

  return (
    <TodoProvider>
      <SpotifyProvider>{children}</SpotifyProvider>
    </TodoProvider>
  );
};

RoomProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
