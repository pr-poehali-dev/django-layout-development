import Icon from '@/components/ui/icon';

interface AboutSectionProps {
  content: Record<string, string>;
}

export default function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="about" className="py-12 px-4 md:py-20 md:px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-5xl mx-auto">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">Ольга Штерц</h2>
            <div className="text-lg md:text-xl text-primary font-semibold mb-3 md:mb-4">
              Эксперт по ораторскому искусству
            </div>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-4 md:mb-6">
              {content.olga_bio || 'Профессиональный тренер по публичным выступлениям с более чем 10-летним опытом. Помогла сотням людей обрести уверенность на сцене и в деловом общении.'}
            </p>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-2 md:gap-3">
                <Icon name="Award" className="text-primary flex-shrink-0" size={20} />
                <span className="text-sm md:text-base">Сертифицированный специалист по речевым коммуникациям</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <Icon name="Users" className="text-primary flex-shrink-0" size={20} />
                <span className="text-sm md:text-base">Обучила более 800 студентов</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <Icon name="Sparkles" className="text-primary flex-shrink-0" size={20} />
                <span className="text-sm md:text-base">Авторская методика преподавания</span>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <Icon name="Briefcase" className="text-primary flex-shrink-0" size={20} />
                <span className="text-sm md:text-base">Консультант крупных компаний и спикеров</span>
              </div>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[500px] rounded-2xl overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <Icon name="User" size={80} className="text-primary/30 md:w-[120px] md:h-[120px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
