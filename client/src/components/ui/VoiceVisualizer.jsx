import React, { useRef, useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

const VoiceVisualizer = ({ audioBlob, isPlaying }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#a5b4fc',
        progressColor: '#4f46e5',
        barWidth: 3,
        barHeight: 1,
        barGap: 2,
        height: 60,
        cursorWidth: 0,
        interact: false,
        normalize: true,
        partialRender: true
      });

      if (audioBlob) {
        const audioUrl = URL.createObjectURL(audioBlob);
        wavesurfer.current.load(audioUrl);
        
        wavesurfer.current.on('ready', () => {
          setDuration(wavesurfer.current.getDuration());
          if (isPlaying) wavesurfer.current.play();
        });
      }
    }

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [audioBlob]);

  useEffect(() => {
    if (wavesurfer.current) {
      if (isPlaying) {
        wavesurfer.current.play();
      } else {
        wavesurfer.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="w-full">
      <div ref={waveformRef} className="w-full" />
      {duration > 0 && (
        <div className="text-right text-xs text-indigo-400 mt-1">
          {Math.floor(duration)}s
        </div>
      )}
    </div>
  );
};

export default VoiceVisualizer;