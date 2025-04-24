import React, { useState, useEffect } from 'react';

const backgroundImages = [
  'https://source.unsplash.com/1600x900/?nature,water',
  'https://source.unsplash.com/1600x900/?city,night',
  'https://source.unsplash.com/1600x900/?technology',
  'https://source.unsplash.com/1600x900/?abstract'
];

const BackgroundCycle = () => {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex(prev => (prev + 1) % backgroundImages.length);
    }, 15000); // cycle every 15 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="background-cycle"
      style={{ backgroundImage: `url(${backgroundImages[bgIndex]})` }}
    />
  );
};

export default BackgroundCycle;
