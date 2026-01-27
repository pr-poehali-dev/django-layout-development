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
import { formatDate } from '@/lib/dates';
import SeatsCounter from '@/components/ui/seats-counter';

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
        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Video */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black w-full lg:w-[480px] flex-shrink-0">
                  <iframe
                    className="w-full aspect-video"
                    src="https://player.vimeo.com/video/997327815?badge=0&autopause=0&player_id=0&app_id=58479"
                    title="Курс актёрского мастерства"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                    allowFullScreen
                  />
                </div>

                {/* Content */}
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">Актёрское мастерство</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Профессиональный курс для тех, кто хочет работать в кино. 
                    От актёрских тренингов до съёмки собственного короткометражного фильма.
                  </p>

                  <h3 className="text-xl font-semibold mb-4">Чему вы научитесь:</h3>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={16} className="text-primary" />
                      </div>
                      <p className="text-muted-foreground">Работать с текстом и создавать убедительные образы</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={16} className="text-primary" />
                      </div>
                      <p className="text-muted-foreground">Естественно вести себя перед камерой и на крупных планах</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={16} className="text-primary" />
                      </div>
                      <p className="text-muted-foreground">Понимать отличия театра и кино, применять кино-выразительность</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={16} className="text-primary" />
                      </div>
                      <p className="text-muted-foreground">Записывать профессиональные самопробы для кастингов</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={16} className="text-primary" />
                      </div>
                      <p className="text-muted-foreground">Работать на съёмочной площадке с режиссёром и командой</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={16} className="text-primary" />
                      </div>
                      <p className="text-muted-foreground">Снять собственный короткометражный фильм с главной ролью</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-3 rounded-lg border">
                      <Icon name="Calendar" className="text-primary flex-shrink-0" size={20} />
                      <span>Пробное: {content.trial_date ? formatDate(content.trial_date) : '1 февраля 2026'}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-3 rounded-lg border">
                      <Icon name="PlayCircle" className="text-primary flex-shrink-0" size={20} />
                      <span>Старт: {content.course_start_date ? formatDate(content.course_start_date) : '3 февраля 2026'}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="flex-1 text-lg px-8"
                      onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Записаться на пробный урок
                    </Button>
                    {content.trial_date && (
                      <SeatsCounter 
                        trialDate={content.trial_date} 
                        maxSeats={12}
                        minSeats={2}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Oratory Course */}
        <section className="py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row-reverse gap-8 items-start">
                {/* Video */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black w-full lg:w-[480px] flex-shrink-0">
                  <iframe
                    className="w-full aspect-video"
                    src="https://player.vimeo.com/video/997324695?badge=0&autopause=0&player_id=0&app_id=58479"
                    title="Курс ораторского искусства"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                    allowFullScreen
                  />
                </div>

                {/* Content */}
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">Ораторское искусство</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Курс для тех, кто хочет уверенно выступать перед аудиторией. 
                    От работы с голосом до импровизации и дебатов.
                  </p>

                  <h3 className="text-xl font-semibold mb-4">Чему вы научитесь:</h3>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={16} className="text-primary" />
                      </div>
                      <p className="text-muted-foreground">Применять систему Станиславского для подготовки выступлений</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={16} className="text-primary" />
                      </div>
                      <p className="text-muted-foreground">Строить логичную структуру речи и удерживать внимание аудитории</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={16} className="text-primary" />
                      </div>
                      <p className="text-muted-foreground">Улучшить дикцию, дыхание и тембр голоса</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={16} className="text-primary" />
                      </div>
                      <p className="text-muted-foreground">Преодолеть страх публичных выступлений и снять зажимы</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={16} className="text-primary" />
                      </div>
                      <p className="text-muted-foreground">Импровизировать, вести дебаты и работать с возражениями</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={16} className="text-primary" />
                      </div>
                      <p className="text-muted-foreground">Производить впечатление и запоминаться слушателям</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-3 rounded-lg border">
                      <Icon name="Calendar" className="text-primary flex-shrink-0" size={20} />
                      <span>Пробное: {content.oratory_trial_date ? formatDate(content.oratory_trial_date) : '1 февраля 2026'}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-3 rounded-lg border">
                      <Icon name="PlayCircle" className="text-primary flex-shrink-0" size={20} />
                      <span>Старт: {content.oratory_start_date ? formatDate(content.oratory_start_date) : '3 февраля 2026'}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="flex-1 text-lg px-8"
                      onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Записаться на пробный урок
                    </Button>
                    {content.oratory_trial_date && (
                      <SeatsCounter 
                        trialDate={content.oratory_trial_date} 
                        maxSeats={12}
                        minSeats={2}
                      />
                    )}
                  </div>
                </div>
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