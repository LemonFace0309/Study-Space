import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import addMilliseconds from 'date-fns/addMilliseconds';
import { getSession } from 'next-auth/client';
import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator';
import { intersection } from 'lodash';
import { useSetRecoilState } from 'recoil';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Grid } from '@material-ui/core';

import { RoomProvider } from '@/context/RoomContext';
import CallOptions from '@/components/Spaces/VideoOptions/CallOptions';
import CallTabs from '@/components/Spaces/CallTabs';
import * as spotifyState from '@/atoms/spotify';

const USER_MEDIA_ACTIVE = 'USER_MEDIA_ACTIVE';

const PeerVideo = ({ peer, username }) => {
  const ref = useRef();
  useEffect(() => {
    peer.on('stream', (stream) => {
      ref.current.srcObject = stream;
    });
  }, [peer]);
  return (
    <div className="flex flex-col">
      <video muted={JSON.parse(localStorage.getItem(USER_MEDIA_ACTIVE))} autoPlay ref={ref} height="400" width="400">
        <track kind="captions"></track>
      </video>
      <span>{username}</span>
    </div>
  );
};

PeerVideo.propTypes = {
  peer: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
};

const Room = ({ roomID, spotifyAuthURL, spotifyData }) => {
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
  const setRoomID = useSetRecoilState(spotifyState.roomID);
  const setSpotifyAuthURL = useSetRecoilState(spotifyState.spotifyAuthURL);
  const setSpotifyRefresh = useSetRecoilState(spotifyState.refresh);

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
        peerID: payload.callerID,
        peerName: payload.username,
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

  const initRecoilState = () => {
    setRoomID(roomID);
    setSpotifyAuthURL(spotifyAuthURL);
    if (spotifyData) {
      // redirected back to room and user clicked signed into Spotify in call tab.
      const expiresIn = spotifyData.expiresIn * 1000;
      const date = new Date();
      const expireDate = addMilliseconds(date, expiresIn);
      const refreshDate = addMilliseconds(date, expiresIn / 4);
      setSpotifyRefresh({ expiresIn, expireDate, refreshDate });
      console.debug('Successfully authenticated with shopify:', spotifyData);
      // replaces url query to prevent user from copying/pasting space url to friends with unnecessary data
      router.replace('/room/[...id]', `/room/${roomID}`);
    }
  };

  useEffect(() => {
    initRoom();
    initRecoilState();
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
    <RoomProvider>
      <Grid container className="p-10 relative flex-row justify-between h-screen bg-gray-50">
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
              return <PeerVideo key={peerObj.peerID} peer={peerObj.peer} username={peerObj.peerName} />;
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
          spotifyAuthURL={spotifyAuthURL}
        />
      </Grid>
    </RoomProvider>
  );
};

Room.propTypes = {
  roomID: PropTypes.string.isRequired,
  spotifyAuthURL: PropTypes.string.isRequired,
  spotifyData: PropTypes.object,
};

export default Room;

export async function getServerSideProps({ locale, params, query }) {
  let spotifyData = null;
  if (query && query.data) {
    try {
      spotifyData = JSON.parse(query.data);
    } catch (err) {
      console.debug('Error occured while trying to parse spotify data from url query:', err);
    }
  }

  return {
    props: {
      roomID: params.id[0],
      spotifyAuthURL: `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`,
      ...(await serverSideTranslations(locale, ['common'])),
      spotifyData,
    },
  };
}
