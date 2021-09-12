import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';

import * as userState from 'atoms/user';
import getUser from '@/utils/getUser';
import { useSocketContext, SocketProvider } from './SocketContext';
import { useTodoContext, TodoProvider } from './TodoContext';
import { useSpotifyContext, SpotifyProvider } from './SpotifyContext';

export const useRoomContext = () => {
  return {
    ...useSocketContext(),
    ...useTodoContext(),
    ...useSpotifyContext(),
  };
};

export const RoomProvider = ({ children }) => {
  const [user, setUser] = useRecoilState(userState.user);

  const initUser = async () => {
    try {
      const newClient = await getUser();
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
    <SocketProvider>
      <TodoProvider>
        <SpotifyProvider>{children}</SpotifyProvider>
      </TodoProvider>
    </SocketProvider>
  );
};

RoomProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
