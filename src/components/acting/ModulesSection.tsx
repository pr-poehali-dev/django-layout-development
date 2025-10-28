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
              <CardContent className="space-y-4">
                <div 
                  className="text-muted-foreground leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: module.description.replace(/\n/g, '<br />') }}
                />
                <div className="flex items-start gap-3 pt-3 px-3 py-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                  <Icon name="Target" size={20} className="mt-0.5 text-primary shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-primary mb-1.5 uppercase tracking-wider">Результат модуля</p>
                    <p className="text-sm font-semibold text-foreground leading-relaxed">{module.result}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}