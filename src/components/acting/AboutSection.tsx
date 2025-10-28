import Icon from '@/components/ui/icon';
import Image from '@/components/ui/image';
import { TeamMember } from '@/lib/api';

interface AboutSectionProps {
  content: Record<string, string>;
  team: TeamMember[];
}

export default function AboutSection({ content, team }: AboutSectionProps) {
  const kazbekPhoto = "https://st.business-key.com/i/files/45470/2024/02/1707986927.jpg";
  const kazbekName = "Казбек Меретуков";
  const kazbekInfo = [
    {
      title: "Режиссёр федеральных телесериалов",
      text: "Режиссёр-постановщик, обладатель премии ТЕФИ-2012 за лучшую режиссуру телесериала «Закрытая школа». Снял более 200 серий популярных телесериалов: «Закрытая школа», «Молодёжка», «Улица», «Реальные пацаны» и другие."
    },
    {
      title: "Основатель школы актёрского мастерства",
      text: "В 2015 году основал школу актёрского мастерства, где передаёт свой опыт начинающим актёрам. Разработал уникальную методику обучения, сочетающую классическую актёрскую школу с современными подходами к работе на камеру."
    },
    {
      title: "Опытный преподаватель",
      text: "За годы работы обучил более 500 студентов, многие из которых успешно работают в кино и на телевидении."
    }
  ];

  return (
    <section id="about" className="py-12 px-4 md:py-20 md:px-4 bg-gradient-to-br from-primary/5 via-background to-primary/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary-rgb),0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(var(--primary-rgb),0.08),transparent_50%)]"></div>
      
      <div className="container mx-auto relative z-10">


        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center max-w-6xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative h-[350px] md:h-[550px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={kazbekPhoto}
                alt={kazbekName}
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {kazbekName}
              </h3>
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
            </div>
            
            <div className="space-y-6">
              {kazbekInfo.map((item, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="text-lg md:text-xl font-semibold text-primary">
                    {item.title}
                  </h4>
                  <p className="text-base leading-relaxed text-foreground/90">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}