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
        <div className="text-center mb-8 md:mb-12">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 md:p-10 mb-8 md:mb-12">
            <Icon name="Film" size={56} className="mx-auto mb-4 text-primary" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
              Снимите своё <span className="text-primary">настоящее кино</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-3 md:mb-4 max-w-3xl mx-auto">
              Представьте: вы на съёмочной площадке. Свет, камера, мотор! 🎬
            </p>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              По завершении курса вы станете <span className="text-primary font-semibold">главным героем собственного короткометражного фильма</span>. 
              Это не мечта — это реальность нашей программы обучения!
            </p>
          </div>
          
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 md:mb-4">Программа курса</h3>
          <p className="text-muted-foreground text-sm md:text-base">6 модулей от базовых навыков до съёмок вашего фильма</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
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
                <CardTitle className="text-lg md:text-xl">{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-sm md:text-base">{module.description}</CardDescription>
                <div className="flex items-start gap-2 text-xs md:text-sm text-primary">
                  <Icon name="CheckCircle2" size={16} className="mt-0.5 flex-shrink-0" />
                  <span className="font-medium">{module.result}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="aspect-video w-full md:max-w-4xl md:mx-auto rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            src="https://player.vimeo.com/video/997328344?h=0d19d04d2a"
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            allowFullScreen
            title="Как проходят съёмки вашего фильма"
          ></iframe>
        </div>
      </div>
    </section>
  );
}