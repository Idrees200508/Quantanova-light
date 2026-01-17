import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import * as storage from '../services/firebase';
import { BlogPost } from '../types';

export interface ExcellenceSpotlight {
  id: string;
  name: string;
  award: string;
  category: string;
  image: string;
}

export interface HomeSliderItem {
  id: string;
  url: string;
  caption: string;
  subCaption: string;
}

export interface Circular {
  id: string;
  title: string;
  date: string;
  category: 'Exam' | 'Holiday' | 'General';
  fileUrl?: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  category: string;
  fileUrl: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface SchoolNotice {
  id: string;
  title: string;
  date: string;
  isUrgent: boolean;
}

export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  month: string;
  category: string;
  description: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  folder: string;
}

export interface SiteContent {
  contactEmail: string;
  contactPhone: string;
  googleFormUrl: string;
  footerDescription: string;
  admissionsOpen: boolean;
  admissionsText: string;
  showCampusVisit: boolean;
  showAnthem: boolean;
  // Added missing anthemAudioUrl property to SiteContent
  anthemAudioUrl: string;
  showVirtualPrincipal: boolean;
  showScanAnimation: boolean;
  showLeaderboard: boolean;
  showGallery: boolean;
  showSpotlights: boolean;
  showHomeSlider: boolean;
  showCirculars: boolean;
  showDownloads: boolean;
  showFaculty: boolean;
  showFAQs: boolean;
  heroText: any;
  homeSliderImages: HomeSliderItem[];
  spotlights: ExcellenceSpotlight[];
  circulars: Circular[];
  downloads: DownloadItem[];
  faculty: FacultyMember[];
  faqs: FAQItem[];
  blogs: BlogPost[];
  blogCategories: string[];
  gallery: GalleryImage[];
  galleryFolders: string[];
  notices: SchoolNotice[];
  upcomingEvents: SchoolEvent[];
  pageSeo: any;
  homeStats: any[];
  labs: any[];
  infrastructure: any[];
  about: any;
}

const defaultContent: SiteContent = {
  contactEmail: "admissions@quantanova.org",
  contactPhone: "+91 70754 91347",
  googleFormUrl: "https://forms.gle/E1kq2TZADGQGbSQD8",
  footerDescription: "India's premier ISTEM-powered school. Launching our foundational batch in Hyderabad.",
  admissionsOpen: true,
  admissionsText: "Inaugural Batch Admissions Open 2026",
  showCampusVisit: true,
  showAnthem: true,
  // Added default anthem audio URL
  anthemAudioUrl: "https://quantanovaschool.org/resources/anthem.mp3",
  showVirtualPrincipal: true,
  showScanAnimation: true,
  showLeaderboard: true,
  showGallery: true,
  showSpotlights: false,
  showHomeSlider: true,
  showCirculars: true,
  showDownloads: true,
  showFaculty: true,
  showFAQs: true,
  heroText: { line1: "Pioneering", line2: "ISTEM-", line3: "Powered", line4: "Excellence" },
  homeSliderImages: [
    { id: 'hs1', url: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2000', caption: 'World-Class Infrastructure', subCaption: 'Architected for the Quantum Age' },
    { id: 'hs2', url: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2000', caption: 'Advanced Robotics Hub', subCaption: 'Where Ideas become Prototypes' },
    { id: 'hs3', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000', caption: 'Inaugural Session 2026', subCaption: 'Join the Founding Batch of Innovators' },
    { id: 'hs4', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000', caption: 'Smart Classrooms', subCaption: 'Next-Generation Learning Spaces' },
    { id: 'hs5', url: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?q=80&w=2000', caption: 'Research & Development', subCaption: 'Fostering Original Scientific Thought' },
    { id: 'hs6', url: 'https://images.unsplash.com/photo-1564910443496-5fd2d76b47fa?q=80&w=2000', caption: 'Collaborative Ecosystem', subCaption: 'Building Tomorrow, Together' }
  ],
  spotlights: [],
  circulars: [
    { id: 'c1', title: "Inaugural Batch Orientation Schedule", date: "Jan 15", category: "General" }
  ],
  downloads: [
    { id: 'd1', title: "School Prospectus 2026", category: "Admission", fileUrl: "#" }
  ],
  faculty: [],
  faqs: [
    { id: 'fq1', question: "Is this the first academic year for QuantaNova?", answer: "Yes, 2026-27 marks our grand inaugural session, bringing world-class I-STEM infrastructure to Hyderabad for the first time." }
  ],
  blogCategories: ['Launch', 'Innovation'],
  blogs: [],
  gallery: [],
  galleryFolders: ['Campus Launch'],
  notices: [
    { id: 'n1', title: "Welcome to the Inaugural Session 2026", date: "Oct 24", isUrgent: false }
  ],
  upcomingEvents: [],
  pageSeo: { '/': { title: 'Home', description: 'QuantaNova', keywords: 'School' } },
  homeStats: [
    { id: 's1', icon: 'Cpu', value: '10+', label: 'Inaugural Labs' },
    { id: 's2', icon: 'Users', value: 'Foundational', label: 'First Batch' }
  ],
  labs: [],
  infrastructure: [],
  about: { description: "QuantaNova School", founderName: "Founder", founderTitle: "CEO", founderSubtitle: "Tech", founderMessage: ["Welcome to our first year..."], vision: "Vision", missionPoints: ["Mission"] }
};

interface SiteContextType {
  content: SiteContent;
  isLoading: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  updateContent: (updates: Partial<SiteContent>) => Promise<void>;
  // Added missing deleteBlogPost to SiteContextType
  deleteBlogPost: (id: string) => Promise<void>;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const remote = await storage.fetchSiteContent();
        if (remote) setContent(prev => ({ ...prev, ...remote }));
        setIsAuthenticated(localStorage.getItem('qn_admin_logged_in') === 'true');
      } catch (e) { console.error(e); }
      finally { setIsLoading(false); }
    };
    loadData();
  }, []);

  const login = (password: string) => {
    if (password === 'qnadmin2025') {
      setIsAuthenticated(true);
      localStorage.setItem('qn_admin_logged_in', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('qn_admin_logged_in');
  };

  const updateContent = async (updates: Partial<SiteContent>) => {
    const newContent = { ...content, ...updates };
    setContent(newContent);
    await storage.saveSiteContent(newContent);
  };

  // Implemented deleteBlogPost to resolve errors in AdminJournalEditor
  const deleteBlogPost = async (id: string) => {
    const updatedBlogs = (content.blogs || []).filter(b => b.id !== id);
    await updateContent({ blogs: updatedBlogs });
  };

  return (
    <SiteContext.Provider value={{ content, isLoading, login, logout, isAuthenticated, updateContent, deleteBlogPost }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used within SiteProvider');
  return context;
};
