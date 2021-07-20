import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import { getSession } from 'next-auth/client';
import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator';
import { intersection } from 'lodash';

import { Grid } from '@material-ui/core';

import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@material-ui/core';

import CallOptions from '../../components/Spaces/Video/CallOptions';
import CallTabs from '../../components/Spaces/Video/CallTabs';
import LeaveCall from '../../components/Spaces/Video/LeaveCall';

const PeerVideo = ({ peer }) => {
  const ref = useRef();
  useEffect(() => {
    peer.on('stream', (stream) => {
      ref.current.srcObject = stream;
    });
  }, [peer]);
  return (
    <video autoPlay ref={ref} height="400" width="400">
      <track kind="captions"></track>
    </video>
  );
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
  const [conversation, setConversation] = useState([]);
  const [userAudioShow, setUserAudioShow] = useState(true);
  const [userVideoShow, setUserVideoShow] = useState(true);
  const [showTabs, setShowTabs] = useState(true);
  const [username, setUsername] = useState('');
  const [participants, setParticipants] = useState([]);
  const theme = useTheme();

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
      setUsername(currentUsername);
      const videoConstraints = {
        height: window.innerHeight / 2,
        width: window.innerWidth / 2,
      };

      socketRef.current = io(process.env.NEXT_PUBLIC_NODE_SERVER || 'http://localhost:8080');
      navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then((stream) => {
        userVideo.current.srcObject = stream;
        const roomID = window.location.pathname.replace('/room/', '');
        /**
         * Notifiy users in the room that this new user joined
         */
        socketRef.current.emit('join room', { roomID: roomID, username: currentUsername });

        /**
         * Get information of all users in the room and add them as peers
         */
        socketRef.current.on('all users', (payload) => {
          const peers = [];
          const newParticipants = [];
          newParticipants.push(currentUsername);
          payload.users.forEach((user) => {
            const peer = createPeer(user.socketID, currentUsername, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: user.socketID,
              peer,
            });
            peers.push(peer);
            newParticipants.push(user.username);
          });
          setPeers(peers);
          setParticipants([...newParticipants]);
        });

        /**
         * Add new user that joins after you as peer
         */
        socketRef.current.on('user joined', (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
          setParticipants((curParticipants) => [...curParticipants, payload.username]);
        });

        /**
         * Load signal of new user
         */
        socketRef.current.on('receiving returned signal', (payload) => {
          const receivingPeerObj = peersRef.current.find((p) => p.peerID === payload.id);
          receivingPeerObj.peer.signal(payload.signal);
        });

        /**
         * Receiving message and update conversation
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
        socketRef.current.on('user disconnect', (payload) => {
          let usersPeerID = [];
          let participantNames = [];
          if (payload.users) {
            usersPeerID = payload.users.map((user) => user.socketID);
            participantNames = payload.users.map((user) => user.username);
          }
          if (usersPeerID.length > 0) {
            peersRef.current.forEach((peerRef) => {
              if (!usersPeerID.includes(peerRef.peerID)) {
                const removePeerChannelName = peerRef.peer.channelName;
                setPeers((prevPeers) => prevPeers.filter((peer) => peer.channelName !== removePeerChannelName));
                setParticipants((prevParticipants) => intersection(prevParticipants, participantNames));
                peerRef.peer.destroy();
              }
            });
          }
        });
      });
    };
    initRoom();
  }, []);

  function createPeer(userToSignal, username, callerID, stream) {
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
  }

  function addPeer(incomingSignal, callerID, stream) {
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
  }

  function leaveCall() {
    peersRef.current.forEach((peerObj) => {
      peerObj.peer.destroy();
    });
    router.push(`/room/`);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  function toggleUserAudio() {
    const state = userVideo.current.srcObject.getAudioTracks()[0].enabled;
    setUserAudioShow(!state);
    userVideo.current.srcObject.getAudioTracks()[0].enabled = !state;
  }

  function toggleUserVideo() {
    const state = userVideo.current.srcObject.getVideoTracks()[0].enabled;
    setUserVideoShow(!state);
    userVideo.current.srcObject.getVideoTracks()[0].enabled = !state;
  }

  return (
    <>
      <Grid container className="p-10 relative flex-row justify-between min-h-screen">
        <LeaveCall leaveCall={leaveCall} />
        <CallOptions
          userAudioShow={userAudioShow}
          userVideoShow={userVideoShow}
          toggleUserAudio={toggleUserAudio}
          toggleUserVideo={toggleUserVideo}
        />
        <Grid item xs={12} md={showTabs ? 8 : 12}>
          <div className="p-5 flex flex-row flex-wrap justify-center items-center">
            <video muted ref={userVideo} autoPlay height="400" width="400" />
            {peers.map((peer, index) => {
              return <PeerVideo key={index} peer={peer} />;
            })}
          </div>
        </Grid>
        <CallTabs
          username={username}
          participants={participants}
          socketRef={socketRef}
          conversation={conversation}
          setConversation={setConversation}
          showTabs={showTabs}
          setShowTabs={setShowTabs}
        />
      </Grid>
    </>
  );
};

export default Room;
