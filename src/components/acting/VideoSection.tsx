import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface VideoSectionProps {
  content: Record<string, string>;
}

const problems = [
  { icon: 'UserX', text: 'Застенчивость перед камерой' },
  { icon: 'Drama', text: 'Зажатость и скованность' },
  { icon: 'AlertCircle', text: 'Страх съемок' },
  { icon: 'HelpCircle', text: 'Не знаете, с чего начать' }
];

export default function VideoSection({ content }: VideoSectionProps) {
  const scrollToForm = () => {
    const formSection = document.getElementById('lead-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="py-12 px-4 md:py-20 md:px-4 bg-card">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Что вам мешает стать <span className="text-primary">актёром?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Узнайте, как за 3 месяца преодолеть страх и выйти на сцену
          </p>
        </div>
        
        <div className="aspect-video w-full md:max-w-4xl md:mx-auto md:rounded-xl overflow-hidden shadow-2xl mb-8 md:mb-12">
          <iframe
            src="https://player.vimeo.com/video/997327815?h=da8107aa0b"
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            allowFullScreen
            title="Видео о курсе"
          ></iframe>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-background/80 to-card/50 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-10 border border-primary/20 shadow-xl">
            <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
              {problems.map((problem, index) => (
                <div key={index} className="flex items-start gap-4 bg-card/50 rounded-xl p-4 md:p-5 border border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={problem.icon} className="text-primary" size={24} />
                  </div>
                  <div>
                    <span className="text-base md:text-lg font-semibold block mb-1">{problem.text}</span>
                    <span className="text-xs md:text-sm text-muted-foreground">
                      {index === 0 && 'Научитесь уверенно чувствовать себя перед объективом'}
                      {index === 1 && 'Раскрепоститесь и обретёте свободу движения'}
                      {index === 2 && 'Превратите волнение в энергию для роли'}
                      {index === 3 && 'Получите чёткий план развития от профессионала'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-lg md:text-xl text-muted-foreground mb-4">
                Мы знаем, как помочь вам преодолеть каждый барьер
              </p>
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
                onClick={scrollToForm}
              >
                Записаться на пробное занятие
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}