import React, { useContext, useState } from 'react';
import { AppContext } from '../contexts/AppContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { MessageBubble } from '../ui/MessageBubble';
import { Jarvis3DAvatar } from '../ui/Jarvis3DAvatar';
import { VoiceVisualizer } from '../ui/VoiceVisualizer';
import FileDropzone from '../ui/FileDropzone';
import useArtGenerator from '../../hooks/useArtGenerator';

export const ChatScreen = () => {
  const { messages, isSpeaking, currentAudioBlob } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
  const [showDropzone, setShowDropzone] = useState(false);
  const { generatedArt, generateArt } = useArtGenerator();
  
  const handleFilesAccepted = (files) => {
    files.forEach(file => {
      // Process files (upload, convert, etc.)
      console.log('File accepted:', file);
    });
    setShowDropzone(false);
  };

  return (
    <div className="flex flex-col h-full">
      {showDropzone ? (
        <div className="flex-1 flex items-center justify-center p-8">
          <FileDropzone onFilesAccepted={handleFilesAccepted} />
        </div>
      ) : (
        <>
          <div 
            className="flex-1 overflow-y-auto p-4 space-y-6 relative"
            style={{ 
              backgroundImage: generatedArt 
                ? `url(${generatedArt.url})` 
                : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/30 dark:from-slate-900/90 dark:to-slate-900/50 z-0"></div>
            
            <div className="relative z-10">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center">
                  <div className="w-64 h-64 mb-6">
                    <Jarvis3DAvatar />
                  </div>
                  <h2 className="mt-6 text-xl font-bold" style={{ color: theme.text }}>
                    Hello! I'm Jarvis, your AI assistant
                  </h2>
                  <p className="mt-2 text-gray-500">Ask me anything or try voice command</p>
                  
                  <button 
                    className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    onClick={() => generateArt('Futuristic AI assistant in a digital landscape')}
                  >
                    Generate Background Art
                  </button>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <MessageBubble 
                    key={idx} 
                    message={msg} 
                    isUser={msg.sender === 'user'} 
                  />
                ))
              )}
              
              {isSpeaking && (
                <div className="flex items-start space-x-3 mt-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-bold">J</span>
                  </div>
                  <div className="bg-gray-100 dark:bg-slate-700 rounded-2xl px-4 py-3 w-full">
                    <VoiceVisualizer 
                      audioBlob={currentAudioBlob} 
                      isPlaying={isSpeaking} 
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-center py-2">
            <button 
              className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
              onClick={() => setShowDropzone(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Attach files
            </button>
          </div>
        </>
      )}
    </div>
  );
};