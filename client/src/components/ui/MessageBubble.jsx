import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';

const MessageBubble = ({ message, isUser }) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex ${isUser ? 'flex-row-reverse' : ''} items-start gap-3 max-w-[85%]`}>
        {!isUser && (
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold">J</span>
          </div>
        )}
        
        <div>
          <div
            className={`rounded-3xl px-5 py-3 ${
              isUser 
                ? 'rounded-tr-none bg-indigo-500 text-white' 
                : 'rounded-tl-none bg-gray-100 dark:bg-slate-700'
            }`}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
          
          <div 
            className={`text-xs mt-1.5 ${isUser ? 'text-right' : 'text-left'}`}
            style={{ color: theme.text }}
          >
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        
        {isUser && (
          <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-slate-600 flex items-center justify-center flex-shrink-0">
            <span className="font-bold">U</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble;