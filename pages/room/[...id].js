import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import { getSession } from 'next-auth/client';
import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator';
import { intersection } from 'lodash';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Grid } from '@material-ui/core';

import CallOptions from '@/components/Spaces/VideoOptions/CallOptions';
import CallTabs from '@/components/Spaces/CallTabs';
import LeaveCall from '@/components/Spaces/VideoOptions/LeaveCall';

const USER_MEDIA_ACTIVE = 'USER_MEDIA_ACTIVE';

const PeerVideo = ({ peer }) => {
  const ref = useRef();
  useEffect(() => {
    peer.on('stream', (stream) => {
      ref.current.srcObject = stream;
    });
  }, [peer]);
  return (
    <video muted={JSON.parse(localStorage.getItem(USER_MEDIA_ACTIVE))} autoPlay ref={ref} height="400" width="400">
      <track kind="captions"></track>
    </video>
  );
};

PeerVideo.propTypes = {
  peer: PropTypes.object.isRequired,
};

const Room = ({ roomID }) => {
  const router = useRouter();
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const [conversation, setConversation] = useState([]);
  const [userAudioShow, setUserAudioShow] = useState(true);
  const [userVideoShow, setUserVideoShow] = useState(true);
  const [showTabs, setShowTabs] = useState(false);
  const [username, setUsername] = useState('');
  const [participants, setParticipants] = useState([]);

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
    socketRef.current.emit('join room', { roomID, username: currentUsername });

    /**
     * Get information of all users in the room and add them as peers
     * Also populates conversation with redis cache
     */
    socketRef.current.on('all users', ({ users, conversation }) => {
      const peers = [];
      const newParticipants = [];
      newParticipants.push(currentUsername);
      users.forEach((user) => {
        const peer = createPeer(user.socketID, currentUsername, socketRef.current.id, stream);
        peersRef.current.push({
          peerID: user.socketID,
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
        peerID: payload.callerID,
        peer,
      });

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
    socketRef.current.on('user disconnect', (payload) => {
      let usersPeerID = [];
      let participantNames = [];
      if (payload.users) {
        usersPeerID = payload.users.map((user) => user.socketID);
        participantNames = payload.users.map((user) => user.username);
      }
      if (usersPeerID.length > 0) {
        peersRef.current.forEach((peerRef, index) => {
          if (!usersPeerID.includes(peerRef.peerID)) {
            peerRef.peer.destroy();
            peersRef.current.splice(index, 1);
            setParticipants((prevParticipants) => intersection(prevParticipants, participantNames));
          }
        });
      }
    });
  };

  useEffect(() => {
    initRoom();
  }, []);

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
    setUserAudioShow(!state);
    userVideo.current.srcObject.getAudioTracks()[0].enabled = !state;
  };

  const toggleUserVideo = () => {
    const state = userVideo.current.srcObject.getVideoTracks()[0].enabled;
    setUserVideoShow(!state);
    userVideo.current.srcObject.getVideoTracks()[0].enabled = !state;
  };

  return (
    <>
      <Grid container className="p-10 relative flex-row justify-between h-screen bg-gray-50">
        <LeaveCall leaveCall={leaveCall} />
        <CallOptions
          userAudioShow={userAudioShow}
          userVideoShow={userVideoShow}
          toggleUserAudio={toggleUserAudio}
          toggleUserVideo={toggleUserVideo}
          leaveCall={leaveCall}
        />
        <Grid item xs={12} md={showTabs ? 6 : 12} lg={showTabs ? 7 : 12} xl={showTabs ? 8 : 12}>
          <div className="p-5 flex flex-row flex-wrap justify-center items-center">
            <video muted ref={userVideo} autoPlay height="400" width="400" />
            {peersRef.current.map((peerObj) => {
              return <PeerVideo key={peerObj.peerID} peer={peerObj.peer} />;
            })}
          </div>
        </Grid>
        <CallTabs
          username={username}
          participants={participants}
          socketRef={socketRef}
          roomID={roomID}
          conversation={conversation}
          setConversation={setConversation}
          showTabs={showTabs}
          setShowTabs={setShowTabs}
        />
      </Grid>
    </>
  );
};

Room.propTypes = {
  roomID: PropTypes.string.isRequired,
};

export default Room;

export async function getServerSideProps({ locale, params }) {
  return {
    props: {
      roomID: params.id[0],
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
