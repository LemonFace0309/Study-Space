  
import React, { useState, useContext, useCallback, useEffect } from 'react'

// import useLocalStorage from '../hooks/useLocalStorage'
import { useSocket } from './SocketProvider';

const ConversationContext = React.createContext()

export function useConversation() {
  return useContext(ConversationContext)
}

export function ConversationProvider({ children }) {
  // const [conversations, setConversations] = useLocalStorage('conversations', [])
  const [conversation, setConversation] = useState([])
  const { peer, callAccepted, name } = useSocket()

  const addMessageToConversation = ({ text, sender }) => {
    let fromMe = false
    if (!sender) {
      fromMe = true
    }
    setConversation(prevConversation => {
      return [...prevConversation, { text, sender, fromMe }]
    })
  }

  const sendMessage = (text) => {
    peer.current.send(text)
    addMessageToConversation({ text })
  }

  useEffect(() => {
    if (!callAccepted || !peer) return

    peer.current.on('data', data => {
      addMessageToConversation({ text: data, sender: name })
    })
  }, [callAccepted, peer, addMessageToConversation])

  const value = {
    conversation,
    sendMessage,
  }

  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  )
}

// const arrayEquality = (a, b,) => {
//   if (a.length !== b.length) return false

//   a.sort()
//   b.sort()

//   return a.every((element, index) => {
//     return element === b[index]
//   })
// }
