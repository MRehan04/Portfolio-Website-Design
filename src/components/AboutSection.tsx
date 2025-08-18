import { Card } from './UI/card';
import { ImageWithFallback } from './Figma/ImageFallback';

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/10">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl mb-16 text-center">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-6 leading-relaxed">
                I'm a passionate full-stack developer with over 5 years of experience creating 
                digital solutions that bridge the gap between design and functionality. My journey 
                began with a curiosity for how things work, which led me to fall in love with code.
              </p>
              
              <p className="text-lg mb-6 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or mentoring aspiring developers. I believe in the power 
                of clean code and user-centered design to create meaningful experiences.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <Card className="p-4 text-center">
                  <div className="text-2xl mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl mb-2">5+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl mb-2">20+</div>
                  <div className="text-sm text-muted-foreground">Happy Clients</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Dedication</div>
                </Card>
              </div>
            </div>
            
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop"
                alt="Working on projects"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-lg">
                <div>Available for</div>
                <div>Freelance Work</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}