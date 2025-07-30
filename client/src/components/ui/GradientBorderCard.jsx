import React from 'react';
import { motion } from 'framer-motion';

export const GradientBorderCard = ({ children }) => {
  return (
    <div className="relative p-0.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <motion.div 
        className="bg-white dark:bg-slate-800 rounded-lg p-6"
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {children}
      </motion.div>
    </div>
  );
};