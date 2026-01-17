
import React, { useEffect, useRef, useState } from 'react';

interface SmoothRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const SmoothReveal: React.FC<SmoothRevealProps> = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      });
    });

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${className} ${
        isVisible 
          ? 'opacity-100 translate-y-0 blur-0' 
          : 'opacity-0 translate-y-8 blur-lg'
      }`}
    >
      {children}
    </div>
  );
};

export default SmoothReveal;
