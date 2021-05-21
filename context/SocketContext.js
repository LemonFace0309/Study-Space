import React, { useState, useRef, useEffect } from 'react'
import { io } from 'socket.io-client'

const SocketContext = React.createContext()

const socket = io(process.env.NODE_SERVER || 'http://localhost:8080')

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null)
  const [me, setMe] = useState('')
  const [call, setCall] = useState({})

  const myVideo = useRef()

  useEffect(async () => {
    const currentStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })
    setStream(currentStream)
    myVideo.current.srcObject = currentStream

    socket.on('me', (id) => {
      setMe(id)
    })

    socket.on('calluser', ({ from, name: callerName, signal }) => {
      setCall({ isReceivedCall: true, from, name: callerName, signal })
    })
  }, [])

  const answerCall = () => {}
  const callUser = () => {}
  const leaveCall = () => {}

  return <SocketContext.Provider>{children}</SocketContext.Provider>
}
