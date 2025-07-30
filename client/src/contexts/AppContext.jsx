import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  return (
    <AppContext.Provider value={{
      activeTab, setActiveTab,
      messages, setMessages,
      isListening, setIsListening,
      isSpeaking, setIsSpeaking
    }}>
      {children}
    </AppContext.Provider>
  );
}