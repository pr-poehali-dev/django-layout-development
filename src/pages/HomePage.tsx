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
        <section className="py-32 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.4),rgba(255,255,255,0))]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <div className="inline-block mb-4">
                <span className="bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-semibold tracking-wide">
                  ✦ Наши курсы
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Направления обучения</h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">Профессиональное развитие с индивидуальным подходом</p>
            </div>

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
              
              {/* Acting Course Card */}
              <div className="group relative bg-gradient-to-br from-card via-card to-card/80 rounded-[32px] p-10 border-2 border-border hover:border-primary/40 transition-all duration-500 hover:shadow-[0_20px_80px_-20px_rgba(120,119,198,0.3)] cursor-pointer overflow-hidden" onClick={() => navigate('/acting')}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl transform translate-x-20 -translate-y-20 group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <Icon name="Drama" size={40} className="text-primary" />
                  </div>
                  
                  <h3 className="text-4xl font-bold mb-5 group-hover:text-primary transition-colors">Актёрское мастерство</h3>
                  <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                    Профессиональная работа на камеру и съёмка короткометражного фильма. Изучение техник от режиссёра телесериалов
                  </p>

                  <div className="space-y-4 mb-10">
                    <div className="flex items-start gap-4">
                      <div className="w-7 h-7 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={16} className="text-primary font-bold" />
                      </div>
                      <div>
                        <div className="font-semibold text-base mb-1">Работа на камеру</div>
                        <div className="text-sm text-muted-foreground">Съёмки и монтаж короткометражки</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-7 h-7 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={16} className="text-primary font-bold" />
                      </div>
                      <div>
                        <div className="font-semibold text-base mb-1">Актёрские техники</div>
                        <div className="text-sm text-muted-foreground">Система Станиславского и современные методики</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-7 h-7 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={16} className="text-primary font-bold" />
                      </div>
                      <div>
                        <div className="font-semibold text-base mb-1">Практический опыт</div>
                        <div className="text-sm text-muted-foreground">Реальные проекты и сценические постановки</div>
                      </div>
                    </div>
                  </div>

                  <Button size="lg" className="w-full h-14 text-lg font-semibold shadow-lg group-hover:shadow-xl group-hover:scale-[1.02] transition-all">
                    Подробнее о курсе
                    <Icon name="ArrowRight" size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </div>
              </div>

              {/* Oratory Course Card */}
              <div className="group relative bg-gradient-to-br from-card via-card to-card/80 rounded-[32px] p-10 border-2 border-border hover:border-primary/40 transition-all duration-500 hover:shadow-[0_20px_80px_-20px_rgba(120,119,198,0.3)] cursor-pointer overflow-hidden" onClick={() => navigate('/oratory')}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl transform translate-x-20 -translate-y-20 group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <Icon name="Mic2" size={40} className="text-primary" />
                  </div>
                  
                  <h3 className="text-4xl font-bold mb-5 group-hover:text-primary transition-colors">Ораторское искусство</h3>
                  <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                    Уверенные публичные выступления и работа с аудиторией. Техники речи для достижения ваших целей
                  </p>

                  <div className="space-y-4 mb-10">
                    <div className="flex items-start gap-4">
                      <div className="w-7 h-7 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={16} className="text-primary font-bold" />
                      </div>
                      <div>
                        <div className="font-semibold text-base mb-1">Техники речи</div>
                        <div className="text-sm text-muted-foreground">Дикция, интонация и голосовые упражнения</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-7 h-7 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={16} className="text-primary font-bold" />
                      </div>
                      <div>
                        <div className="font-semibold text-base mb-1">Работа с аудиторией</div>
                        <div className="text-sm text-muted-foreground">Управление вниманием и харизма</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-7 h-7 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={16} className="text-primary font-bold" />
                      </div>
                      <div>
                        <div className="font-semibold text-base mb-1">Уверенность в себе</div>
                        <div className="text-sm text-muted-foreground">Преодоление страха сцены и самопрезентация</div>
                      </div>
                    </div>
                  </div>

                  <Button size="lg" className="w-full h-14 text-lg font-semibold shadow-lg group-hover:shadow-xl group-hover:scale-[1.02] transition-all">
                    Подробнее о курсе
                    <Icon name="ArrowRight" size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Lead Form Section */}
        <section id="lead-form" className="py-32 bg-gradient-to-br from-primary/8 via-primary/3 to-background relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_30%,rgba(120,119,198,0.6),rgba(255,255,255,0))]"></div>
          <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
          
          <div className="container mx-auto max-w-5xl px-4 relative z-10">
            <div className="bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-sm rounded-[40px] p-14 shadow-[0_25px_100px_-20px_rgba(120,119,198,0.25)] border-2 border-primary/20">
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/15 to-primary/10 rounded-full text-sm font-bold text-primary mb-8 shadow-sm">
                  <Icon name="Sparkles" size={18} className="animate-pulse" />
                  <span className="tracking-wide">БЕСПЛАТНОЕ ПРОБНОЕ ЗАНЯТИЕ</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">Начните обучение<br />прямо сейчас</h2>
                <p className="text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">Оставьте заявку и получите персональную консультацию от преподавателя</p>
              </div>

              <div className="grid sm:grid-cols-3 gap-8 mb-14">
                <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-muted/40 to-muted/20 border border-muted/50 hover:border-primary/30 transition-all duration-300 hover:scale-105">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-5 shadow-md">
                    <Icon name="Clock" size={28} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">60 минут</h3>
                  <p className="text-sm text-muted-foreground">Полноценное занятие с преподавателем</p>
                </div>
                <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-muted/40 to-muted/20 border border-muted/50 hover:border-primary/30 transition-all duration-300 hover:scale-105">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-5 shadow-md">
                    <Icon name="User" size={28} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Индивидуально</h3>
                  <p className="text-sm text-muted-foreground">Персональный подход один на один</p>
                </div>
                <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-muted/40 to-muted/20 border border-muted/50 hover:border-primary/30 transition-all duration-300 hover:scale-105">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-5 shadow-md">
                    <Icon name="Gift" size={28} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Бесплатно</h3>
                  <p className="text-sm text-muted-foreground">Первое занятие в подарок</p>
                </div>
              </div>

              <div className="max-w-md mx-auto">
                <LeadForm 
                  source="home_page"
                  title=""
                  description=""
                  buttonText="Записаться на пробное занятие"
                />
                <p className="text-xs text-center text-muted-foreground mt-8 flex items-center justify-center gap-2">
                  <Icon name="Lock" size={14} />
                  Данные защищены и не передаются третьим лицам
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About School Section */}
        <section className="py-32 bg-gradient-to-b from-background via-muted/10 to-background relative">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <div className="inline-block mb-4">
                  <span className="bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-semibold tracking-wide">
                    ★ Наши достижения
                  </span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Почему выбирают нас</h2>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">Профессиональное обучение от практикующего режиссёра телесериалов</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                <div className="group bg-gradient-to-br from-card to-card/80 border-2 border-border hover:border-primary/40 rounded-3xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="text-6xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">15+</div>
                  <p className="text-base font-medium text-muted-foreground">Лет опыта<br/>в индустрии</p>
                </div>
                <div className="group bg-gradient-to-br from-card to-card/80 border-2 border-border hover:border-primary/40 rounded-3xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="text-6xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">500+</div>
                  <p className="text-base font-medium text-muted-foreground">Успешных<br/>выпускников</p>
                </div>
                <div className="group bg-gradient-to-br from-card to-card/80 border-2 border-border hover:border-primary/40 rounded-3xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="text-6xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">{averageRating}</div>
                  <p className="text-base font-medium text-muted-foreground">Средний<br/>рейтинг</p>
                </div>
                <div className="group bg-gradient-to-br from-card to-card/80 border-2 border-border hover:border-primary/40 rounded-3xl p-8 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="text-6xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">100%</div>
                  <p className="text-base font-medium text-muted-foreground">Практика на<br/>занятиях</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-16 items-center bg-gradient-to-br from-card/50 to-card/30 rounded-[40px] p-12 border-2 border-border/50">
                <div className="order-2 lg:order-1">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-6">
                    <Icon name="Award" size={16} />
                    <span>Победитель ТЕФИ-2012</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">О преподавателе</h3>
                  <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                    Казбек Меретуков — режиссёр телесериалов, победитель премии ТЕФИ-2012. 
                    Более 15 лет опыта в киноиндустрии и обучении актёрскому мастерству.
                  </p>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Award" size={20} className="text-primary" />
                      </div>
                      <span className="text-base">Практикующий режиссёр телесериалов</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="GraduationCap" size={20} className="text-primary" />
                      </div>
                      <span className="text-base">Индивидуальный подход к каждому ученику</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Video" size={20} className="text-primary" />
                      </div>
                      <span className="text-base">Съёмки короткометражных фильмов</span>
                    </div>
                  </div>
                  <Button size="lg" className="h-14 px-8 text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all" onClick={() => navigate('/about')}>
                    Подробнее о преподавателе
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/0 rounded-[32px] blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                    <img 
                      src="https://cdn.poehali.dev/projects/d006fe31-f11a-48d3-ba82-54149e58d318/files/7cddbd50-0847-4321-92b1-f534403d6a21.jpg"
                      alt="Казбек Меретуков"
                      className="relative rounded-[32px] shadow-2xl w-full group-hover:scale-[1.02] transition-transform duration-500 border-4 border-card"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <section className="py-32 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_70%_50%,rgba(120,119,198,0.4),rgba(255,255,255,0))]"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-20">
                <div className="inline-block mb-4">
                  <span className="bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-semibold tracking-wide">
                    ⭐ Отзывы
                  </span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Что говорят наши ученики</h2>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">Реальные истории успеха наших выпускников</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="group bg-gradient-to-br from-card via-card to-card/80 border-2 border-border hover:border-primary/40 rounded-[28px] p-10 hover:shadow-[0_20px_80px_-20px_rgba(120,119,198,0.3)] transition-all duration-500 hover:scale-[1.02]">
                    <div className="flex items-center gap-1 mb-8">
                      {[...Array(5)].map((_, i) => (
                        <Icon 
                          key={i} 
                          name="Star" 
                          size={22} 
                          className={i < (review.rating || 5) ? "text-primary fill-primary" : "text-muted"} 
                        />
                      ))}
                    </div>
                    <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed line-clamp-6">{review.text}</p>
                    <div className="flex items-center gap-3 pt-6 border-t border-border/50">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="User" size={20} className="text-primary" />
                      </div>
                      <div className="font-bold text-lg group-hover:text-primary transition-colors">{review.name}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-16">
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-2 hover:border-primary hover:bg-primary/5 transition-all hover:scale-105 shadow-md" onClick={() => navigate('/reviews')}>
                  Читать все отзывы ({reviews.length})
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-[40px] blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-primary/8 via-primary/4 to-background rounded-[40px] p-16 border-2 border-primary/25 shadow-xl">
                <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/15 rounded-full text-sm font-bold text-primary mb-8">
                  <Icon name="Rocket" size={16} />
                  <span className="tracking-wide">ПОЕХАЛИ!</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">Готовы начать<br />обучение?</h2>
                <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
                  Запишитесь на бесплатное пробное занятие и убедитесь в качестве наших курсов
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button size="lg" className="text-lg px-12 py-8 h-16 shadow-xl hover:shadow-2xl hover:scale-105 transition-all font-semibold" onClick={() => {
                    const formSection = document.querySelector('#lead-form');
                    if (formSection) {
                      formSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}>
                    Записаться на занятие
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-12 py-8 h-16 border-2 hover:bg-primary/5 hover:border-primary hover:scale-105 transition-all font-semibold" onClick={() => navigate('/contacts')}>
                    Связаться с нами
                    <Icon name="Phone" size={20} className="mr-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}