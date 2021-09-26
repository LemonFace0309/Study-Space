import { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useRecoilState(userState.user);

  const initUser = async () => {
    if (!user) {
      try {
        const newUser = await getUser();
        if (newUser) {
          setUser(newUser);
        }
      } catch (err) {
        console.debug('Unable to initialize user:', user);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    initUser();
  }, []);

  return (
    <SocketProvider loading={loading}>
      <TodoProvider>
        <SpotifyProvider>{children}</SpotifyProvider>
      </TodoProvider>
    </SocketProvider>
  );
};

RoomProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
