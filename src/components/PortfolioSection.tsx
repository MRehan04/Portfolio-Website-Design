import { useState } from 'react';
import { Card } from './UI/card';
import { Button } from './UI/button';
import { Badge } from './UI/badge';
import { ExternalLink, Figma, Eye } from 'lucide-react';
import { ImageWithFallback } from './Figma/ImageFallback';
import { getFeaturedPortfolio, getPortfolioByCategory, getPortfolioCategories, type PortfolioItem } from '../data/portfolio';

export function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const categories = getPortfolioCategories();
  
  const getFilteredPortfolio = (): PortfolioItem[] => {
    if (selectedCategory === 'all') {
      return getFeaturedPortfolio();
    }
    return getPortfolioByCategory(selectedCategory as PortfolioItem['category']);
  };

  const portfolioItems = getFilteredPortfolio();

  const categoryLabels: Record<string, string> = {
    'all': 'All Work',
    'design': 'Design',
    'branding': 'Branding',
    'web-design': 'Web Design',
    'mobile': 'Mobile',
    'illustration': 'Illustration',
    'other': 'Other'
  };

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">Portfolio</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A showcase of my creative work, design projects, and visual solutions across various mediums and industries.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="transition-all"
            >
              All Work
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className="transition-all"
              >
                {categoryLabels[category] || category}
              </Button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item) => (
              <Card key={item.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                    {item.liveUrl && (
                      <Button size="sm" variant="secondary" asChild>
                        <a href={item.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Live
                        </a>
                      </Button>
                    )}
                    {item.figmaUrl && (
                      <Button size="sm" variant="secondary" asChild>
                        <a href={item.figmaUrl} target="_blank" rel="noopener noreferrer">
                          <Figma className="w-4 h-4 mr-2" />
                          Figma
                        </a>
                      </Button>
                    )}
                    {item.behanceUrl && (
                      <Button size="sm" variant="secondary" asChild>
                        <a href={item.behanceUrl} target="_blank" rel="noopener noreferrer">
                          <Eye className="w-4 h-4 mr-2" />
                          Behance
                        </a>
                      </Button>
                    )}
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                      {categoryLabels[item.category] || item.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg">{item.title}</h3>
                    {item.year && (
                      <span className="text-sm text-muted-foreground">{item.year}</span>
                    )}
                  </div>
                  
                  {item.client && (
                    <p className="text-sm text-muted-foreground mb-2">Client: {item.client}</p>
                  )}
                  
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {portfolioItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No portfolio items found for this category.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View Full Portfolio
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}