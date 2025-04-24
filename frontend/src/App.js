import React, { useState } from 'react';
import Header from './components/Header';
import CalendarView from './components/CalendarView';
import BackgroundCycle from './components/BackgroundCycle';
import ThemeSwitcher from './components/ThemeSwitcher';
import './index.css';

function App() {
  const [theme, setTheme] = useState('light-theme'); // default theme

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div className={`app ${theme}`}>
      <BackgroundCycle />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header />
        <ThemeSwitcher theme={theme} onChange={handleThemeChange} />
        <CalendarView />
      </div>
    </div>
  );
}

export default App;
