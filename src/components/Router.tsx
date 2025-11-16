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
import { migrateLocalStorageProjects, initializeDefaultProjects } from '../utils/migrateProjects.ts';
import '../utils/dbHelpers.ts'

export function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [migrationComplete, setMigrationComplete] = useState(false);

  // Run migration once on app startup
  useEffect(() => {
    async function runMigration() {
      try {
        // First, try to migrate any existing localStorage data
        const migrationResults = await migrateLocalStorageProjects();
        
        if (migrationResults.migrated > 0) {
          console.log(`✓ Successfully migrated ${migrationResults.migrated} projects to Supabase`);
        }
        
        if (migrationResults.errors.length > 0) {
          console.warn('Migration errors:', migrationResults.errors);
        }
        
        // If no projects were migrated, initialize with default projects
        if (migrationResults.migrated === 0) {
          await initializeDefaultProjects();
        }
      } catch (error) {
        console.error('Migration process failed:', error);
      } finally {
        setMigrationComplete(true);
      }
    }
    
    runMigration();
  }, []);

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