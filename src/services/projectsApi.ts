import { projectId, publicAnonKey } from '../utils/supabase/info';

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

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// API service using Supabase backend
class ProjectsApiService {
  private readonly baseUrl = `https://${projectId}.supabase.co/functions/v1/make-server-0fc12757`;

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
        ...options.headers,
      },
    });

    const data: ApiResponse<T> = await response.json();

    if (!response.ok || !data.success) {
      const errorMessage = data.error || `HTTP error! status: ${response.status}`;
      console.error(`API request failed for ${endpoint}:`, errorMessage);
      throw new Error(errorMessage);
    }

    return data.data as T;
  }

  // GET all projects
  async getProjects(): Promise<Project[]> {
    try {
      return await this.request<Project[]>('/projects');
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      // Return empty array on error to prevent UI breaking
      return [];
    }
  }

  // GET project by ID
  async getProject(id: string): Promise<Project | null> {
    try {
      return await this.request<Project>(`/projects/${id}`);
    } catch (error) {
      console.error(`Failed to fetch project ${id}:`, error);
      return null;
    }
  }

  // POST new project
  async createProject(projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    return await this.request<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  // PUT update project
  async updateProject(id: string, projectData: Partial<Omit<Project, 'id' | 'createdAt'>>): Promise<Project | null> {
    try {
      return await this.request<Project>(`/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(projectData),
      });
    } catch (error) {
      console.error(`Failed to update project ${id}:`, error);
      return null;
    }
  }

  // DELETE project
  async deleteProject(id: string): Promise<boolean> {
    try {
      await this.request<{ message: string }>(`/projects/${id}`, {
        method: 'DELETE',
      });
      return true;
    } catch (error) {
      // If project not found (404), consider it successfully deleted (idempotent)
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes('not found') || errorMessage.includes('404')) {
        console.log(`Project ${id} already deleted or doesn't exist, considering operation successful`);
        return true;
      }
      console.error(`Failed to delete project ${id}:`, error);
      throw error;
    }
  }

  // GET featured projects
  async getFeaturedProjects(): Promise<Project[]> {
    try {
      return await this.request<Project[]>('/projects/featured/list');
    } catch (error) {
      console.error('Failed to fetch featured projects:', error);
      return [];
    }
  }
}

export const projectsApi = new ProjectsApiService();
