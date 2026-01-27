import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/SchemaMarkup';
import { api, Review, BlogPost, TeamMember, SiteContent } from '@/lib/api';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import LeadForm from '@/components/LeadForm';

export default function HomePage() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [blog, setBlog] = useState<BlogPost[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [reviewsData, blogData, teamData, contentData] = await Promise.all([
        api.gallery.getReviews(),
        api.gallery.getBlog(),
        api.gallery.getTeam(),
        api.content.getAll()
      ]);

      setReviews(reviewsData);
      setBlog(blogData.slice(0, 3));
      setTeam(teamData);

      const contentMap: Record<string, string> = {};
      contentData.forEach((item: SiteContent) => {
        contentMap[item.key] = item.value;
      });
      setContent(contentMap);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + (r.rating || 5), 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <>
      <Helmet>
        <title>Школа актёрского и ораторского мастерства Казбека Меретукова в Москве</title>
        <meta name="description" content="Профессиональное обучение актёрскому и ораторскому мастерству от режиссёра телесериалов Казбека Меретукова. Победитель ТЕФИ-2012. Курсы для взрослых и детей. Пробное занятие бесплатно." />
        <link rel="canonical" href="https://acting-school.poehali.dev/" />
        <meta property="og:url" content="https://acting-school.poehali.dev/" />
        <meta property="og:title" content="Школа Казбека Меретукова - актёрское и ораторское мастерство" />
        <meta property="og:description" content="Профессиональное обучение от режиссёра телесериалов. Победитель ТЕФИ-2012. Курсы актёрского и ораторского мастерства в Москве." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://cdn.poehali.dev/projects/d006fe31-f11a-48d3-ba82-54149e58d318/files/7cddbd50-0847-4321-92b1-f534403d6a21.jpg" />
      </Helmet>
      <SchemaMarkup 
        type="organization" 
        organizationData={{
          name: "Школа актёрского и ораторского мастерства Казбека Меретукова",
          description: "Профессиональное обучение актёрскому и ораторскому мастерству",
          url: "https://acting-school.poehali.dev/",
          logo: "https://cdn.poehali.dev/projects/d006fe31-f11a-48d3-ba82-54149e58d318/files/7cddbd50-0847-4321-92b1-f534403d6a21.jpg"
        }}
      />
      <SchemaMarkup 
        type="reviews" 
        reviews={reviews.map(r => ({
          author: r.name,
          rating: r.rating || 5,
          text: r.text
        }))}
      />
      <div className="min-h-screen bg-background">
        <Header />

        {/* Hero */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
                <span className="text-sm font-medium text-primary">Победитель ТЕФИ-2012</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Школа актёрского и ораторского мастерства
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Обучение от режиссёра телесериалов Казбека Меретукова. Индивидуальный подход, практика на камеру.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button 
                  size="lg"
                  onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Записаться на занятие
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/about')}
                >
                  О преподавателе
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Users" size={18} />
                  <span>15+ лет опыта</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Star" size={18} />
                  <span>{averageRating} рейтинг</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Award" size={18} />
                  <span>500+ выпускников</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Acting Course */}
        <section className="py-20 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
                  <span className="text-sm font-medium text-primary">Профессиональное обучение</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Актёрское мастерство</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Погрузитесь в мир кино: от актёрских тренингов до съёмки собственного фильма. 
                  Полный курс для тех, кто мечтает о карьере в кино.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="group bg-card p-8 rounded-2xl border-2 hover:border-primary transition-all hover:shadow-xl">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon name="BookOpen" size={28} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Модуль 1-2</h3>
                  <h4 className="text-lg font-semibold mb-2 text-primary">Работа с текстом и ролью</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Актёрские тренинги на раскрепощение, техника работы с монологами перед камерой, 
                    понимание отличий театра и кино. Развитие эмоциональной выразительности.
                  </p>
                </div>

                <div className="group bg-card p-8 rounded-2xl border-2 hover:border-primary transition-all hover:shadow-xl">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon name="Video" size={28} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Модуль 3</h3>
                  <h4 className="text-lg font-semibold mb-2 text-primary">Работа в кадре</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Интенсивная практика перед камерой, освоение кино-выразительности, 
                    работа с крупными планами. Персональная обратная связь от мастера и разбор каждого дубля.
                  </p>
                </div>

                <div className="group bg-card p-8 rounded-2xl border-2 hover:border-primary transition-all hover:shadow-xl">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon name="Clapperboard" size={28} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Модуль 4</h3>
                  <h4 className="text-lg font-semibold mb-2 text-primary">Съёмочный процесс</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Профессиональные лайфхаки киноплощадки, техника записи самопроб для кастингов, 
                    правила работы с режиссёрами и кастинг-директорами.
                  </p>
                </div>

                <div className="group bg-card p-8 rounded-2xl border-2 hover:border-primary transition-all hover:shadow-xl">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon name="Trophy" size={28} className="text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Модуль 5</h3>
                  <h4 className="text-lg font-semibold mb-2 text-primary">Итоговый проект</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Полноценная съёмка короткометражного фильма с главной ролью, 
                    участие в проектах других студентов. Готовое портфолио для кастингов.
                  </p>
                </div>
              </div>

              <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-8 text-center">
                <div className="mb-6">
                  <div className="inline-block relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                    <div className="relative rounded-xl overflow-hidden shadow-2xl bg-black max-w-[240px] mx-auto">
                      <iframe
                        className="w-full aspect-[9/16]"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="Курс актёрского мастерства"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">Начните путь в кино уже сегодня</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  5 модулей практики, индивидуальная обратная связь, съёмка собственного фильма. 
                  Запишитесь на первое занятие и получите персональную консультацию.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="text-lg px-8"
                    onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Записаться на курс
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="text-lg px-8"
                    onClick={() => navigate('/acting')}
                  >
                    Подробнее о курсе
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Oratory Course */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Ораторское искусство</h2>
              <p className="text-lg text-muted-foreground">Техники речи, работа с аудиторией, уверенность в себе</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-card p-10 rounded-3xl border-2">
                <Icon name="Mic2" size={56} className="text-primary mb-6 mx-auto" />
                <p className="text-muted-foreground mb-8 text-lg leading-relaxed text-center">
                  Развитие речевых навыков, работа с дикцией и интонацией, 
                  практические упражнения для выступлений перед аудиторией
                </p>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full text-base"
                  onClick={() => navigate('/oratory')}
                >
                  Подробнее о курсе
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <section id="lead-form" className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Бесплатное пробное занятие</h2>
                <p className="text-lg text-muted-foreground">Оставьте заявку и мы свяжемся с вами в ближайшее время</p>
              </div>

              <div className="bg-card p-10 rounded-3xl border-2 shadow-lg">
                <LeadForm 
                  source="home_page"
                  title=""
                  description=""
                  buttonText="Записаться на занятие"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center bg-card p-8 rounded-2xl border">
                <div className="text-5xl font-bold text-primary mb-3">15+</div>
                <p className="text-base text-muted-foreground">Лет опыта</p>
              </div>
              <div className="text-center bg-card p-8 rounded-2xl border">
                <div className="text-5xl font-bold text-primary mb-3">500+</div>
                <p className="text-base text-muted-foreground">Выпускников</p>
              </div>
              <div className="text-center bg-card p-8 rounded-2xl border">
                <div className="text-5xl font-bold text-primary mb-3">{averageRating}</div>
                <p className="text-base text-muted-foreground">Рейтинг</p>
              </div>
              <div className="text-center bg-card p-8 rounded-2xl border">
                <div className="text-5xl font-bold text-primary mb-3">100%</div>
                <p className="text-base text-muted-foreground">Практика</p>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">О преподавателе</h2>
                <p className="text-lg text-muted-foreground">Обучение от практикующего режиссёра</p>
              </div>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">Казбек Меретуков</h3>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    Режиссёр телесериалов, победитель премии ТЕФИ-2012. 
                    Более 15 лет опыта в киноиндустрии и обучении актёрскому мастерству.
                  </p>
                  <Button size="lg" onClick={() => navigate('/about')}>
                    Подробнее о преподавателе
                  </Button>
                </div>
                <div>
                  <img 
                    src="https://cdn.poehali.dev/projects/d006fe31-f11a-48d3-ba82-54149e58d318/files/7cddbd50-0847-4321-92b1-f534403d6a21.jpg"
                    alt="Казбек Меретуков"
                    className="rounded-3xl w-full shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        {reviews.length > 0 && (
          <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Отзывы учеников</h2>
                <p className="text-lg text-muted-foreground">Реальные истории наших выпускников</p>
              </div>
              
              <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                {reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="bg-card p-8 rounded-3xl border-2">
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Icon 
                          key={i} 
                          name="Star" 
                          size={20} 
                          className={i < (review.rating || 5) ? "text-primary fill-primary" : "text-muted"} 
                        />
                      ))}
                    </div>
                    <p className="text-base text-muted-foreground mb-6 line-clamp-5 leading-relaxed">{review.text}</p>
                    <p className="font-bold text-lg">{review.name}</p>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button size="lg" variant="outline" onClick={() => navigate('/reviews')}>
                  Читать все отзывы
                </Button>
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
}