import { createContext, useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator';
import { useRecoilValue } from 'recoil';
import { intersection } from 'lodash';

import * as userState from 'atoms/user';

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ loading, children }) => {
  const router = useRouter();
  const user = useRecoilValue(userState.user);
  const socketRef = useRef();
  const myStream = useRef();
  const peersRef = useRef([]);
  const [conversation, setConversation] = useState([]);
  const [username, setUsername] = useState('');
  const [participants, setParticipants] = useState([]);
  const [isMyVideoEnabled, setIsMyVideoEnabled] = useState(true);
  const [isMyAudioEnabled, setIsMyAudioEnabled] = useState(true);

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
      video: { facingMode: 'user' },
      frameRate: { ideal: 15, max: 30 },
    };

    let stream = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true });
      myStream.current.srcObject = stream;
    } catch (err) {
      console.warn(err);
    }

    socketRef.current = io(process.env.NEXT_PUBLIC_NODE_SERVER || 'http://localhost:8080');

    /**
     * Notifiy users in the room that this new user joined
     */
    const roomId = router.query.id[0];
    socketRef.current.emit('join room', { roomId, userId: user?._id, username: currentUsername });

    /**
     * Get information of others users in the room and add them as peers
     * Also populates conversation with redis cache
     */
    socketRef.current.on('other users', ({ users, conversation }) => {
      const newParticipants = [];
      newParticipants.push(currentUsername);

      users.forEach((user) => {
        createPeer(user.socketId, currentUsername, socketRef.current.id, user.username, stream);
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
    socketRef.current.on('offer', (payload) => {
      addPeer(payload.signal, payload.callerID, payload.username, stream);

      setParticipants((curParticipants) => [...curParticipants, payload.username]);
    });

    /**
     * Load signal of new user
     */
    socketRef.current.on('answer', (payload) => {
      const receivingPeerObj = peersRef.current.find((p) => p.peerId === payload.id);
      receivingPeerObj.peer.signal(payload.signal);
    });

    /**
     * Receiving message and updating conversation
     */
    socketRef.current.on('message', (payload) => {
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

  const createPeer = (userToSignal, myUsername, callerID, username, myStream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: myStream,
    });

    // fires immediately and also after modifying the stream being sent.
    peer.on('signal', (signal) => {
      socketRef.current.emit('offer', {
        userToSignal,
        username: myUsername,
        callerID,
        signal,
      });
    });

    peer.on('stream', (stream) => {
      const peerObj = peersRef.current.find((peer) => peer.peerId === userToSignal);
      peerObj.stream = stream;
      setParticipants((prev) => [...prev]); // force refresh in VideoStreams component
    });

    peersRef.current.push({
      peerId: userToSignal,
      peerName: username,
      stream: null,
      peer,
    });
  };

  /**
   * NOTE: this function is reexecuted everytime a peer signals you again (ie. he/she screen shares).
   * That's why peers are only pushed onto the peersRef array given that they don't already exist.
   */
  const addPeer = (incomingSignal, callerID, username, myStream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: myStream,
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('answer', { signal, callerID });
    });

    peer.on('stream', (stream) => {
      let peerObj = peersRef.current.find((obj) => obj.peerId === callerID);
      if (peerObj) {
        peerObj.stream = stream;
      } else {
        peersRef.current.push({
          peerId: callerID,
          peerName: username,
          stream,
          peer,
        });
      }

      setParticipants((prev) => [...prev]); // force refresh in VideoStreams component
    });

    peer.signal(incomingSignal);
  };

  const sendMessage = (roomId, message, username) => {
    socketRef.current.emit('message', {
      roomId,
      message,
      username,
    });
  };

  const shareScreen = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ cursor: true });
      const screenTrack = stream.getTracks()[0];
      peersRef.current.forEach((peerObj) => {
        peerObj.peer.replaceTrack(
          myStream.current.srcObject.getVideoTracks()[0],
          screenTrack,
          myStream.current.srcObject
        );
      });

      screenTrack.onended = () => {
        peersRef.current.forEach((peerObj) => {
          peerObj.peer.replaceTrack(
            screenTrack,
            myStream.current.srcObject.getVideoTracks()[0],
            myStream.current.srcObject
          );
        });
      };
    } catch (err) {
      console.debug('Unable to share screens:', err);
    }
  };

  const leaveCall = () => {
    peersRef.current.forEach((peerObj) => {
      peerObj.peer.destroy();
    });
    router.push(`/dashboard`);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const toggleMyAudio = () => {
    const state = myStream.current.srcObject.getAudioTracks()[0].enabled;
    setIsMyVideoEnabled(!state);
    myStream.current.srcObject.getAudioTracks()[0].enabled = !state;
  };

  const toggleMyVideo = () => {
    const state = myStream.current.srcObject.getVideoTracks()[0].enabled;
    setIsMyAudioEnabled(!state);
    myStream.current.srcObject.getVideoTracks()[0].enabled = !state;
  };

  const value = {
    socketRef,
    myStream,
    peersRef,
    username, // further abstract
    conversation,
    participants,
    sendMessage,
    shareScreen,
    leaveCall,
    toggleMyAudio,
    toggleMyVideo,
    isMyVideoEnabled,
    isMyAudioEnabled,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

SocketProvider.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};
