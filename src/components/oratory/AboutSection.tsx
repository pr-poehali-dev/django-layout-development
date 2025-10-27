import Icon from '@/components/ui/icon';
import Image from '@/components/ui/image';

interface AboutSectionProps {
  content: Record<string, string>;
}

export default function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="about" className="py-12 px-4 md:py-20 md:px-4 bg-card">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden order-2 md:order-1">
            <Image
              src="https://cdn.poehali.dev/projects/d006fe31-f11a-48d3-ba82-54149e58d318/files/829de8e6-6182-458d-9aa3-3afb8faa0acc.jpg"
              alt="Ольга Штерц"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="order-1 md:order-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4">
              Ольга Штерц
            </h2>
            <div className="text-base md:text-lg text-primary font-semibold mb-4 md:mb-6">
              Актриса, педагог высшей категории, преподаватель актерского мастерства, ораторского искусства и техники речи
            </div>
            
            <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
              Под моим руководством ты освоишь основы техник речи, разовьешь голосовые данные, снимешь психологические и физические зажимы, обретешь легкость и уверенность в выступлениях перед публикой
            </p>

            <div className="mb-6 md:mb-8">
              <h3 className="font-bold text-lg md:text-xl mb-4">Моё образование:</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Icon name="GraduationCap" className="text-primary flex-shrink-0 mt-1" size={20} />
                  <span className="text-sm md:text-base">Театральное училище им. Щепкина (курс Ю. Соломина)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="GraduationCap" className="text-primary flex-shrink-0 mt-1" size={20} />
                  <span className="text-sm md:text-base">РАТИ/ГИТИС (курс В. Скорика, А. Васильева)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Globe" className="text-primary flex-shrink-0 mt-1" size={20} />
                  <span className="text-sm md:text-base">Театральная школа на Бродвее «Circle in the Square theatre» (Нью-Йорк, США)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Mic" className="text-primary flex-shrink-0 mt-1" size={20} />
                  <span className="text-sm md:text-base">Мастерская Эрика ван Гроотеля (Нидерланды): курс «Голос как инструмент актера»</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Award" className="text-primary flex-shrink-0 mt-1" size={20} />
                  <span className="text-sm md:text-base">Тренинг Станислава Грофа (США) по холотропному дыханию, семинар «Революция сознания»</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
