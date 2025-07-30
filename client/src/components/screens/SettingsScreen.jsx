import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { SoundContext } from '../../contexts/SoundContext';
import { AppContext } from '../../contexts/AppContext';
import useHapticFeedback from '../../hooks/useHapticFeedback';
import { Switch } from '@headlessui/react';

const SettingsScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isMuted, volume, setVolume, setIsMuted } = useContext(SoundContext);
  const { mediumTap } = useHapticFeedback();
  
  const settings = [
    {
      category: 'Appearance',
      items: [
        {
          id: 'theme',
          name: 'Dark Mode',
          description: 'Switch between light and dark themes',
          action: (
            <Switch
              checked={theme.background === '#0f172a'}
              onChange={() => {
                mediumTap();
                toggleTheme();
              }}
              className={`${
                theme.background === '#0f172a' ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-slate-600'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${
                  theme.background === '#0f172a' ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          )
        },
        {
          id: 'animations',
          name: 'Enable Animations',
          description: 'Toggle UI animations and transitions',
          action: (
            <Switch
              checked={true}
              onChange={mediumTap}
              className={`${
                true ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-slate-600'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${
                  true ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          )
        }
      ]
    },
    {
      category: 'Audio',
      items: [
        {
          id: 'mute',
          name: 'Mute Sounds',
          description: 'Disable all notification sounds',
          action: (
            <Switch
              checked={isMuted}
              onChange={() => {
                mediumTap();
                setIsMuted(!isMuted);
              }}
              className={`${
                isMuted ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-slate-600'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${
                  isMuted ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          )
        },
        {
          id: 'volume',
          name: 'Volume Level',
          description: 'Adjust notification volume',
          action: (
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24 accent-indigo-600 dark:accent-indigo-400"
            />
          )
        }
      ]
    },
    {
      category: 'Advanced',
      items: [
        {
          id: 'memory',
          name: 'Memory Limit',
          description: 'Maximum conversation history to retain',
          action: (
            <select 
              className="rounded-lg border px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              style={{
                backgroundColor: theme.background === '#0f172a' ? '#1e293b' : '#f1f5f9',
                borderColor: theme.primary + '30',
                color: theme.text
              }}
            >
              <option>10 conversations</option>
              <option>25 conversations</option>
              <option>50 conversations</option>
              <option>Unlimited</option>
            </select>
          )
        }
      ]
    }
  ];

  return (
    <div className="h-full overflow-y-auto p-6">
      <h2 className="text-2xl font-bold mb-8" style={{ color: theme.text }}>Settings</h2>
      
      <div className="space-y-8">
        {settings.map((section) => (
          <div key={section.category} className="space-y-4">
            <h3 className="text-lg font-semibold" style={{ color: theme.text }}>
              {section.category}
            </h3>
            
            <div className="space-y-3">
              {section.items.map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-2xl"
                  style={{
                    backgroundColor: theme.background === '#0f172a' ? '#1e293b' : '#f1f5f9',
                    border: `1px solid ${theme.primary}20`,
                  }}
                >
                  <div className="flex-1 mr-4">
                    <h4 className="font-medium" style={{ color: theme.text }}>
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-slate-500 mt-1">
                      {item.description}
                    </p>
                  </div>
                  
                  <div>
                    {item.action}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <div className="pt-8">
          <h3 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>About Jarvis</h3>
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-16 h-16 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">J</span>
            </div>
            <div>
              <p className="text-gray-600 dark:text-slate-400">
                Version 1.0.0
              </p>
              <p className="text-gray-600 dark:text-slate-400">
                © 2023 Jarvis AI Assistant
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;