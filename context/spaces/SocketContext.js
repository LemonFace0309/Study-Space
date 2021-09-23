import { createContext, useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator';
import { useRecoilValue } from 'recoil';
import { intersection } from 'lodash';

import * as userState from 'atoms/user';

const USER_MEDIA_ACTIVE = 'USER_MEDIA_ACTIVE';

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ loading, children }) => {
  const router = useRouter();
  const user = useRecoilValue(userState.user);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const [conversation, setConversation] = useState([]);
  const [username, setUsername] = useState('');
  const [participants, setParticipants] = useState([]);
  const [enableUserAudio, setEnableUserAudio] = useState(true);
  const [enableUserVideo, setEnableUserVideo] = useState(true);

  const initRoom = async () => {
    let currentUsername = '';
    if (user?.name) {
      currentUsername = user.name;
    } else {
      const randomName = uniqueNamesGenerator({
        dictionaries: [colors, animals],
        style: 'capital',
        separator: ' ',
      });
      currentUsername = randomName;
    }
    setUsername(currentUsername);
    const videoConstraints = {
      height: window.innerHeight / 2,
      width: window.innerWidth / 2,
      frameRate: { ideal: 15, max: 30 },
    };

    socketRef.current = io(process.env.NEXT_PUBLIC_NODE_SERVER || 'http://localhost:8080');
    let stream = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true });
      userVideo.current.srcObject = stream;
      localStorage.setItem(USER_MEDIA_ACTIVE, true);
    } catch (err) {
      console.warn(err);
    }

    /**
     * Notifiy users in the room that this new user joined
     */
    const roomId = router.query.id[0];
    socketRef.current.emit('join room', { roomId, userId: user?._id, username: currentUsername });

    /**
     * Get information of all users in the room and add them as peers
     * Also populates conversation with redis cache
     */
    socketRef.current.on('all users', ({ users, conversation }) => {
      const peers = [];
      const newParticipants = [];
      newParticipants.push(currentUsername);
      users.forEach((user) => {
        console.debug(users);
        const peer = createPeer(user.socketId, currentUsername, socketRef.current.id, stream);
        peersRef.current.push({
          peerId: user.socketId,
          peerName: user.username,
          peer,
        });
        peers.push(peer);
        newParticipants.push(user.username);
      });
      setParticipants([...newParticipants]);
      if (conversation) {
        conversation = JSON.parse(conversation).map((obj) => {
          if (!obj) return {};
          obj = JSON.parse(obj);
          if (!obj?.message || !obj?.username) return {};
          return { text: obj?.message, sender: obj?.username, fromMe: obj?.username == currentUsername };
        });
        conversation = conversation.filter((obj) => obj !== {});
      }
      conversation && setConversation(conversation ?? []);
    });

    /**
     * Add new user that joins after you as peer
     */
    socketRef.current.on('user joined', (payload) => {
      const peer = addPeer(payload.signal, payload.callerID, stream);
      peersRef.current.push({
        peerId: payload.callerID,
        peerName: payload.username,
        peer,
      });

      setParticipants((curParticipants) => [...curParticipants, payload.username]);
    });

    /**
     * Load signal of new user
     */
    socketRef.current.on('receiving returned signal', (payload) => {
      const receivingPeerObj = peersRef.current.find((p) => p.peerId === payload.id);
      receivingPeerObj.peer.signal(payload.signal);
    });

    /**
     * Receiving message and updating conversation
     */
    socketRef.current.on('return message', (payload) => {
      setConversation((prevConversation) => {
        return [
          ...prevConversation,
          { text: payload.message, sender: payload.username, fromMe: payload.username == currentUsername },
        ];
      });
    });

    /**
     * Remove user as a peer and participant when disconnected
     */
    socketRef.current.on('user disconnect', ({ users }) => {
      let usersPeerID = [];
      let participantNames = [];
      if (users) {
        usersPeerID = users.map((user) => user.socketId);
        participantNames = users.map((user) => user.username);
      }
      if (usersPeerID.length > 0) {
        peersRef.current.forEach((peerRef, index) => {
          if (!usersPeerID.includes(peerRef.peerId)) {
            peerRef.peer.destroy();
            peersRef.current.splice(index, 1);
            setParticipants((prevParticipants) => intersection(prevParticipants, participantNames));
          }
        });
      }
    });
  };

  // ensures initRoom only runs once
  const roomInitialized = useRef(false);
  useEffect(() => {
    if (!loading && !roomInitialized.current) {
      initRoom();
      roomInitialized.current = true;
    }
  }, [loading]);

  const createPeer = (userToSignal, username, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });
    peer.on('signal', (signal) => {
      socketRef.current.emit('sending signal', {
        userToSignal,
        username,
        callerID,
        signal,
      });
    });
    return peer;
  };

  const addPeer = (incomingSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('returning signal', { signal, callerID });
    });

    peer.signal(incomingSignal);
    return peer;
  };

  const leaveCall = () => {
    peersRef.current.forEach((peerObj) => {
      peerObj.peer.destroy();
    });
    router.push(`/room`);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const toggleUserAudio = () => {
    const state = userVideo.current.srcObject.getAudioTracks()[0].enabled;
    setEnableUserAudio(!state);
    userVideo.current.srcObject.getAudioTracks()[0].enabled = !state;
  };

  const toggleUserVideo = () => {
    const state = userVideo.current.srcObject.getVideoTracks()[0].enabled;
    setEnableUserVideo(!state);
    userVideo.current.srcObject.getVideoTracks()[0].enabled = !state;
  };

  const value = {
    socketRef,
    userVideo,
    peersRef,
    username, // further abstract
    conversation,
    participants,
    leaveCall,
    toggleUserAudio,
    toggleUserVideo,
    enableUserAudio,
    enableUserVideo,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

SocketProvider.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
