export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

// Replace these with your own projects
export const projects: Project[] = [
  {
    id: '1',
    title: 'My First Project',
    description: 'Replace this with your actual project description. Describe what the project does, what technologies you used, and what you learned.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    liveUrl: 'https://your-project-url.com',
    githubUrl: 'https://github.com/yourusername/your-project',
    featured: true,
  },
  {
    id: '2',
    title: 'My Second Project',
    description: 'Add another project here. You can include as many projects as you want by adding more objects to this array.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    tags: ['Next.js', 'Node.js', 'MongoDB'],
    liveUrl: 'https://your-second-project.com',
    githubUrl: 'https://github.com/yourusername/your-second-project',
    featured: true,
  },
  // Add more projects here...
  // To add a new project, copy one of the objects above and update the values
  // To delete a project, simply remove the entire object from this array
];

// Helper function to get featured projects
export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

// Helper function to get all projects
export const getAllProjects = (): Project[] => {
  return projects;
};