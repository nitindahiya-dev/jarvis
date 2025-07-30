import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBubble = () => {
  return (
    <div className="relative w-64 h-64">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 m-auto rounded-full opacity-70"
          style={{
            width: `${40 + i * 30}%`,
            height: `${40 + i * 30}%`,
            background: `radial-gradient(circle at 30% 30%, 
              rgba(${i === 0 ? 99 : 129}, ${i === 0 ? 102 : 140}, ${i === 0 ? 241 : 248}, 0.8), 
              rgba(${i === 0 ? 129 : 167}, ${i === 0 ? 140 : 180}, ${i === 0 ? 248 : 252}, 0.4))`
          }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, i % 2 === 0 ? 5 : -5, 0],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
      
      <motion.div
        className="absolute inset-0 m-auto bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full w-24 h-24 flex items-center justify-center shadow-xl"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <span className="text-white text-2xl font-bold">J</span>
      </motion.div>
      
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute rounded-full bg-indigo-400 w-3 h-3"
          style={{
            top: `${Math.sin((i / 8) * Math.PI * 2) * 45 + 50}%`,
            left: `${Math.cos((i / 8) * Math.PI * 2) * 45 + 50}%`,
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBubble;