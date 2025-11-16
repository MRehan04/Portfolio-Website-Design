import { projectsApi } from '../services/projectsApi';

/**
 * Database helper utilities for manual operations
 * These functions can be called from the browser console for debugging
 */

/**
 * Lists all projects in the database
 */
export async function listAllProjects() {
  try {
    const projects = await projectsApi.getProjects();
    console.log(`Found ${projects.length} projects:`);
    console.table(projects.map(p => ({
      id: p.id,
      title: p.title,
      technologies: p.technologies.join(', '),
      featured: p.featured ? '⭐' : '',
      created: new Date(p.createdAt).toLocaleDateString(),
    })));
    return projects;
  } catch (error) {
    console.error('Failed to list projects:', error);
    return [];
  }
}

/**
 * Clears all projects from the database
 * USE WITH CAUTION - This will delete all projects!
 */
export async function clearAllProjects() {
  const confirmed = confirm(
    '⚠️ WARNING: This will permanently delete ALL projects from the database. ' +
    'This action cannot be undone. Are you sure?'
  );
  
  if (!confirmed) {
    console.log('Operation cancelled');
    return;
  }

  try {
    const projects = await projectsApi.getProjects();
    let deleted = 0;
    
    for (const project of projects) {
      const success = await projectsApi.deleteProject(project.id);
      if (success) {
        deleted++;
        console.log(`✓ Deleted: ${project.title}`);
      } else {
        console.error(`✗ Failed to delete: ${project.title}`);
      }
    }
    
    console.log(`\n✓ Cleared ${deleted} of ${projects.length} projects`);
    return deleted;
  } catch (error) {
    console.error('Failed to clear projects:', error);
    return 0;
  }
}

/**
 * Exports all projects as JSON
 */
export async function exportProjects() {
  try {
    const projects = await projectsApi.getProjects();
    const json = JSON.stringify(projects, null, 2);
    
    // Copy to clipboard if available
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(json);
      console.log('✓ Projects exported and copied to clipboard!');
    }
    
    // Also log to console
    console.log('Projects JSON:');
    console.log(json);
    
    // Create downloadable file
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `projects-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    return projects;
  } catch (error) {
    console.error('Failed to export projects:', error);
    return [];
  }
}

/**
 * Imports projects from a JSON array
 */
export async function importProjects(projectsData: any[]) {
  if (!Array.isArray(projectsData)) {
    console.error('Invalid input: Expected an array of projects');
    return 0;
  }

  let imported = 0;
  
  for (const projectData of projectsData) {
    try {
      // Remove id, createdAt, and updatedAt as they will be auto-generated
      const { id, createdAt, updatedAt, ...data } = projectData;
      
      await projectsApi.createProject(data);
      imported++;
      console.log(`✓ Imported: ${data.title}`);
    } catch (error) {
      console.error(`✗ Failed to import: ${projectData.title}`, error);
    }
  }
  
  console.log(`\n✓ Imported ${imported} of ${projectsData.length} projects`);
  return imported;
}

/**
 * Gets database statistics
 */
export async function getStats() {
  try {
    const projects = await projectsApi.getProjects();
    const featured = projects.filter(p => p.featured);
    
    const stats = {
      total: projects.length,
      featured: featured.length,
      regular: projects.length - featured.length,
      technologies: [...new Set(projects.flatMap(p => p.technologies))].length,
      withLiveUrl: projects.filter(p => p.liveUrl).length,
      withGithub: projects.filter(p => p.githubUrl).length,
    };
    
    console.log('Database Statistics:');
    console.table(stats);
    
    return stats;
  } catch (error) {
    console.error('Failed to get stats:', error);
    return null;
  }
}

/**
 * Finds projects by technology
 */
export async function findByTechnology(tech: string) {
  try {
    const projects = await projectsApi.getProjects();
    const matches = projects.filter(p => 
      p.technologies.some(t => t.toLowerCase().includes(tech.toLowerCase()))
    );
    
    console.log(`Found ${matches.length} projects using "${tech}":`);
    console.table(matches.map(p => ({
      title: p.title,
      technologies: p.technologies.join(', '),
      featured: p.featured ? '⭐' : '',
    })));
    
    return matches;
  } catch (error) {
    console.error('Failed to search projects:', error);
    return [];
  }
}

// Make functions available in console
if (typeof window !== 'undefined') {
  (window as any).dbHelpers = {
    listAllProjects,
    clearAllProjects,
    exportProjects,
    importProjects,
    getStats,
    findByTechnology,
  };
  
  console.log('💡 Database helpers loaded! Use window.dbHelpers in console:');
  console.log('  - listAllProjects(): View all projects');
  console.log('  - getStats(): Database statistics');
  console.log('  - exportProjects(): Export as JSON');
  console.log('  - importProjects(data): Import from JSON');
  console.log('  - findByTechnology("React"): Search by tech');
  console.log('  - clearAllProjects(): Delete all (⚠️ dangerous!)');
}
