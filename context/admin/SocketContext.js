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
  const [selectedUser, setSelectedUser, selectedUserRef] = useStateRef([]);
  const [users, setUsers, usersRef] = useStateRef([]);
  const [userConversations, setUserConversations] = useState([]);

  const initRoom = async () => {
    socketRef.current = io(`${process.env.NEXT_PUBLIC_NODE_SERVER}/admins` || 'http://localhost:8080/admins');

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
        const value = users.map((user) => ({ socketId: user.socketId, username: user.username, role: user.role }));
        setSelectedUser(value[0]);
        return value;
      });
      setUserConversations(users.map((user) => ({ socketId: user.socketId, conversation: [] })));
    });

    /**
     * Get information of new user
     */
    socketRef.current.on('new user', ({ user }) => {
      setUsers(([...prev]) => {
        prev.push({ socketId: user.socketId, username: user.username, role: user.role });
        setSelectedUser(prev[0]);
        return prev;
      });
      setUserConversations(([...prev]) => {
        prev.push({ socketId: user.socketId, conversation: [] });
        return prev;
      });
    });

    /**
     * Receiving dm and updating conversation
     */
    socketRef.current.on('dm', (payload) => {
      setUserConversations(([...prev]) => {
        let conversation;
        if (payload.sender == username) {
          conversation = prev.find((obj) => obj.socketId == selectedUserRef.current.socketId)?.conversation ?? [];
        } else {
          conversation = prev.find((obj) => obj.socketId == payload.socketId)?.conversation ?? [];
        }
        conversation.push({
          text: payload.message,
          recipient: payload.recipient,
          sender: payload.sender,
          fromMe: payload.sender == username,
          dm: true,
        });
        return prev;
      });
    });

    /**
     * Remove user when disconnected
     */
    socketRef.current.on('user disconnect', ({ users }) => {
      const usersPeerId = users.map((user) => user.socketId);

      if (usersRef.current.length > 0) {
        usersRef.current.forEach((userRef, index) => {
          if (!usersPeerId.includes(userRef.socketId)) {
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

  const sendMessage = (message) => {
    socketRef.current.emit('dm', { message, username, socketId: selectedUser.socketId });
  };

  const disconnect = () => {
    socketRef.current.disconnect();
  };

  const value = {
    selectedUser,
    setSelectedUser,
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
