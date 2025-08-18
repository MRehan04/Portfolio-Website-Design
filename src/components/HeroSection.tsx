import { Button } from './UI/button';
import { ImageWithFallback } from './Figma/ImageFallback';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

export  function HeroSection() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
              alt="Alex Johnson"
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-primary/20"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl mb-6">
            Hi, I'm <span className="text-primary">Muhammad Rehan</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Full-Stack Developer & UI/UX Designer passionate about creating beautiful, 
            functional digital experiences that make a difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" onClick={scrollToAbout}>
              View My Work
            </Button>
            <Button variant="outline" size="lg">
              Download Resume
            </Button>
          </div>
          
          <div className="flex justify-center space-x-6 mb-16">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
          
          <button
            onClick={scrollToAbout}
            className="animate-bounce text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}