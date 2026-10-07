import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppContent } from './App';
import { StoryProvider } from './context/StoryContext';
import { AudioProvider } from './context/AudioContext';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AudioProvider>
      <StoryProvider>
        <AppContent />
      </StoryProvider>
    </AudioProvider>
  </React.StrictMode>
);
