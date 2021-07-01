import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import { getSession } from 'next-auth/client';
import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator';

import { Grid } from '@material-ui/core';

import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

import Chat from '../../components/Spaces/Chat';

const PeerVideo = ({ peer }) => {
  const ref = useRef();
  useEffect(() => {
    peer.on('stream', (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);
  return <video autoPlay ref={ref} height="400" width="400" />;
};

PeerVideo.propTypes = {
  peer: PropTypes.object.isRequired,
};

const Room = () => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const router = useRouter();
  const roomID = router.query;
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const initRoom = async () => {
      const userSession = await getSession();
      let currentUsername = '';
      if (userSession) {
        currentUsername = userSession.user.name;
      } else {
        const randomName = uniqueNamesGenerator({
          dictionaries: [colors, animals],
          style: 'capital',
          separator: ' ',
        });
        currentUsername = randomName;
      }
      const videoConstraints = {
        height: window.innerHeight / 2,
        width: window.innerWidth / 2,
      };

      socketRef.current = io(process.env.NODE_SERVER || 'http://localhost:8080');
      navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit('join room', roomID);
        socketRef.current.on('all users', (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream, currentUsername);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on('user joined', (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream, currentUsername);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on('receiving returned signal', (payload) => {
          const receivingPeerObj = peersRef.current.find((p) => p.peerID === payload.id);
          receivingPeerObj.peer.signal(payload.signal);
        });
      });
    };
    initRoom();
  }, []);

  function createPeer(userToSignal, callerID, stream, currentUsername) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });
    peer.on('signal', (signal) => {
      socketRef.current.emit('sending signal', {
        userToSignal,
        callerID,
        signal,
      });
    });

    peer.on('data', (data) => {
      data = new TextDecoder('utf-8').decode(data);
      setConversation((prevConversation) => {
        return [...prevConversation, { text: data, sender: currentUsername }];
      });
    });
    return peer;
  }

  function addPeer(incomingSignal, callerID, stream, currentUsername) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('returning signal', { signal, callerID });
    });

    peer.on('data', (data) => {
      data = new TextDecoder('utf-8').decode(data);
      setConversation((prevConversation) => {
        return [...prevConversation, { text: data, sender: currentUsername }];
      });
    });

    peer.signal(incomingSignal);
    return peer;
  }

  return (
    <Grid container spacing={2} className="flex-row justify-between h-screen" style={{ background: '#DDA0DD' }}>
      <Grid item xs={12} md={8}>
        <div className="p-5 flex flex-row flex-wrap justify-center items-center">
          <video muted ref={userVideo} autoPlay height="400" width="400" />
          {peers.map((peer, index) => {
            return <PeerVideo key={index} peer={peer} />;
          })}
        </div>
      </Grid>
      <Grid item xs={12} md={4} className="p-5 flex flex-col items-center">
        <Chat peersRef={peersRef} conversation={conversation} setConversation={setConversation} />
      </Grid>
    </Grid>
  );
};

export default Room;
