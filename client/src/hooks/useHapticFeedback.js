import { useCallback } from 'react';

const useHapticFeedback = () => {
  const vibrate = useCallback((pattern = [50]) => {
    try {
      // Try Web Vibration API first
      if (navigator.vibrate) {
        navigator.vibrate(pattern);
        return;
      }
      
      // Electron fallback
      if (window.electron && window.electron.vibrate) {
        window.electron.vibrate(pattern);
      }
    } catch (e) {
      console.error('Haptic feedback failed:', e);
    }
  }, []);

  // Predefined patterns
  const lightTap = useCallback(() => vibrate([30]), [vibrate]);
  const mediumTap = useCallback(() => vibrate([50]), [vibrate]);
  const heavyTap = useCallback(() => vibrate([100]), [vibrate]);
  const successPulse = useCallback(() => vibrate([50, 30, 50]), [vibrate]);
  const errorPulse = useCallback(() => vibrate([100, 30, 100, 30, 100]), [vibrate]);

  return {
    vibrate,
    lightTap,
    mediumTap,
    heavyTap,
    successPulse,
    errorPulse
  };
};

export default useHapticFeedback;