import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';

import * as userState from 'atoms/user';
import getUser from '@/utils/getUser';
import { useSocketContext, SocketProvider } from './SocketContext';
import { useTodoContext, TodoProvider } from './TodoContext';
import { useSpotifyContext, SpotifyProvider } from './SpotifyContext';

export const LAYOUT_OPTIONS = {
  TILED: 'Tiled',
  LIST: 'List',
  MAIN: 'Main',
};

const SpaceContext = createContext();

export const useSpaceContext = () => {
  return {
    ...useContext(SpaceContext),
    ...useSocketContext(),
    ...useTodoContext(),
    ...useSpotifyContext(),
  };
};

export const SpaceProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState(LAYOUT_OPTIONS.TILED);
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

  const value = {
    layout,
    setLayout,
  };

  return (
    <SpaceContext.Provider value={value}>
      <SocketProvider loading={loading}>
        <TodoProvider>
          <SpotifyProvider>{children}</SpotifyProvider>
        </TodoProvider>
      </SocketProvider>
    </SpaceContext.Provider>
  );
};

SpaceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
