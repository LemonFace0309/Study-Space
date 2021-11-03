import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import EntryDialog from '@/components/Shared/Dialogs/Entry';
import { useSocketContext, SocketProvider } from './SocketContext';
import LOADING_ENUM from '../libs/loadingEnum';
import ROLES from '../libs/roles';

const AdminContext = createContext();

export const useAdminContext = () => {
  return {
    ...useContext(AdminContext),
    ...useSocketContext(),
  };
};

export const AdminProvider = ({ children }) => {
  const [loading, setLoading] = useState(LOADING_ENUM.SHOW_DIALOG);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState(ROLES.ADMIN.value);

  useEffect(() => {
    if (username) setLoading(LOADING_ENUM.SKIP_DIALOG);
  }, [username]);

  const updateUsername = (_username, _role) => {
    if (!_username) return false;
    setUsername(_username);
    return true;
  };

  const updateRole = (_role) => {
    setRole(_role);
  };

  const value = {
    username,
    role,
  };

  if (loading == LOADING_ENUM.SHOW_DIALOG)
    return <EntryDialog roles={[ROLES.ADMIN]} updateUsername={updateUsername} updateRole={updateRole} />;

  return (
    <AdminContext.Provider value={value}>
      <SocketProvider username={username}>{children}</SocketProvider>
    </AdminContext.Provider>
  );
};

AdminProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
