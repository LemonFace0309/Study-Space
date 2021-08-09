import React, { useState, useContext, useEffect } from 'react';

// import useLocalStorage from 'hooks/useLocalStorage'
import { useSocket } from './SocketProvider';

const ConversationContext = React.createContext();

export function useConversation() {
  return useContext(ConversationContext);
}

export function ConversationProvider({ children }) {
  // const [conversations, setConversations] = useLocalStorage('conversations', [])
  const [conversation, setConversation] = useState([]);
  const { callAccepted, peerRef, call } = useSocket();

  const addMessageToConversation = ({ text, sender }) => {
    let fromMe = false;
    if (!sender) {
      fromMe = true;
    }
    setConversation((prevConversation) => {
      return [...prevConversation, { text, sender, fromMe }];
    });
  };

  const sendMessage = (text) => {
    if (!peerRef.current) return false;

    peerRef.current.send(text);
    addMessageToConversation({ text });
    return true;
  };

  useEffect(() => {
    if (!callAccepted || !peerRef.current) return;

    peerRef.current.on('data', (data) => {
      data = new TextDecoder('utf-8').decode(data);
      console.log(call.name);
      addMessageToConversation({ text: data, sender: call.name });
    });

    return;
  }, [callAccepted]);

  const value = {
    conversation,
    sendMessage,
  };

  return <ConversationContext.Provider value={value}>{children}</ConversationContext.Provider>;
}

// const arrayEquality = (a, b,) => {
//   if (a.length !== b.length) return false

//   a.sort()
//   b.sort()

//   return a.every((element, index) => {
//     return element === b[index]
//   })
// }
