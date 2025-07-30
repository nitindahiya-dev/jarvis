import React, { createContext, useState, useEffect } from 'react';
import useSound from 'use-sound';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  
  // Import sounds using Webpack require (place files in src/assets/sounds)
  const [playNotification] = useSound(
    require('../assets/sounds/notification.mp3'), 
    { volume, soundEnabled: !isMuted }
  );
  
  const [playSend] = useSound(
    require('../assets/sounds/send.mp3'), 
    { volume, soundEnabled: !isMuted }
  );
  
  const [playReceive] = useSound(
    require('../assets/sounds/receive.mp3'), 
    { volume, soundEnabled: !isMuted }
  );
  
  const [playSuccess] = useSound(
    require('../assets/sounds/success.mp3'), 
    { volume, soundEnabled: !isMuted }
  );
  
  const [playError] = useSound(
    require('../assets/sounds/error.mp3'), 
    { volume, soundEnabled: !isMuted }
  );

  // Save settings to localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('soundSettings');
    if (savedSettings) {
      const { muted, vol } = JSON.parse(savedSettings);
      setIsMuted(muted);
      setVolume(vol);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('soundSettings', JSON.stringify({
      muted: isMuted,
      vol: volume
    }));
  }, [isMuted, volume]);

  return (
    <SoundContext.Provider value={{
      isMuted,
      volume,
      setIsMuted,
      setVolume,
      playNotification,
      playSend,
      playReceive,
      playSuccess,
      playError
    }}>
      {children}
    </SoundContext.Provider>
  );
};

export default SoundContext;