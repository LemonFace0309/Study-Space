import { createContext, useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import useStateRef from '@/hooks/useStateRef';

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ username, children }) => {
  const socketRef = useRef();
  const [selectedUser, setSelectedUser] = useState([]);
  const [users, setUsers, usersRef] = useStateRef([]);
  const [userConversations, setUserConversations] = useState([]);

  const initRoom = async () => {
    socketRef.current = io(process.env.NEXT_PUBLIC_NODE_SERVER || 'http://localhost:8080');

    /**
     * Notifiy users the admin is here
     * TODO: add authentication
     */
    socketRef.current.emit('join admin', { username });

    /**
     * Get information of users
     */
    socketRef.current.on('users', ({ users }) => {
      setUsers(() => {
        const value = users.map((user) => ({ userId: user.socketId, username: user.username, role: user.role }));
        setSelectedUser(value[0]);
        return value;
      });
      setUserConversations(users.map((user) => ({ userId: user.socketId, conversation: [] })));
    });

    /**
     * Remove user when disconnected
     */
    socketRef.current.on('user disconnect', ({ users }) => {
      const usersPeerId = users.map((user) => user.socketId);

      if (users.length > 0) {
        usersRef.current.forEach((userRef, index) => {
          if (!usersPeerId.includes(userRef.peerId)) {
            userRef.peer.destroy();
            setUsers(([...prev]) => {
              prev.splice(index, 1);
              return prev;
            });
          }
        });
      }
    });
  };

  const roomInitialized = useRef(false);
  useEffect(() => {
    if (!roomInitialized.current) {
      initRoom();
      roomInitialized.current = true;
    }
  }, []);

  const sendMessage = () => {
    return null;
  };

  const disconnect = () => {
    socketRef.current.disconnect();
  };

  const value = {
    selectedUser,
    users,
    userConversations,
    sendMessage,
    disconnect,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

SocketProvider.propTypes = {
  username: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
