import { useState, useEffect, useCallback, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { SoundContext } from '../contexts/SoundContext';
import useHapticFeedback from './useHapticFeedback';

const useVoiceRecognition = () => {
  const { setIsListening, setMessages } = useContext(AppContext);
  const { playNotification, playError } = useContext(SoundContext);
  const { successPulse, errorPulse } = useHapticFeedback();
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognition, setRecognition] = useState(null);
  
  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.error('Speech recognition not supported in this browser');
      return;
    }
    
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';
    
    recognitionInstance.onstart = () => {
      setIsListening(true);
      setIsProcessing(true);
      playNotification();
    };
    
    recognitionInstance.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptPart + ' ';
        } else {
          interimTranscript += transcriptPart;
        }
      }
      
      setTranscript(finalTranscript + interimTranscript);
    };
    
    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      playError();
      errorPulse();
      stopListening();
    };
    
    recognitionInstance.onend = () => {
      if (transcript.trim()) {
        handleVoiceCommand(transcript);
      }
      setTranscript('');
      setIsProcessing(false);
    };
    
    setRecognition(recognitionInstance);
    
    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
    };
  }, []);
  
  const startListening = useCallback(() => {
    if (recognition && !isProcessing) {
      recognition.start();
    }
  }, [recognition, isProcessing]);
  
  const stopListening = useCallback(() => {
    if (recognition && isProcessing) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition, isProcessing, setIsListening]);
  
  const handleVoiceCommand = useCallback((command) => {
    // Process voice command
    console.log('Voice command:', command);
    
    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'user',
      content: command,
      timestamp: new Date().toISOString()
    }]);
    
    successPulse();
    
    // TODO: Process command and generate AI response
  }, [setMessages, successPulse]);
  
  // Toggle listening when state changes
  useEffect(() => {
    const { isListening } = useContext(AppContext);
    if (isListening) {
      startListening();
    } else if (!isListening && isProcessing) {
      stopListening();
    }
  }, [isListening, startListening, stopListening, isProcessing]);
  
  return {
    transcript,
    isProcessing,
    startListening,
    stopListening
  };
};

export default useVoiceRecognition;