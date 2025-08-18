import { Card } from './UI/card';
import { Progress } from './UI/progress';

export function SkillsSection() {
  const skills = [
    { name: 'React / Next.js', level: 95, category: 'Frontend' },
    { name: 'TypeScript', level: 90, category: 'Language' },
    { name: 'Node.js', level: 85, category: 'Backend' },
    { name: 'Python', level: 80, category: 'Language' },
    { name: 'PostgreSQL', level: 75, category: 'Database' },
    { name: 'AWS', level: 70, category: 'Cloud' },
    { name: 'Docker', level: 80, category: 'DevOps' },
    { name: 'UI/UX Design', level: 85, category: 'Design' },
  ];

  const categories = ['Frontend', 'Backend', 'Language', 'Database', 'Cloud', 'DevOps', 'Design'];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl mb-16 text-center">Skills & Expertise</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Card key={category} className="p-6">
                <h3 className="text-xl mb-4">{category}</h3>
                <div className="space-y-4">
                  {skills
                    .filter(skill => skill.category === category)
                    .map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </div>
                    ))}
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Card className="p-8 bg-primary text-primary-foreground max-w-2xl mx-auto">
              <h3 className="text-2xl mb-4">Always Learning</h3>
              <p className="text-lg opacity-90">
                Technology evolves fast, and so do I. Currently exploring AI/ML integration, 
                Web3 technologies, and advanced cloud architectures.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}