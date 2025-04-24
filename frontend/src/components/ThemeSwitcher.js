import React from 'react';

const ThemeSwitcher = ({ theme, onChange }) => {
  const handleSelect = (e) => {
    onChange(e.target.value);
  };

  return (
    <div style={{ margin: '16px' }}>
      <label htmlFor="theme-select">Select Theme: </label>
      <select id="theme-select" value={theme} onChange={handleSelect}>
        <option value="light-theme">Light</option>
        <option value="dark-theme">Dark</option>
        {/* Additional themes (e.g., Retro, Futuristic) can be added with corresponding CSS */}
      </select>
    </div>
  );
};

export default ThemeSwitcher;
