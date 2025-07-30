import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { SoundContext } from '../../contexts/SoundContext';
import useHapticFeedback from '../../hooks/useHapticFeedback';

const Header = () => {
  const { isListening, setIsListening, isSpeaking } = useContext(AppContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { playNotification } = useContext(SoundContext);
  const { mediumTap } = useHapticFeedback();
  
  const toggleListening = () => {
    mediumTap();
    playNotification();
    setIsListening(!isListening);
  };

  return (
    <div 
      className="flex items-center justify-between px-6 py-4 border-b"
      style={{ 
        backgroundColor: theme.card,
        borderColor: theme.primary + '20'
      }}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <div 
            className={`w-3 h-3 rounded-full absolute -top-1 -right-1 ${
              isListening ? 'animate-ping bg-green-500' : 'bg-gray-400'
            }`}
          />
          <button
            onClick={toggleListening}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isListening 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/30' 
                : 'bg-gradient-to-r from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-800'
            }`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-6 w-6 ${isListening ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
        </div>
        
        <div className="flex flex-col">
          <h2 className="text-lg font-bold" style={{ color: theme.text }}>
            {isListening ? 'Listening...' : 'Ready'}
          </h2>
          <p className="text-xs text-gray-500 dark:text-slate-400">
            {isSpeaking ? 'Jarvis is speaking...' : 'Click mic to start'}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => {
            mediumTap();
            toggleTheme();
          }}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
        >
          {theme.background === '#0f172a' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
        
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
            <span className="text-white font-bold">J</span>
          </div>
          {isSpeaking && (
            <div className="absolute -top-2 -right-2">
              <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></div>
              <div className="relative inline-flex rounded-full h-5 w-5 bg-indigo-500"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;