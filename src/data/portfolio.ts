export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'design' | 'branding' | 'web-design' | 'mobile' | 'illustration' | 'other';
  tags: string[];
  liveUrl?: string;
  behanceUrl?: string;
  dribbbleUrl?: string;
  figmaUrl?: string;
  featured?: boolean;
  year?: string;
  client?: string;
}

// Replace these with your actual portfolio pieces
export const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'Brand Identity Design',
    description: 'Complete brand identity design including logo, color palette, typography, and brand guidelines for a modern tech startup.',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop',
    category: 'branding',
    tags: ['Brand Identity', 'Logo Design', 'Typography', 'Color Theory'],
    behanceUrl: 'https://behance.net/yourprofile',
    year: '2024',
    client: 'Tech Startup',
    featured: true,
  },
  {
    id: '2',
    title: 'Mobile App UI/UX',
    description: 'User interface and experience design for a fitness tracking mobile application with focus on user engagement and accessibility.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
    category: 'mobile',
    tags: ['UI/UX Design', 'Mobile Design', 'Prototyping', 'User Research'],
    figmaUrl: 'https://figma.com/yourdesign',
    liveUrl: 'https://your-app.com',
    year: '2024',
    featured: true,
  },
  {
    id: '3',
    title: 'E-commerce Website Design',
    description: 'Modern e-commerce website design with focus on conversion optimization and seamless user experience.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    category: 'web-design',
    tags: ['Web Design', 'E-commerce', 'UX Design', 'Responsive Design'],
    liveUrl: 'https://your-ecommerce-site.com',
    figmaUrl: 'https://figma.com/yourdesign',
    year: '2023',
    client: 'Fashion Brand',
    featured: true,
  },
  // Add more portfolio items here...
];

// Helper functions
export const getFeaturedPortfolio = (): PortfolioItem[] => {
  return portfolioItems.filter(item => item.featured);
};

export const getPortfolioByCategory = (category: PortfolioItem['category']): PortfolioItem[] => {
  return portfolioItems.filter(item => item.category === category);
};

export const getAllPortfolio = (): PortfolioItem[] => {
  return portfolioItems;
};

export const getPortfolioCategories = (): string[] => {
  return [...new Set(portfolioItems.map(item => item.category))];
};