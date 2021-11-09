import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useRecoilState } from 'recoil';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import * as userState from '@/atoms/user';
import getUser from '@/utils/getUser';
import EntryDialog from '@/components/Shared/Dialogs/Entry';
import { PREFIX } from '@/hooks/useLocalStorage';
import { useStatusBubbleContext, StatusBubbleProvider } from './StatusBubbleContext';
import { useSocketContext, SocketProvider } from './SocketContext';
import { useTodoContext, TodoProvider } from './TodoContext';
import { useSpotifyContext, SpotifyProvider } from './SpotifyContext';
import LOADING_ENUM from '../libs/loadingEnum';
import LAYOUT_ENUM from './libs/layoutEnum';
import USERNAME_PREFIX_KEY from './libs/usernamePrefixKey';
import getUsername from './libs/getUsername';
import ROLES from '../libs/roles';

const SpaceContext = createContext();

export const useSpaceContext = () => {
  return {
    ...useContext(SpaceContext),
    ...useStatusBubbleContext(),
    ...useSocketContext(),
    ...useTodoContext(),
    ...useSpotifyContext(),
  };
};

export const SpaceProvider = ({ children }) => {
  const router = useRouter();
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

    const _username = getUsername(newUser);
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

  const updateUsername = (_username, _role) => {
    if (!_username) return false;

    const prefixedKey = PREFIX + USERNAME_PREFIX_KEY;
    if (_role == ROLES.STUDENT.value) {
      localStorage.setItem(prefixedKey, JSON.stringify(_username));
    } else {
      localStorage.removeItem(prefixedKey);
    }
    setUsername(_username);
    return true;
  };

  const updateRole = (_role) => {
    setRole(_role);
  };

  const openEntryDialog = () => {
    setLoading(LOADING_ENUM.SHOW_DIALOG);
  };

  const value = {
    username,
    role,
    layout,
    setLayout,
    openEntryDialog,
  };

  if (loading == LOADING_ENUM.LOADING || router.isFallback)
    return (
      <Box sx={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress size={80} />
      </Box>
    );

  if (loading == LOADING_ENUM.SHOW_DIALOG)
    return (
      <EntryDialog roles={[ROLES.STUDENT, ROLES.TEACHER]} updateUsername={updateUsername} updateRole={updateRole} />
    );

  return (
    <SpaceContext.Provider value={value}>
      <StatusBubbleProvider>
        <SocketProvider loading={loading} username={username} role={role}>
          <TodoProvider>
            <SpotifyProvider>{children}</SpotifyProvider>
          </TodoProvider>
        </SocketProvider>
      </StatusBubbleProvider>
    </SpaceContext.Provider>
  );
};

SpaceProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
