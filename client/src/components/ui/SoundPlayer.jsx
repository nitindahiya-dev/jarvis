import React, { useContext, useEffect } from 'react';
import { SoundContext } from '../../contexts/SoundContext';

const SoundPlayer = ({ soundType, trigger }) => {
  const { 
    playNotification, 
    playSend, 
    playReceive, 
    playSuccess, 
    playError 
  } = useContext(SoundContext);
  
  useEffect(() => {
    if (!trigger) return;
    
    switch(soundType) {
      case 'notification':
        playNotification();
        break;
      case 'send':
        playSend();
        break;
      case 'receive':
        playReceive();
        break;
      case 'success':
        playSuccess();
        break;
      case 'error':
        playError();
        break;
      default:
        playNotification();
    }
  }, [trigger, soundType, playNotification, playSend, playReceive, playSuccess, playError]);

  return null;
};

export default SoundPlayer;