// Some interesting animation using React!

import React, { useState, useEffect } from 'react';

function LoadingDots() {
  const [dots, setDots] = useState('.'); // State to store the current sequence of dots

  useEffect(() => {
    const interval = setInterval(() => {
      // Add a dot to the current sequence
      setDots((prevDots) => (prevDots.length === 3 ? '.' : prevDots + '.'));
    }, 300); // Adjust the interval duration for the desired speed of animation

    return () => clearInterval(interval); // Cleanup function to clear the interval when the component unmounts
  }, []);

  return <span>{dots}</span>; // Render the current sequence of dots
}

export default LoadingDots;
