
import React, { createContext, useContext, ReactNode } from 'react';

export interface AboutContent {
  founderName: string;
  founderTitle: string;
  founderSubtitle: string;
  founderMessage: string[];
  vision: string;
  visionEnvision: string;
  missionPoints: string[];
  founderAudioUrl: string;
  paragraphTimestamps: number[];
}

const aboutData: AboutContent = {
  founderName: "The Visionary Founder",
  founderTitle: "FOUNDER, QUANTANOVA SCHOOL",
  founderSubtitle: "CEO, WHERESOFT TECHNOLOGIES",
  founderMessage: [
    "Hi, I am a Founder and CEO of a software company. For many years, I observed a troubling pattern in education.",
    "Classrooms became more digital, yet thinking remained conventional. Syllabi grew heavier, yet curiosity grew weaker. Students memorized more, but understood less.",
    "Education, which should ignite imagination and shape leaders, was slowly becoming mechanical and exam driven.",
    "Parents wanted confidence for their children. Industry wanted problem solvers. Society needed leaders with integrity.",
    "Yet the system was producing students trained only to score—not to think, not to innovate, and not to lead.",
    "This gap between what education was and what the future demanded became the seed of a dream.",
    "The world was moving into the Quantum Age, driven by artificial intelligence, advanced sciences, and rapid technological transformation. Yet our classrooms were still preparing children for the past.",
    "I realized that real change would require more than smart classrooms or digital tools. It would require a complete reimagining of how children learn, think, and grow.",
    "That is how QuantaNova School of Excellence was born."
  ],
  vision: "To create an advanced learning ecosystem that nurtures curiosity, creativity, scientific thinking, and leadership.",
  visionEnvision: "We envision an ecosystem where curiosity becomes discovery, knowledge becomes application, and students become confident global leaders.",
  missionPoints: [
    "Provide holistic education focusing on intellectual ability and ethical values.",
    "Develop independent thinkers who can solve real-world problems.",
    "Integrate emerging technologies into the everyday curriculum.",
    "Nurture leadership rooted in integrity and responsibility.",
    "Bridge the gap between academic theory and industry expectations."
  ],
  founderAudioUrl: 'https://quantanovaschool.org/resources/founderstalk.wav',
  paragraphTimestamps: [0, 8, 20, 27, 34, 41, 46, 58, 108]
};

const AboutContext = createContext<AboutContent | undefined>(undefined);

export const AboutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AboutContext.Provider value={aboutData}>
      {children}
    </AboutContext.Provider>
  );
};

export const useAbout = () => {
  const context = useContext(AboutContext);
  if (!context) {
    throw new Error('useAbout must be used within an AboutProvider');
  }
  return context;
};
