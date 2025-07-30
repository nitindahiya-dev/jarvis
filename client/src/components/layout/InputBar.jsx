import React, { useState, useContext, useRef } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { SoundContext } from '../../contexts/SoundContext';
import useHapticFeedback from '../../hooks/useHapticFeedback';
import { PaperAirplaneIcon, MicrophoneIcon, XCircleIcon } from '@heroicons/react/24/outline';

const InputBar = () => {
  const [inputValue, setInputValue] = useState('');
  const { isListening, setIsListening, setMessages } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
  const { playSend, playNotification } = useContext(SoundContext);
  const { mediumTap, successPulse } = useHapticFeedback();
  const inputRef = useRef(null);
  
  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    }]);
    
    playSend();
    successPulse();
    setInputValue('');
    
    // TODO: Send to AI and get response
  };
  
  const toggleVoiceInput = () => {
    mediumTap();
    playNotification();
    setIsListening(!isListening);
    if (!isListening) {
      inputRef.current?.focus();
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div 
      className="px-6 py-4 border-t"
      style={{ 
        backgroundColor: theme.card,
        borderColor: theme.primary + '20'
      }}
    >
      <div className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? "I'm listening, speak now..." : "Message Jarvis..."}
            className="w-full min-h-[60px] max-h-32 py-3 px-4 rounded-2xl border resize-none focus:outline-none focus:ring-2 transition-all"
            style={{
              backgroundColor: theme.background === '#0f172a' ? '#1e293b' : '#f1f5f9',
              borderColor: theme.primary + '30',
              color: theme.text,
              paddingRight: '50px',
              focus: {
                ringColor: theme.primary
              }
            }}
          />
          
          <div className="absolute right-3 bottom-3 flex items-center space-x-2">
            {inputValue && (
              <button 
                onClick={() => setInputValue('')}
                className="text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-300 transition-colors"
              >
                <XCircleIcon className="w-5 h-5" />
              </button>
            )}
            
            <button 
              onClick={toggleVoiceInput}
              className={`p-1 rounded-full ${
                isListening 
                  ? 'text-red-500 animate-pulse' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-300'
              }`}
            >
              <MicrophoneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <button
          onClick={handleSend}
          disabled={!inputValue.trim()}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            inputValue.trim() 
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg shadow-indigo-500/30' 
              : 'bg-gray-200 dark:bg-slate-700'
          }`}
        >
          <PaperAirplaneIcon 
            className={`w-5 h-5 transform rotate-45 ${
              inputValue.trim() ? 'text-white' : 'text-gray-400 dark:text-slate-500'
            }`} 
          />
        </button>
      </div>
    </div>
  );
};

export default InputBar;