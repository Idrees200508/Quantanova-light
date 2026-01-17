
import React, { useState, useEffect, useRef } from 'react';

interface TextTypeProps {
  text: string;
  speed?: number;
  className?: string;
  delay?: number;
}

const TextType: React.FC<TextTypeProps> = ({ 
  text, 
  speed = 50, 
  className = "", 
  delay = 0 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setIsStarted(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!isStarted) return;

    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        // Use underscore as the trailing cursor character
        const cursor = currentIndex < text.length ? '_' : '';
        setDisplayText(text.substring(0, currentIndex) + cursor);
        currentIndex++;
      } else {
        setDisplayText(text);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isStarted, text, speed]);

  return (
    <span ref={containerRef} className={className}>
      {displayText}
    </span>
  );
};

export default TextType;
