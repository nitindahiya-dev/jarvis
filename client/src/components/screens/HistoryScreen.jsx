import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { SoundContext } from '../../contexts/SoundContext';
import useHapticFeedback from '../../hooks/useHapticFeedback';
import { DocumentTextIcon, CalendarIcon, SearchIcon, TrashIcon } from '@heroicons/react/24/outline';

const HistoryScreen = () => {
  const { theme } = useContext(ThemeContext);
  const { playNotification } = useContext(SoundContext);
  const { mediumTap } = useHapticFeedback();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock history data
  const history = [
    { id: 1, title: 'Project Discussion', date: '2023-07-28', preview: 'Can you help me with the project architecture?', duration: '12m' },
    { id: 2, title: 'Code Review', date: '2023-07-27', preview: 'Please review my Python implementation...', duration: '8m' },
    { id: 3, title: 'Research Assistance', date: '2023-07-25', preview: 'Find recent papers about quantum computing', duration: '15m' },
    { id: 4, title: 'Daily Planning', date: '2023-07-24', preview: 'Help me plan my schedule for today', duration: '5m' },
  ];
  
  const filteredHistory = history.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      <div 
        className="p-6 border-b"
        style={{ 
          backgroundColor: theme.card,
          borderColor: theme.primary + '20'
        }}
      >
        <h2 className="text-2xl font-bold mb-6" style={{ color: theme.text }}>Conversation History</h2>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all"
            style={{
              backgroundColor: theme.background === '#0f172a' ? '#1e293b' : '#f1f5f9',
              borderColor: theme.primary + '30',
              color: theme.text,
              focus: {
                ringColor: theme.primary
              }
            }}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        {filteredHistory.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center">
            <DocumentTextIcon className="h-24 w-24 text-gray-300 dark:text-slate-700" />
            <h3 className="mt-4 text-lg font-medium" style={{ color: theme.text }}>No conversations found</h3>
            <p className="mt-1 text-gray-500 dark:text-slate-500">Try adjusting your search term</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((item) => (
              <div 
                key={item.id}
                className="rounded-2xl p-5 transition-all hover:shadow-lg cursor-pointer group"
                onClick={() => {
                  mediumTap();
                  playNotification();
                  // TODO: Load conversation
                }}
                style={{
                  backgroundColor: theme.background === '#0f172a' ? '#1e293b' : '#f1f5f9',
                  border: `1px solid ${theme.primary}20`,
                }}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg" style={{ color: theme.text }}>
                    {item.title}
                  </h3>
                  <button 
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: Delete conversation
                    }}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="mt-2 text-gray-600 dark:text-slate-400 line-clamp-2">
                  {item.preview}
                </p>
                
                <div className="flex items-center mt-4 text-sm text-gray-500 dark:text-slate-500">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  <span>{item.date}</span>
                  <span className="mx-2">•</span>
                  <span>{item.duration}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div 
        className="p-4 border-t flex justify-between"
        style={{ 
          backgroundColor: theme.card,
          borderColor: theme.primary + '20'
        }}
      >
        <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-300">
          Clear All History
        </button>
        <button className="text-sm flex items-center text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
          <DocumentTextIcon className="w-4 h-4 mr-1" />
          Export All as JSON
        </button>
      </div>
    </div>
  );
};

export default HistoryScreen;