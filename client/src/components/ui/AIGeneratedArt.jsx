import React from 'react';
import { motion } from 'framer-motion';

const AIGeneratedArt = ({ artUrl, prompt, onGenerateNew }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl h-full">
      {artUrl ? (
        <>
          <img 
            src={artUrl} 
            alt={`AI generated art: ${prompt}`}
            className="w-full h-full object-cover"
          />
          
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-white text-sm font-light mb-2">AI-Generated Art</p>
            <h3 className="text-white font-medium truncate">{prompt}</h3>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGenerateNew}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium shadow-md flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Regenerate
          </motion.button>
        </>
      ) : (
        <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-slate-800 dark:to-slate-900 p-8">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mb-4" />
          <h3 className="text-lg font-medium text-center mb-2">No Art Generated</h3>
          <p className="text-gray-500 dark:text-slate-500 text-center mb-6">
            Create AI-generated backgrounds for your conversations
          </p>
          <button
            onClick={onGenerateNew}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Generate Art
          </button>
        </div>
      )}
    </div>
  );
};

export default AIGeneratedArt;