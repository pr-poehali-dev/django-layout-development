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
            Казбек расскажет, как преодолеть страх камеры и раскрыть свой талант
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

        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {problems.map((problem, index) => (
              <div key={index} className="flex items-center gap-3 bg-background/50 rounded-lg p-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={problem.icon} className="text-primary" size={20} />
                </div>
                <span className="text-base md:text-lg font-medium">{problem.text}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <blockquote className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 italic text-primary">
              "Я знаю, что делать. Приходите — я покажу вам!"
            </blockquote>
            <p className="text-muted-foreground text-sm md:text-base mb-6">— Казбек Кайтмазов</p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={scrollToForm}
            >
              Записаться на пробное занятие
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}