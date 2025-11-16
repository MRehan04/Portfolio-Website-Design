import { projectId, publicAnonKey } from './supabase/info';

interface LegacyProject {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Migrates projects from localStorage to Supabase database
 * This function checks localStorage for existing projects and uploads them to the server
 */
export async function migrateLocalStorageProjects(): Promise<{
  success: boolean;
  migrated: number;
  errors: string[];
}> {
  const STORAGE_KEY = 'portfolio_projects';
  const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-0fc12757`;
  
  const results = {
    success: true,
    migrated: 0,
    errors: [] as string[],
  };

  try {
    // Check if there are projects in localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    
    if (!stored) {
      console.log('No projects found in localStorage to migrate');
      return results;
    }

    const localProjects: LegacyProject[] = JSON.parse(stored);
    
    if (localProjects.length === 0) {
      console.log('No projects to migrate');
      return results;
    }

    console.log(`Found ${localProjects.length} projects in localStorage. Starting migration...`);

    // Upload each project to the server
    for (const project of localProjects) {
      try {
        const response = await fetch(`${baseUrl}/projects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            title: project.title,
            description: project.description,
            image: project.image,
            technologies: project.technologies,
            liveUrl: project.liveUrl,
            githubUrl: project.githubUrl,
            featured: project.featured,
          }),
        });

        if (response.ok) {
          results.migrated++;
          console.log(`✓ Migrated project: ${project.title}`);
        } else {
          const errorData = await response.json();
          results.errors.push(`Failed to migrate "${project.title}": ${errorData.error || 'Unknown error'}`);
          results.success = false;
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        results.errors.push(`Failed to migrate "${project.title}": ${errorMessage}`);
        results.success = false;
      }
    }

    // Only clear localStorage if all migrations were successful
    if (results.success && results.migrated === localProjects.length) {
      localStorage.removeItem(STORAGE_KEY);
      console.log('✓ Migration complete! localStorage has been cleared.');
    } else {
      console.warn('Migration completed with errors. localStorage not cleared.');
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    results.success = false;
    results.errors.push(`Migration failed: ${errorMessage}`);
  }

  return results;
}

/**
 * Helper function to initialize default projects if database is empty
 */
export async function initializeDefaultProjects(): Promise<void> {
  const baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-0fc12757`;
  
  try {
    // Check if there are existing projects
    const response = await fetch(`${baseUrl}/projects`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      console.log('Projects already exist in database. Skipping initialization.');
      return;
    }

    console.log('No projects found. Creating default projects...');

    const defaultProjects = [
      {
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
        technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
        liveUrl: "https://example-ecommerce.com",
        githubUrl: "https://github.com/username/ecommerce",
        featured: true
      },
      {
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates, file sharing, and team collaboration features.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&q=80&w=800",
        technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
        liveUrl: "https://example-tasks.com",
        githubUrl: "https://github.com/username/task-app",
        featured: false
      },
      {
        title: "Weather Dashboard",
        description: "A responsive weather dashboard that provides detailed forecasts, interactive maps, and weather alerts for multiple locations.",
        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80&w=800",
        technologies: ["React", "OpenWeather API", "Chart.js"],
        liveUrl: "https://example-weather.com",
        githubUrl: "https://github.com/username/weather-app",
        featured: false
      }
    ];

    for (const project of defaultProjects) {
      await fetch(`${baseUrl}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(project),
      });
    }

    console.log('✓ Default projects created successfully!');
  } catch (error) {
    console.error('Failed to initialize default projects:', error);
  }
}
