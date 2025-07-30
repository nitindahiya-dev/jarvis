import React from 'react';

export const Waveform = () => {
  return (
    <div className="flex items-end space-x-1 h-8">
      {[...Array(5)].map((_, i) => (
        <div 
          key={i}
          className="w-1.5 bg-indigo-400 rounded-full"
          style={{
            height: `${Math.floor(Math.random() * 16) + 4}px`,
            animation: `pulse 0.${i+5}s infinite alternate`
          }}
        />
      ))}
    </div>
  );
};