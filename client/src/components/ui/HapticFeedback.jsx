import React, { useEffect } from 'react';
import useHapticFeedback from '../../hooks/useHapticFeedback';

const HapticFeedback = ({ trigger, type = 'mediumTap' }) => {
  const { lightTap, mediumTap, heavyTap, successPulse, errorPulse } = useHapticFeedback();
  
  useEffect(() => {
    if (!trigger) return;
    
    switch(type) {
      case 'lightTap':
        lightTap();
        break;
      case 'mediumTap':
        mediumTap();
        break;
      case 'heavyTap':
        heavyTap();
        break;
      case 'successPulse':
        successPulse();
        break;
      case 'errorPulse':
        errorPulse();
        break;
      default:
        mediumTap();
    }
  }, [trigger, type, lightTap, mediumTap, heavyTap, successPulse, errorPulse]);

  return null;
};

export default HapticFeedback;