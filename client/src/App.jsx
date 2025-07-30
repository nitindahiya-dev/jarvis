import React, { useContext } from 'react';
import { AppProvider } from './contexts/AppContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { SoundProvider } from './contexts/SoundContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { InputBar } from './components/layout/InputBar';
import { ChatScreen } from './components/screens/ChatScreen';
import { HistoryScreen } from './components/screens/HistoryScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import ParticlesBackground from './components/ui/ParticlesBackground';
import { Canvas } from '@react-three/fiber'; // Ensure you have this import for Canvas
import { Stars } from '@react-three/drei'; // Ensure you have this import for Stars

export const App = () => {
  return (
    <ThemeProvider>
      <SoundProvider>
        <AppProvider>
          <div className="flex h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
            <ParticlesBackground />
            
            {/* 3D Background Layer */}
            <div className="absolute inset-0 z-0 opacity-10">
              <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Stars radius={100} depth={50} count={2000} factor={4} />
              </Canvas>
            </div>
            
            <div className="relative z-10 flex w-full h-full backdrop-blur-sm bg-white/70 dark:bg-slate-900/80">
              <Sidebar />
              
              <div className="flex-1 flex flex-col">
                <Header />
                
                <main className="flex-1 overflow-hidden">
                  <AppContent />
                </main>
                
                <InputBar />
              </div>
            </div>
          </div>
        </AppProvider>
      </SoundProvider>
    </ThemeProvider>
  );
};

const AppContent = () => {
  const { activeTab } = useContext(AppContext);
  
  return (
    <div className="h-full p-6">
      {activeTab === 'chat' && <ChatScreen />}
      {activeTab === 'history' && <HistoryScreen />}
      {activeTab === 'settings' && <SettingsScreen />}
    </div>
  );
};
