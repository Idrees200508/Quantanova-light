
import React, { useEffect } from 'react';
/* Fix: Standard import for react-router-dom useLocation */
import { useLocation } from 'react-router-dom';
import { useSite } from '../contexts/SiteContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({ title: propTitle, description: propDescription, keywords: propKeywords }) => {
  const location = useLocation();
  const { content } = useSite();
  const baseUrl = 'https://quantanovaschool.org';
  const fullUrl = `${baseUrl}${location.pathname}`;

  useEffect(() => {
    // Get SEO data from context or props
    const pageSeo = content.pageSeo || {};
    const pageMeta = pageSeo[location.pathname] || pageSeo['/'];
    const finalTitle = propTitle || pageMeta?.title || 'QuantaNova';
    const finalDescription = propDescription || pageMeta?.description || 'School of Excellence';
    const finalKeywords = propKeywords || pageMeta?.keywords || 'QuantaNova, Education, I-STEM, Hyderabad';

    // Update Title
    document.title = `${finalTitle} | QuantaNova School of Excellence`;
    
    // Update Description
    const updateMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (meta) {
        meta.setAttribute('content', content);
      } else {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    updateMeta('description', finalDescription);
    updateMeta('keywords', finalKeywords);

    // Handle Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', fullUrl);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', fullUrl);
      document.head.appendChild(canonical);
    }

    // Open Graph Tags
    const updateOG = (property: string, content: string) => {
      let og = document.querySelector(`meta[property="${property}"]`);
      if (og) {
        og.setAttribute('content', content);
      } else {
        og = document.createElement('meta');
        og.setAttribute('property', property);
        og.setAttribute('content', content);
        document.head.appendChild(og);
      }
    };

    updateOG('og:title', `${finalTitle} | QuantaNova`);
    updateOG('og:description', finalDescription);
    updateOG('og:url', fullUrl);

  }, [propTitle, propDescription, propKeywords, fullUrl, content.pageSeo, location.pathname]);

  return null;
};

export default SEO;
