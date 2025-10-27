import Icon from '@/components/ui/icon';
import PhoneForm from '@/components/PhoneForm';

export default function HeroSection() {
  return (
    <section className="pt-20 pb-32 px-4 md:pt-32 md:pb-40 md:px-4 relative overflow-hidden min-h-[85vh] md:min-h-[90vh] flex items-center">
      <div className="absolute inset-0">
        <img
          src="https://cdn.poehali.dev/projects/d006fe31-f11a-48d3-ba82-54149e58d318/files/829de8e6-6182-458d-9aa3-3afb8faa0acc.jpg"
          alt="Ораторское мастерство"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-card"></div>
      </div>
      <div className="container mx-auto relative z-10">
        <div className="max-w-2xl">
          <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-semibold mb-4 md:mb-6 text-sm md:text-base">
            Курс с Ольгой Штерц
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
            Говорите так, чтобы <span className="text-primary">вас слышали!</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-3 md:mb-4">
            Запишитесь на <span className="text-primary font-semibold">пробное занятие</span> по ораторскому мастерству
          </p>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 md:mb-8">
            Профессиональный курс публичных выступлений от эксперта Ольги Штерц. Научитесь выступать уверенно, убедительно и харизматично. 
            Проводите презентации, вдохновляйте аудиторию и становитесь лидером мнений!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="bg-card/80 backdrop-blur-sm p-3 md:p-4 rounded-lg">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">8 недель</div>
              <div className="text-xs md:text-sm text-muted-foreground">Длительность курса</div>
            </div>
            <div className="bg-card/80 backdrop-blur-sm p-3 md:p-4 rounded-lg">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">24 часа</div>
              <div className="text-xs md:text-sm text-muted-foreground">Практики и тренингов</div>
            </div>
          </div>
          <PhoneForm 
            source="hero_oratory"
            course="oratory"
            triggerText="Записаться на пробное занятие"
            triggerSize="lg"
            title="Запись на пробное занятие"
            description="Оставьте номер телефона, и мы пригласим вас на пробное занятие по ораторскому мастерству"
          />
        </div>
      </div>
    </section>
  );
}