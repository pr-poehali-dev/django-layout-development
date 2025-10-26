import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { CourseModule } from '@/lib/api';

interface ModulesSectionProps {
  modules: CourseModule[];
}

export default function ModulesSection({ modules }: ModulesSectionProps) {
  return (
    <section id="modules" className="py-12 px-4 md:py-20 md:px-4 bg-card">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 md:mb-4">Программа курса</h2>
        <p className="text-center text-muted-foreground mb-8 md:mb-12 text-sm md:text-base">6 модулей от базы до съемок собственного кино</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <Card key={module.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                  {module.image_url ? (
                    <img src={module.image_url} alt={module.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                      <span className="text-6xl font-bold text-primary/30">{index + 1}</span>
                    </div>
                  )}
                </div>
                <CardTitle>{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{module.description}</CardDescription>
                <div className="flex items-start gap-2 text-sm text-primary">
                  <Icon name="CheckCircle2" size={16} className="mt-0.5" />
                  <span className="font-medium">{module.result}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
