import { useState, useEffect } from 'react';
import { ProjectsAdmin } from './ProjectsAdmin.tsx';
import { Navigation } from './Navigation.tsx';
import { HeroSection } from './HeroSection.tsx';
import { AboutSection } from './AboutSection.tsx';
import { SkillsSection } from './SkillsSection.tsx';
import { PortfolioSection } from './PortfolioSection.tsx';
import { ProjectsSection } from './ProjectsSection.tsx';
import { ContactSection } from './ContactSection.tsx';
import { Footer } from './Footer.tsx';
import { Toaster } from './UI/sonner.tsx';

export function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Simple navigation function
  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Make navigate available globally for links
  useEffect(() => {
    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.href.startsWith(window.location.origin)) {
        e.preventDefault();
        const path = new URL(target.href).pathname;
        navigate(path);
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  if (currentPath === '/admin') {
    return (
      <>
        <ProjectsAdmin />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen">
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <PortfolioSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
}