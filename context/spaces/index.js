import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import * as userState from 'atoms/user';
import getUser from '@/utils/getUser';
import EntryDialog from '@/components/Spaces/Dialogs/Entry';
import { PREFIX } from '@/hooks/useLocalStorage';
import { useSocketContext, SocketProvider } from './SocketContext';
import { useTodoContext, TodoProvider } from './TodoContext';
import { useSpotifyContext, SpotifyProvider } from './SpotifyContext';
import LOADING_ENUM from './libs/loadingEnum';
import LAYOUT_ENUM from './libs/layoutEnum';
import ROLES from './libs/roles';
import USERNAME_PREFIX_KEY from './libs/usernamePrefixKey';
import getUsername from './libs/getUsername';

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
  const [loading, setLoading] = useState(LOADING_ENUM.LOADING);
  const [layout, setLayout] = useState(LAYOUT_ENUM.TILED);
  const [username, setUsername] = useState('');
  const [user, setUser] = useRecoilState(userState.user);
  const [role, setRole] = useState(ROLES.STUDENT.value);

  const initUser = async () => {
    let newUser = null;

    if (!user) {
      try {
        newUser = await getUser();
        if (newUser) setUser(newUser);
      } catch (err) {
        console.debug('Unable to initialize user:', user);
      }
    } else {
      newUser = user;
    }

    const _username = getUsername(user);
    if (_username) {
      setUsername(_username);
      setLoading(LOADING_ENUM.SKIP_DIALOG);
    } else {
      setLoading(LOADING_ENUM.SHOW_DIALOG);
    }
  };

  useEffect(() => {
    initUser();
  }, []);

  useEffect(() => {
    if (username) setLoading(LOADING_ENUM.SKIP_DIALOG);
  }, [username]);

  const updateUsername = (_username) => {
    if (!_username) return false;

    const prefixedKey = PREFIX + USERNAME_PREFIX_KEY;
    localStorage.setItem(prefixedKey, JSON.stringify(_username));
    setUsername(_username);
    return true;
  };

  const updateRole = (_role) => {
    setRole(_role);
  };

  const value = {
    username,
    role,
    layout,
    setLayout,
  };

  if (loading == LOADING_ENUM.LOADING)
    return (
      <Box sx={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress size={80} />
      </Box>
    );

  if (loading == LOADING_ENUM.SHOW_DIALOG)
    return <EntryDialog updateUsername={updateUsername} updateRole={updateRole} />;

  return (
    <SpaceContext.Provider value={value}>
      <SocketProvider loading={loading} username={username} role={role}>
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
