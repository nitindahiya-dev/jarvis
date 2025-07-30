import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';

const tabs = [
  { id: 'chat', icon: '💬', label: 'Chat' },
  { id: 'history', icon: '📚', label: 'History' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
];

export const Sidebar = () => {
  const { activeTab, setActiveTab } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div className="w-20 md:w-64 h-full flex flex-col p-4" 
         style={{ backgroundColor: theme.card }}>
      <div className="flex items-center space-x-3 mb-10">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-12 h-12 rounded-lg flex items-center justify-center">
          <span className="text-white text-2xl">J</span>
        </div>
        <h1 className="text-2xl font-bold hidden md:block" style={{ color: theme.text }}>
          Jarvis
        </h1>
      </div>

      <nav className="space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center w-full p-3 rounded-xl transition-all ${
              activeTab === tab.id 
                ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' 
                : 'hover:bg-gray-100 dark:hover:bg-slate-700'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="ml-3 font-medium hidden md:block" style={{ color: theme.text }}>
              {tab.label}
            </span>
            {activeTab === tab.id && (
              <motion.div 
                className="hidden md:block ml-auto w-2 h-2 rounded-full bg-indigo-500"
                layoutId="tabIndicator"
              />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};