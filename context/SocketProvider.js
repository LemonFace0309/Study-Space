import React, { useState, useRef, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = React.createContext();

const socket = io(process.env.NODE_SERVER || 'http://localhost:8080');

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [stream, setStream] = useState(null);
  const [me, setMe] = useState('');
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const peerRef = useRef();

  useEffect(async () => {
    const currentStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setStream(currentStream);
    if (myVideo.current) {
      myVideo.current.srcObject = currentStream;
    }

    socket.emit('getId');

    socket.on('me', (id) => {
      setMe(id);
    });

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    peerRef.current = new Peer({ initiator: false, trickle: false, stream });
    peerRef.current.on('signal', (data) => {
      socket.emit('answerCall', {
        signal: data,
        to: call.from,
        name,
      });
    });
    peerRef.current.on('stream', (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    // required to accept stream data
    peerRef.current.signal(call.signal);
  };

  const callUser = (id) => {
    if (id === me) {
      throw new Error("Don't be weird! Call someone else.");
    }

    peerRef.current = new Peer({ initiator: true, trickle: false, stream });
    peerRef.current.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });
    peerRef.current.on('stream', (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    socket.on('callAccepted', ({ name, signal }) => {
      setCall({ isReceivedCall: false, name, signal });
      setCallAccepted(true);
      // required to accept stream data
      peerRef.current.signal(signal);
    });
  };

  const leaveCall = () => {
    setCallEnded(true);

    peerRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        peerRef,
        callUser,
        leaveCall,
        answerCall,
      }}>
      {children}
    </SocketContext.Provider>
  );
};
