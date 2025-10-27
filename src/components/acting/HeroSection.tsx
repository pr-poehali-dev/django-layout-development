import Icon from '@/components/ui/icon';
import PhoneForm from '@/components/PhoneForm';
import { formatDate } from '@/lib/dates';

interface HeroSectionProps {
  content: Record<string, string>;
}

export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="pt-20 pb-12 px-4 md:pt-32 md:pb-20 md:px-4 relative overflow-hidden min-h-[85vh] md:min-h-[90vh] flex items-center">
      <div className="absolute inset-0">
        <img
          src="https://cdn.poehali.dev/projects/d006fe31-f11a-48d3-ba82-54149e58d318/files/0c090e0f-2880-4f27-8c3e-d4c43afc5fda.jpg"
          alt="Актерское мастерство"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70"></div>
      </div>
      <div className="container mx-auto relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
            Станьте <span className="text-primary">звездой</span> своего кино
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-3 md:mb-4">
            Запишитесь на <span className="text-primary font-semibold">пробное занятие</span> по актерскому мастерству
          </p>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 md:mb-8">
            Профессиональное обучение от режиссера Казбека Меретукова. Преодолейте страх камеры, обретите уверенность и снимите свое настоящее кино с прослушиванием!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-3 py-2 rounded-lg text-sm md:text-base">
              <Icon name="Calendar" className="text-primary flex-shrink-0" size={18} />
              <span className="whitespace-nowrap">Пробное: {content.trial_date ? formatDate(content.trial_date) : '25 марта 2025'}</span>
            </div>
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-3 py-2 rounded-lg text-sm md:text-base">
              <Icon name="PlayCircle" className="text-primary flex-shrink-0" size={18} />
              <span className="whitespace-nowrap">Старт: {content.course_start_date ? formatDate(content.course_start_date) : '1 апреля 2025'}</span>
            </div>
          </div>
          <PhoneForm 
            source="hero_acting"
            course="acting"
            triggerText="Записаться на пробный урок"
            triggerSize="lg"
            title="Запись на пробное занятие"
            description="Оставьте номер телефона, и мы пригласим вас на пробное занятие"
          />
        </div>
      </div>
    </section>
  );
}