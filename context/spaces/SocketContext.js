import { createContext, useContext, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Peer from 'simple-peer';
import io from 'socket.io-client';
import { useRecoilValue } from 'recoil';
import { intersection } from 'lodash';

import * as userState from '@/atoms/user';
import useStateRef from '@/hooks/useStateRef';
import { useStatusBubbleContext } from './StatusBubbleContext';
import LOADING_ENUM from './libs/loadingEnum';
import * as utils from './utils/socket';

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ loading, username, role, children }) => {
  const router = useRouter();
  const { statusBubble, statusBubbleRef, setStatusActiveTemp } = useStatusBubbleContext();
  const user = useRecoilValue(userState.user);
  const socketRef = useRef();
  const myStream = useRef();
  const myScreenShare = useRef();
  const [peers, setPeers, peersRef] = useStateRef([]);
  const [conversation, setConversation] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [isMyAudioEnabled, setIsMyAudioEnabled, isMyAudioEnabledRef] = useStateRef(false);
  const [isMyVideoEnabled, setIsMyVideoEnabled, isMyVideoEnabledRef] = useStateRef(false);
  const [isScreenShare, setIsScreenShare, isScreenShareRef] = useStateRef(false);

  const initRoom = async () => {
    const videoConstraints = {
      height: window.innerHeight / 2,
      width: window.innerWidth / 2,
      video: { facingMode: 'user' },
      frameRate: { ideal: 15, max: 30 },
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true });
      myStream.current.srcObject = stream;
      myStream.current.srcObject.getAudioTracks()[0].enabled = false;
      myStream.current.srcObject.getVideoTracks()[0].enabled = false;
    } catch (err) {
      console.warn(err);
    }

    socketRef.current = io(process.env.NEXT_PUBLIC_NODE_SERVER || 'http://localhost:8080');

    /**
     * Notifiy users in the room that this new user joined
     */
    const roomId = router.query.id ? router.query.id[0] : null;
    socketRef.current.emit('join room', { roomId, userId: user?._id, username, role });

    /**
     * Get information of others users in the room and add them as peers
     * Also populates conversation with redis cache
     */
    socketRef.current.on('other users', ({ users, conversation }) => {
      const newParticipants = [];
      newParticipants.push(username);

      users.forEach((user) => {
        createPeer(user.socketId, user.username, user.role);
        newParticipants.push(user.username);
      });
      setParticipants([...newParticipants]);

      if (conversation) {
        conversation = JSON.parse(conversation).map((obj) => {
          if (!obj) return {};
          obj = JSON.parse(obj);
          if (!obj?.message || !obj?.username) return {};
          return { text: obj?.message, sender: obj?.username, fromMe: obj?.username == username };
        });
        conversation = conversation.filter((obj) => obj !== {});
        setConversation(conversation);
      }
    });

    /**
     * Add new user that joins after you as peer
     */
    socketRef.current.on('offer', (payload) => {
      addPeer(payload);

      setParticipants((curParticipants) => [...curParticipants, payload.username]);
    });

    /**
     * Load signal of new user
     */
    socketRef.current.on('answer', (payload) => {
      const peerObj = peersRef.current.find((p) => p.peerId === payload.id);
      peerObj.isAudioEnabled = payload.isAudioEnabled;
      peerObj.isVideoEnabled = payload.isVideoEnabled;
      peerObj.statusBubble = payload.statusBubble;
      peerObj.peer.signal(payload.signal);
      setPeers((prev) => [...prev]); // force refresh in VideoStreams component
    });

    /**
     * Receiving message and updating conversation
     */
    socketRef.current.on('message', (payload) => {
      setConversation((prevConversation) => {
        return [
          ...prevConversation,
          { text: payload.message, sender: payload.username, fromMe: payload.username == username, dm: false },
        ];
      });
    });

    /**
     * Receiving dm and updating conversation
     */
    socketRef.current.on('dm', (payload) => {
      setConversation((prevConversation) => {
        return [
          ...prevConversation,
          { text: payload.message, sender: payload.username, fromMe: payload.username == username, dm: true },
        ];
      });
    });

    /**
     * Peer mutes/unmutes mic
     */
    socketRef.current.on('isAudioEnabled', ({ id, enabled }) => {
      const peerObj = peersRef.current.find((peerObj) => peerObj.peerId == id);
      peerObj.isAudioEnabled = enabled;
      setParticipants((prev) => [...prev]); // force refresh in VideoStreams component
    });

    /**
     * Peer turns on/off video
     */
    socketRef.current.on('isVideoEnabled', ({ id, enabled }) => {
      const peerObj = peersRef.current.find((peerObj) => peerObj.peerId == id);
      peerObj.isVideoEnabled = enabled;
      setParticipants((prev) => [...prev]); // force refresh in VideoStreams component
    });

    /**
     * Peer status bubble changes
     */
    socketRef.current.on('statusBubble', ({ id, statusBubble }) => {
      const peerObj = peersRef.current.find((p) => p.peerId === id);
      peerObj.statusBubble = statusBubble;
      setParticipants((prev) => [...prev]); // force refresh in VideoStreams component
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
            setPeers(([...prev]) => {
              prev.splice(index, 1);
              return prev;
            });
            setParticipants((prevParticipants) => intersection(prevParticipants, participantNames));
          }
        });
      }
    });
  };

  // ensures initRoom only runs once
  const roomInitialized = useRef(false);
  useEffect(() => {
    if (loading != LOADING_ENUM.LOADING && !roomInitialized.current) {
      initRoom();
      roomInitialized.current = true;
    }
  }, [loading]);

  useEffect(() => {
    if (!roomInitialized.current || !socketRef.current) return;
    socketRef.current.emit('statusBubble', { statusBubble });
  }, [statusBubble]);

  const createPeer = (userToSignal, pUsername, pRole) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: myStream.current.srcObject,
    });

    // fires immediately and also after modifying the stream being sent.
    peer.on('signal', (signal) => {
      socketRef.current.emit('offer', {
        userToSignal,
        username,
        role,
        callerID: socketRef.current.id,
        signal,
        isAudioEnabled: isMyAudioEnabledRef.current,
        isVideoEnabled: isMyVideoEnabledRef.current,
        statusBubble: statusBubbleRef.current,
      });
    });

    peer.on('stream', (stream) => {
      const peerObj = peersRef.current.find((peer) => peer.peerId === userToSignal);
      peerObj.stream = stream;
      setParticipants((prev) => [...prev]); // force refresh in VideoStreams component
    });

    setPeers((prev) => {
      prev.push({
        peerId: userToSignal,
        peerName: pUsername,
        role: pRole,
        stream: null,
        isAudioEnabled: true,
        isVideoEnabled: true,
        statusBubble: null,
        peer,
      });
      return prev;
    });
  };

  /**
   * NOTE: this function is reexecuted everytime a peer signals you again (ie. he/she screen shares).
   * That's why peers are only pushed onto the peersRef array given that they don't already exist.
   */
  const addPeer = ({
    signal: incomingSignal,
    callerID,
    username: pUsername,
    role: pRole,
    isAudioEnabled,
    isVideoEnabled,
    statusBubble: pStatusBubble,
  }) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: myStream.current.srcObject,
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('answer', {
        signal,
        callerID,
        isAudioEnabled: isMyAudioEnabledRef.current,
        isVideoEnabled: isMyVideoEnabledRef.current,
        statusBubble: statusBubbleRef.current,
      });
    });

    peer.on('stream', (stream) => {
      let peerObj = peersRef.current.find((obj) => obj.peerId === callerID);
      if (peerObj) {
        peerObj.stream = stream;
      } else {
        setPeers(([...prev]) => {
          prev.push({
            peerId: callerID,
            peerName: pUsername,
            role: pRole,
            stream,
            isAudioEnabled: isAudioEnabled,
            isVideoEnabled: isVideoEnabled,
            statusBubble: pStatusBubble,
            peer,
          });
          return prev;
        });
      }

      setParticipants((prev) => [...prev]); // force refresh in VideoStreams component
    });

    if (isScreenShareRef.current) {
      peer.replaceTrack(
        myStream.current.srcObject.getVideoTracks()[0],
        myScreenShare.current.srcObject.getTracks()[0],
        myStream.current.srcObject
      );
    }

    peer.signal(incomingSignal);
  };

  const sendMessage = (message) => {
    setStatusActiveTemp();
    socketRef.current.emit('message', {
      message,
      username,
    });
  };

  const directMessage = (message, peerId) => {
    setStatusActiveTemp();
    socketRef.current.emit('dm', {
      message,
      username,
      socketId: peerId,
    });
  };

  const shareScreen = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ cursor: true });
      setIsScreenShare(true);
      myScreenShare.current.srcObject = stream;
      const screenTrack = stream.getTracks()[0];

      setPeers(([...prev]) => {
        prev.forEach((peerObj) => {
          peerObj.peer.replaceTrack(
            myStream.current.srcObject.getVideoTracks()[0],
            screenTrack,
            myStream.current.srcObject
          );
        });
        return prev;
      });

      screenTrack.onended = () => {
        setPeers(([...prev]) => {
          prev.forEach((peerObj) => {
            peerObj.peer.replaceTrack(
              screenTrack,
              myStream.current.srcObject.getVideoTracks()[0],
              myStream.current.srcObject
            );
          });
          return prev;
        });
        setIsScreenShare(false);
        myScreenShare.current.srcObject = null;
      };
    } catch (err) {
      console.debug('Unable to share screens:', err);
    }
  };

  const leaveCall = () => {
    setPeers(([...prev]) => {
      prev.forEach((peerObj) => {
        peerObj.peer.destroy();
      });
      return prev;
    });

    router.push(`/dashboard`);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const toggleMyAudio = () => {
    const state = myStream.current.srcObject.getAudioTracks()[0].enabled;
    setIsMyAudioEnabled(!state);
    myStream.current.srcObject.getAudioTracks()[0].enabled = !state;

    socketRef.current.emit('isAudioEnabled', { enabled: !state });
  };

  const toggleMyVideo = () => {
    const state = myStream.current.srcObject.getVideoTracks()[0].enabled;
    setIsMyVideoEnabled(!state);
    myStream.current.srcObject.getVideoTracks()[0].enabled = !state;

    socketRef.current.emit('isVideoEnabled', { enabled: !state });
  };

  const disconnect = () => {
    socketRef.current.disconnect();
  };

  const value = {
    socketRef,
    myStream,
    myScreenShare,
    peers,
    conversation,
    participants,
    isMyVideoEnabled,
    isMyAudioEnabled,
    isScreenShare,
    sendMessage,
    directMessage,
    shareScreen,
    leaveCall,
    toggleMyAudio,
    toggleMyVideo,
    disconnect,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};

SocketProvider.propTypes = {
  loading: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
