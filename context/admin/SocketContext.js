import { createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const value = {};

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
