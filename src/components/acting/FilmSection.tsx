import Icon from '@/components/ui/icon';

interface FilmSectionProps {
  content: Record<string, string>;
}

export default function FilmSection({ content }: FilmSectionProps) {
  return (
    <section className="py-12 px-4 md:py-20 md:px-4">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl md:rounded-3xl p-6 md:p-12 text-center">
          <Icon name="Film" size={64} className="mx-auto mb-6 text-primary" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Снимите свое настоящее кино!</h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 max-w-3xl mx-auto">
            Представьте: вы на съемочной площадке. Свет, камера, мотор! 🎬
          </p>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
            Это не мечта — это реальность нашего курса! По завершении обучения вы не просто получите сертификат. 
            Вы станете <span className="text-primary font-semibold">главным героем собственного короткометражного фильма</span>.
          </p>
          {content.final_video_url && (
            <div className="aspect-video w-full md:max-w-3xl md:mx-auto md:rounded-xl overflow-hidden shadow-2xl -mx-6 md:mx-auto">
              <iframe
                src={content.final_video_url}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
