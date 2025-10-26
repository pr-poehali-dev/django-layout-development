import Icon from '@/components/ui/icon';

interface AboutSectionProps {
  content: Record<string, string>;
}

export default function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="about" className="py-12 px-4 md:py-20 md:px-4 bg-card">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center max-w-5xl mx-auto">
          <div className="relative h-[300px] md:h-[500px] rounded-2xl overflow-hidden">
            <img
              src="https://cdn.poehali.dev/projects/d006fe31-f11a-48d3-ba82-54149e58d318/files/2f9cd495-aad4-4dd8-8ef8-16f99e26b165.jpg"
              alt="Казбек Меретуков"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Казбек Меретуков</h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
              {content.kazbek_bio || 'Российский режиссер и педагог актерского мастерства с многолетним опытом работы в кино и театре.'}
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Icon name="Award" className="text-primary" size={24} />
                <span>Режиссер профессиональных кино-проектов</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="GraduationCap" className="text-primary" size={24} />
                <span>Педагог с авторской методикой обучения</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Users" className="text-primary" size={24} />
                <span>Обучил более 500 студентов</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Film" className="text-primary" size={24} />
                <span>Опыт работы в кино и на телевидении</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
