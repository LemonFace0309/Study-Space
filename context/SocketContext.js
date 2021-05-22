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

  useEffect(async () => {
    const currentStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })
    setStream(currentStream)
    myVideo.current.srcObject = currentStream

    socket.on('me', (id) => {
      console.log(id)
      setMe(id)
    })

    socket.on('calluser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal })
    })
  }, [])

  const answerCall = () => {
    setCallAccepted(true)

    const peer = new Peer({ initiator: false, trickle: false, stream })
    peer.on('signal', (data) => {
      socket.emit('answercall', {
        signal: data,
        to: call.from,
      })
    })
    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream
    })

    peer.signal(call.signal)

    connectionRef.current = peer
  }
  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream })
    peer.on('signal', (data) => {
      socket.emit('calluser', {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      })
    })
    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream
    })

    socket.on('callaccepted', (signal) => {
      setCallAccepted(true)
      peer.signal(signal)
    })

    connectionRef.current = peer
  }
  const leaveCall = () => {
    setCallEnded(true)

    connectionRef.current.destroy()

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
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}
