import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/SchemaMarkup';
import { api, Review, BlogPost, TeamMember, SiteContent } from '@/lib/api';
import EditableContent from '@/components/EditableContent';
import VideoEmbed from '@/components/VideoEmbed';
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
      <div className="min-h-screen bg-background text-foreground">
        <Header />

        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background"></div>
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
                  <Icon name="Award" size={16} />
                  <span>Победитель ТЕФИ-2012</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  Раскройте свой потенциал в{' '}
                  <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    актёрском искусстве
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Обучение от режиссёра телесериалов Казбека Меретукова. 
                  Профессиональная подготовка актёров и ораторов в Москве
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <Button 
                    size="lg" 
                    className="text-lg px-10 py-7 shadow-lg hover:shadow-xl transition-shadow"
                    onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Записаться на пробное занятие
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="text-lg px-10 py-7"
                    onClick={() => navigate('/about')}
                  >
                    О преподавателе
                  </Button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm">
                  <div className="flex items-center gap-2">
                    <Icon name="Users" size={18} className="text-primary" />
                    <span className="text-muted-foreground">15+ лет опыта</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Star" size={18} className="text-primary" />
                    <span className="text-muted-foreground">{averageRating} ({reviews.length} отзывов)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="GraduationCap" size={18} className="text-primary" />
                    <span className="text-muted-foreground">Индивидуальный подход</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-24 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Направления обучения</h2>
              <p className="text-xl text-muted-foreground">Выберите свой путь в мир искусства</p>
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
              
              {/* Acting Course Card */}
              <div className="group bg-card rounded-3xl p-8 border border-border hover:border-primary/30 transition-all hover:shadow-2xl cursor-pointer" onClick={() => navigate('/acting')}>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon name="Drama" size={32} className="text-primary" />
                </div>
                
                <h3 className="text-3xl font-bold mb-4">Актёрское мастерство</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Профессиональная работа на камеру, съёмка короткометражки и актёрские техники от режиссёра телесериалов
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={14} className="text-primary" />
                    </div>
                    <span>Работа на камеру</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={14} className="text-primary" />
                    </div>
                    <span>Съёмка короткометражки</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={14} className="text-primary" />
                    </div>
                    <span>Система Станиславского</span>
                  </div>
                </div>

                <Button size="lg" className="w-full">
                  Узнать больше
                  <Icon name="ArrowRight" size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Oratory Course Card */}
              <div className="group bg-card rounded-3xl p-8 border border-border hover:border-primary/30 transition-all hover:shadow-2xl cursor-pointer" onClick={() => navigate('/oratory')}>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon name="Mic2" size={32} className="text-primary" />
                </div>
                
                <h3 className="text-3xl font-bold mb-4">Ораторское искусство</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Уверенные публичные выступления, техники речи и работа с аудиторией для достижения ваших целей
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={14} className="text-primary" />
                    </div>
                    <span>Техники речи и дикция</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={14} className="text-primary" />
                    </div>
                    <span>Работа с аудиторией</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={14} className="text-primary" />
                    </div>
                    <span>Уверенность в себе</span>
                  </div>
                </div>

                <Button size="lg" className="w-full">
                  Узнать больше
                  <Icon name="ArrowRight" size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

            </div>
          </div>
        </section>

        {/* Lead Form Section */}
        <section id="lead-form" className="py-24 bg-primary/5">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="bg-card rounded-3xl p-12 shadow-2xl border border-border">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-6">
                  <Icon name="Sparkles" size={16} />
                  <span>Бесплатное пробное занятие</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Начните обучение прямо сейчас</h2>
                <p className="text-lg text-muted-foreground">Оставьте заявку и получите индивидуальную консультацию</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-6 mb-12">
                <div className="text-center p-6 rounded-2xl bg-muted/30">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name="Clock" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">60 минут</h3>
                  <p className="text-sm text-muted-foreground">Полноценное занятие</p>
                </div>
                <div className="text-center p-6 rounded-2xl bg-muted/30">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name="User" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Индивидуально</h3>
                  <p className="text-sm text-muted-foreground">Один на один</p>
                </div>
                <div className="text-center p-6 rounded-2xl bg-muted/30">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon name="Gift" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">Бесплатно</h3>
                  <p className="text-sm text-muted-foreground">Первое занятие</p>
                </div>
              </div>

              <div className="max-w-lg mx-auto">
                <LeadForm 
                  source="home_page"
                  title=""
                  description=""
                  buttonText="Записаться на занятие"
                />
                <p className="text-xs text-center text-muted-foreground mt-6 flex items-center justify-center gap-2">
                  <Icon name="Lock" size={12} />
                  Данные защищены и не передаются третьим лицам
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About School Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Почему выбирают нас</h2>
                <p className="text-xl text-muted-foreground">Профессиональное обучение от практикующего режиссёра</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors">
                  <div className="text-5xl font-bold text-primary mb-2">15+</div>
                  <p className="text-muted-foreground">Лет опыта в индустрии</p>
                </div>
                <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors">
                  <div className="text-5xl font-bold text-primary mb-2">500+</div>
                  <p className="text-muted-foreground">Успешных выпускников</p>
                </div>
                <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors">
                  <div className="text-5xl font-bold text-primary mb-2">{averageRating}</div>
                  <p className="text-muted-foreground">Средний рейтинг</p>
                </div>
                <div className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors">
                  <div className="text-5xl font-bold text-primary mb-2">100%</div>
                  <p className="text-muted-foreground">Практика на занятиях</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <h3 className="text-3xl font-bold mb-6">О преподавателе</h3>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    Казбек Меретуков — режиссёр телесериалов, победитель премии ТЕФИ-2012. 
                    Более 15 лет опыта в киноиндустрии и обучении актёрскому мастерству.
                  </p>
                  <Button size="lg" onClick={() => navigate('/about')}>
                    Подробнее о преподавателе
                    <Icon name="ArrowRight" size={18} className="ml-2" />
                  </Button>
                </div>
                <div className="order-1 lg:order-2">
                  <img 
                    src="https://cdn.poehali.dev/projects/d006fe31-f11a-48d3-ba82-54149e58d318/files/7cddbd50-0847-4321-92b1-f534403d6a21.jpg"
                    alt="Казбек Меретуков"
                    className="rounded-3xl shadow-2xl w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <section className="py-24 bg-muted/20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Отзывы учеников</h2>
                <p className="text-xl text-muted-foreground">Реальные истории наших выпускников</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Icon 
                          key={i} 
                          name="Star" 
                          size={18} 
                          className={i < (review.rating || 5) ? "text-primary fill-primary" : "text-muted"} 
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-6">{review.text}</p>
                    <div className="font-bold text-lg">{review.name}</div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <Button size="lg" variant="outline" onClick={() => navigate('/reviews')}>
                  Читать все отзывы
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center bg-primary/5 rounded-2xl p-12 border border-primary/20">
              <h2 className="text-4xl font-bold mb-4">Готовы начать обучение?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Запишитесь на бесплатное пробное занятие и убедитесь в качестве наших курсов
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6" onClick={() => {
                  const formSection = document.querySelector('#lead-form');
                  if (formSection) {
                    formSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}>
                  Записаться на занятие
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={() => navigate('/contacts')}>
                  Связаться с нами
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
