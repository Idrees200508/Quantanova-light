
import React from 'react';

export interface NavItem {
  label: string;
  path: string;
}

export interface LabFeature {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

export interface AcademicsLevel {
  level: string;
  grades: string;
  focus: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  tags: string[];
  image?: string;
  videoUrl?: string;
  audioUrl?: string;
}
