import React, { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router'
import io from "socket.io-client";
import Peer from "simple-peer";
import Chat from '../../components/Spaces/Chat'
import { Grid } from '@material-ui/core'

const PeerVideo = ({ peer }) => {
  const ref = useRef();
  useEffect(() => {
    peer.on("stream", stream => {
      ref.current.srcObject = stream;
    })
  }, []);
  return (
    <video playsInline autoPlay ref={ref} />
  );
}

const Room = () => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const router = useRouter()
  const roomID = router.query;
  const [conversation, setConversation] = useState([])


  useEffect(() => {
    const videoConstraints = {
      height: window.innerHeight / 2,
      width: window.innerWidth / 2
    };

    socketRef.current = io(process.env.NODE_SERVER || 'http://localhost:8080')
    navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
      userVideo.current.srcObject = stream;
      socketRef.current.emit("join room", roomID);
      socketRef.current.on("all users", users => {
        const peers = [];
        users.forEach(userID => {
          const peer = createPeer(userID, socketRef.current.id, stream);
          peersRef.current.push({
            peerID: userID,
            peer,
          })
          peers.push(peer);
        })
        setPeers(peers);
      })

      socketRef.current.on("user joined", payload => {
        const peer = addPeer(payload.signal, payload.callerID, stream);
        peersRef.current.push({
          peerID: payload.callerID,
          peer,
        })

        setPeers(users => [...users, peer]);
      });

      socketRef.current.on("receiving returned signal", payload => {
        const item = peersRef.current.find(p => p.peerID === payload.id);
        item.peer.signal(payload.signal);
      });
    })
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });
    peer.on("signal", signal => {
      socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
    })

    peer.on("data", data => {
      data = new TextDecoder("utf-8").decode(data)
      setConversation(prevConversation => {
        return [...prevConversation, { text: data }]
      })
    })
    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    })

    peer.on("signal", signal => {
      socketRef.current.emit("returning signal", { signal, callerID })
    })

    peer.on("data", data => {
      data = new TextDecoder("utf-8").decode(data)
      setConversation(prevConversation => {
        return [...prevConversation, { text: data }]
      })
    })

    peer.signal(incomingSignal);
    return peer;
  }

  return (
    <div>
      <Grid container spacing={2} direction="row">
        <Grid className="flex flex-col items-center w-full" item xs={12} md={6}>
          <div>
            <video muted ref={userVideo} autoPlay playsInline />
            {peers.map((peer, index) => {
              return (
                <PeerVideo key={index} peer={peer} />
              );
            })}
          </div>
        </Grid>
        <Grid item xs={12} md={6} className="flex flex-col items-center">
          <Chat
            peersRef={peersRef}
            conversation={conversation}
            setConversation={setConversation}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Room;
