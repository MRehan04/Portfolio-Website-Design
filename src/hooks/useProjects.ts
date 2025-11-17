import { useState, useEffect, useCallback } from 'react';
import { projectsApi, Project } from '../services/projectsApi.ts';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectsApi.getProjects();
      setProjects(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = useCallback(async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null);
      const newProject = await projectsApi.createProject(projectData);
      setProjects(prev => [...prev, newProject]);
      return newProject;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
      throw err;
    }
  }, []);

  const updateProject = useCallback(async (id: string, projectData: Partial<Omit<Project, 'id' | 'createdAt'>>) => {
    try {
      setError(null);
      const updatedProject = await projectsApi.updateProject(id, projectData);
      if (updatedProject) {
        setProjects(prev => prev.map(p => p.id === id ? updatedProject : p));
        return updatedProject;
      }
      throw new Error('Project not found');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update project');
      throw err;
    }
  }, []);
const deleteProject = useCallback(async (id: string) => {
    try {
      setError(null);
      // Optimistically remove from UI first
      setProjects(prev => prev.filter(p => p.id !== id));
      
      // Then attempt to delete from backend
      await projectsApi.deleteProject(id);
      return true;
    } catch (error) {
      // If deletion fails, refetch to sync state
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete project';
      console.error('Delete failed, refreshing project list:', errorMessage);
      setError(errorMessage);
      await fetchProjects(); // Re-sync with backend
      throw error;
    }
  }, [fetchProjects]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    createProject,
    updateProject,
    deleteProject
  };
}

export function useProject(id: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        setError(null);
        const data = await projectsApi.getProject(id);
        setProject(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch project');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProject();
    }
  }, [id]);

  return { project, loading, error };
}