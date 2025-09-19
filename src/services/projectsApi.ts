export interface Project {
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

// Mock API service using localStorage
class ProjectsApiService {
  private readonly STORAGE_KEY = 'portfolio_projects';

  // Simulate network delay
  private delay(ms: number = 300): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Initialize with default projects if none exist
  private initializeDefaultProjects(): Project[] {
    const defaultProjects: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>[] = [
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

    return defaultProjects.map(project => ({
      ...project,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
  }

  // GET all projects
  async getProjects(): Promise<Project[]> {
    await this.delay();
    
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) {
      const defaultProjects = this.initializeDefaultProjects();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(defaultProjects));
      return defaultProjects;
    }
    
    return JSON.parse(stored);
  }

  // GET project by ID
  async getProject(id: string): Promise<Project | null> {
    await this.delay();
    
    const projects = await this.getProjects();
    return projects.find(project => project.id === id) || null;
  }

  // POST new project
  async createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    await this.delay();
    
    const projects = await this.getProjects();
    const newProject: Project = {
      ...projectData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedProjects = [...projects, newProject];
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedProjects));
    
    return newProject;
  }

  // PUT update project
  async updateProject(id: string, projectData: Partial<Omit<Project, 'id' | 'createdAt'>>): Promise<Project | null> {
    await this.delay();
    
    const projects = await this.getProjects();
    const projectIndex = projects.findIndex(project => project.id === id);
    
    if (projectIndex === -1) {
      return null;
    }
    
    const updatedProject: Project = {
      ...projects[projectIndex],
      ...projectData,
      updatedAt: new Date().toISOString()
    };
    
    projects[projectIndex] = updatedProject;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
    
    return updatedProject;
  }

  // DELETE project
  async deleteProject(id: string): Promise<boolean> {
    await this.delay();
    
    const projects = await this.getProjects();
    const filteredProjects = projects.filter(project => project.id !== id);
    
    if (filteredProjects.length === projects.length) {
      return false; // Project not found
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredProjects));
    return true;
  }

  // GET featured projects
  async getFeaturedProjects(): Promise<Project[]> {
    const projects = await this.getProjects();
    return projects.filter(project => project.featured);
  }
}

export const projectsApi = new ProjectsApiService();