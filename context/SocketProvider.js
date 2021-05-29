import React, { useState, useRef, useEffect, useContext } from 'react'
import { io } from 'socket.io-client'
import Peer from 'simple-peer'

const SocketContext = React.createContext()

const socket = io(process.env.NODE_SERVER || 'http://localhost:8080')

export const useSocket = () => useContext(SocketContext)

export const SocketProvider = ({ children }) => {
  const [stream, setStream] = useState(null)
  const [me, setMe] = useState('')
  const [call, setCall] = useState({})
  const [callAccepted, setCallAccepted] = useState(false)
  const [callEnded, setCallEnded] = useState(false)
  const [name, setName] = useState('')

  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()
  const peer = useRef()

  useEffect(async () => {
    const currentStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })
    setStream(currentStream)
    if (myVideo.current) {
      myVideo.current.srcObject = currentStream
    }

    socket.emit('getId')

    socket.on('me', (id) => {
      setMe(id)
    })

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal })
    })
  }, [])

  const answerCall = () => {
    setCallAccepted(true)

    peer.current = new Peer({ initiator: false, trickle: false, stream })
    peer.current.on('signal', (data) => {
      socket.emit('answerCall', {
        signal: data,
        to: call.from,
        name,
      })
    })
    peer.current.on('stream', (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream
      }
    })

    // required to accept stream data
    peer.current.signal(call.signal)

    connectionRef.current = peer.current
  }

  const callUser = (id) => {

    peer.current = new Peer({ initiator: true, trickle: false, stream })
    peer.current.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      })
    })
    peer.current.on('stream', (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream
      }
    })

    socket.on('callAccepted', ({ name, signal }) => {
      setCall({ isReceivedCall: false, name, signal })
      setCallAccepted(true)
      // required to accept stream data
      peer.current.signal(signal)
    })

    connectionRef.current = peer.current
  }

  const leaveCall = () => {
    setCallEnded(true)

    connectionRef.current.destroy()
    peer.current.destroy()

    window.location.reload()
  }

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
        peer,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}
