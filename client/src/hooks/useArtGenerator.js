import { useState, useEffect, useCallback } from 'react';

const useArtGenerator = () => {
  const [artPrompt, setArtPrompt] = useState('');
  const [generatedArt, setGeneratedArt] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  // Simulate AI art generation (replace with actual API call)
  const generateArt = useCallback(async (prompt) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // In a real implementation, this would call an API like:
      // const response = await fetch('https://api.openai.com/v1/images/generate', {
      //   method: 'POST',
      //   headers: { Authorization: `Bearer YOUR_API_KEY` },
      //   body: JSON.stringify({ prompt, n: 1, size: "512x512" })
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulated response with a gradient based on the prompt
      const hash = prompt.split('').reduce((acc, char) => 
        (acc << 5) - acc + char.charCodeAt(0), 0);
      
      const colors = [
        `hsl(${Math.abs(hash % 360)}, 70%, 60%)`,
        `hsl(${Math.abs((hash + 120) % 360)}, 70%, 60%)`,
        `hsl(${Math.abs((hash + 240) % 360)}, 70%, 60%)`
      ];
      
      const simulatedArt = {
        url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 100 100">
          <defs>
            <radialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stop-color="${colors[0]}" />
              <stop offset="50%" stop-color="${colors[1]}" />
              <stop offset="100%" stop-color="${colors[2]}" />
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#grad)" />
          <text x="50" y="50" font-family="Arial" font-size="5" fill="white" text-anchor="middle" dominant-baseline="middle">${prompt}</text>
        </svg>`,
        prompt
      };
      
      setGeneratedArt(simulatedArt);
      return simulatedArt;
    } catch (err) {
      setError('Failed to generate art. Please try again.');
      console.error('Art generation error:', err);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return {
    artPrompt,
    setArtPrompt,
    generatedArt,
    isGenerating,
    error,
    generateArt
  };
};

export default useArtGenerator;