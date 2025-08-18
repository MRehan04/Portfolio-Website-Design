import { Card } from './UI/card';
import { Button } from './UI/button';
import { Badge } from './UI/badge';
import { ExternalLink, Github } from 'lucide-react';
import { ImageWithFallback } from './Figma/ImageFallback';

export function ProjectsSection() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with React, Node.js, and Stripe integration. Features include user authentication, product management, shopping cart, and payment processing.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'Task Management App',
      description: 'A collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features. Built with modern web technologies.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      tags: ['Next.js', 'TypeScript', 'Prisma', 'Socket.io'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'Weather Dashboard',
      description: 'A beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics. Features responsive design and PWA capabilities.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop',
      tags: ['React', 'D3.js', 'Weather API', 'PWA'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'Portfolio Website',
      description: 'A responsive portfolio website for a creative agency. Features smooth animations, optimized performance, and a custom CMS for easy content management.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
      tags: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Sanity CMS'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'Social Media Analytics',
      description: 'A comprehensive analytics dashboard for social media managers. Tracks engagement, growth metrics, and provides actionable insights with beautiful data visualizations.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      tags: ['React', 'Chart.js', 'Express', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
    },
    {
      title: 'Learning Management System',
      description: 'An educational platform with course creation, progress tracking, and interactive learning modules. Built for scalability and user engagement.',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop',
      tags: ['Vue.js', 'Django', 'PostgreSQL', 'Redis'],
      liveUrl: '#',
      githubUrl: '#',
    },
  ];

  return (
    <section id="projects" className="py-20 bg-muted/10">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl mb-16 text-center">Featured Projects</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                    <Button size="sm" variant="secondary" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    <Button size="sm" variant="secondary" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl mb-3">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View All Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}