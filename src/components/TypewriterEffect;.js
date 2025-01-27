import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

// Register the plugin
gsap.registerPlugin(TextPlugin);

const TypewriterEffect = () => {
  useEffect(() => {
    // Target the element where the text should appear
    gsap.to(".typewriter", {
      duration: 3,  // Duration of the typing effect
      text: "Hello, I'm using GSAP to simulate a typewriter effect!", // The text to display
      ease: "none", // Optional easing function
      delay: 1 // Optional delay before animation starts
    });
  }, []);

  return (
    <div>
      <p style={{ fontSize: '64px' }} className="typewriter"></p>
    </div>
  );
};

export default TypewriterEffect;
