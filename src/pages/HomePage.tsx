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
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <EditableContent
                contentKey="home_hero_title"
                defaultValue="Школа Казбека Меретукова"
                type="text"
                page="home"
                section="hero"
                as="h1"
                className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              />
              <EditableContent
                contentKey="home_hero_subtitle"
                defaultValue="Актёрское и ораторское мастерство от режиссёра телесериалов"
                type="textarea"
                page="home"
                section="hero"
                as="p"
                className="text-xl md:text-2xl text-muted-foreground"
              />
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6"
                  onClick={() => navigate('/acting')}
                >
                  Актёрское мастерство
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-6"
                  onClick={() => navigate('/oratory')}
                >
                  Ораторское искусство
                </Button>
              </div>
              <div className="flex items-center justify-center gap-6 mt-12 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Award" size={20} className="text-primary" />
                  <span>Победитель ТЕФИ-2012</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Star" size={20} className="text-primary" />
                  <span>{averageRating} ({reviews.length} отзывов)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Preview */}
        <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши направления</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Выберите курс, который поможет раскрыть ваш потенциал
              </p>
            </div>
            
            <div className="max-w-7xl mx-auto space-y-24">
              {/* Acting Course */}
              <div className="grid lg:grid-cols-5 gap-8 items-center">
                <div className="lg:col-span-3 rounded-3xl overflow-hidden shadow-2xl border border-primary/20 bg-card">
                  <VideoEmbed 
                    contentKey="home_acting_video"
                    defaultVideoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Актёрское мастерство"
                  />
                </div>
                <div className="lg:col-span-2 space-y-6">
                  <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold text-sm mb-2">
                    🎬 Актёрское мастерство
                  </div>
                  <h3 className="text-3xl font-bold">Раскройте актёрский талант</h3>
                  <EditableContent
                    contentKey="home_acting_short_desc"
                    defaultValue="Профессиональная работа на камеру, съёмка короткометражки и актёрские техники от режиссёра телесериалов"
                    type="textarea"
                    page="home"
                    section="acting"
                    as="p"
                    className="text-muted-foreground text-lg leading-relaxed"
                  />
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary/5 rounded-full text-sm">Работа на камеру</span>
                    <span className="px-3 py-1 bg-primary/5 rounded-full text-sm">Короткометражка</span>
                    <span className="px-3 py-1 bg-primary/5 rounded-full text-sm">Система Станиславского</span>
                  </div>
                  <Button size="lg" className="w-full sm:w-auto" onClick={() => navigate('/acting')}>
                    Узнать больше
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </div>
              </div>

              {/* Oratory Course */}
              <div className="grid lg:grid-cols-5 gap-8 items-center">
                <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
                  <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold text-sm mb-2">
                    🎤 Ораторское искусство
                  </div>
                  <h3 className="text-3xl font-bold">Овладейте силой слова</h3>
                  <EditableContent
                    contentKey="home_oratory_short_desc"
                    defaultValue="Уверенные публичные выступления, техники речи и работа с аудиторией для достижения ваших целей"
                    type="textarea"
                    page="home"
                    section="oratory"
                    as="p"
                    className="text-muted-foreground text-lg leading-relaxed"
                  />
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary/5 rounded-full text-sm">Техники речи</span>
                    <span className="px-3 py-1 bg-primary/5 rounded-full text-sm">Работа с аудиторией</span>
                    <span className="px-3 py-1 bg-primary/5 rounded-full text-sm">Уверенность</span>
                  </div>
                  <Button size="lg" className="w-full sm:w-auto" onClick={() => navigate('/oratory')}>
                    Узнать больше
                    <Icon name="ArrowRight" size={20} className="ml-2" />
                  </Button>
                </div>
                <div className="lg:col-span-3 rounded-3xl overflow-hidden shadow-2xl border border-primary/20 bg-card order-1 lg:order-2">
                  <VideoEmbed 
                    contentKey="home_oratory_video"
                    defaultVideoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Ораторское искусство"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form Section */}
        <section id="lead-form" className="py-12 px-4 md:py-20 md:px-4 relative overflow-hidden bg-muted/30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background"></div>
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto max-w-5xl relative z-10">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                  <Icon name="Sparkles" className="text-primary" size={18} />
                  <span className="text-primary font-semibold text-sm">Начните прямо сейчас</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  Запишитесь на <span className="text-primary">пробное занятие</span>
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-6">
                  Оставьте заявку прямо сейчас и получите:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="CheckCircle2" className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Пробное занятие бесплатно</h3>
                      <p className="text-sm text-muted-foreground">Познакомьтесь с преподавателем и форматом обучения</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Calendar" className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Персональную консультацию</h3>
                      <p className="text-sm text-muted-foreground">Обсудим ваши цели и подберём программу</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Star" className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Индивидуальный подход</h3>
                      <p className="text-sm text-muted-foreground">Учитываем ваш уровень и темп обучения</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card/80 backdrop-blur-sm rounded-xl md:rounded-2xl lg:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-primary/20">
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">Запишитесь на пробное занятие</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Укажите номер телефона и выберите курс</p>
                </div>
                <LeadForm 
                  source="home_page"
                  title=""
                  description=""
                  buttonText="Отправить заявку"
                />
                <div className="mt-4 sm:mt-6 flex items-center gap-2 text-[10px] sm:text-xs text-muted-foreground">
                  <Icon name="Lock" size={12} className="flex-shrink-0" />
                  <span>Ваши данные защищены и не передаются третьим лицам</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About School Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h2 className="text-4xl font-bold mb-6">О школе</h2>
                <EditableContent
                  contentKey="home_about_text"
                  defaultValue="Школа актёрского и ораторского мастерства Казбека Меретукова — это место, где рождаются таланты и развиваются навыки уверенного публичного выступления. Наш преподаватель — режиссёр телесериалов, победитель премии ТЕФИ-2012, с многолетним опытом работы в индустрии."
                  type="textarea"
                  page="home"
                  section="about"
                  as="p"
                  className="text-lg text-muted-foreground mb-6 leading-relaxed"
                />
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">15+</div>
                    <div className="text-sm text-muted-foreground">Лет опыта</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">500+</div>
                    <div className="text-sm text-muted-foreground">Выпускников</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">{averageRating}</div>
                    <div className="text-sm text-muted-foreground">Рейтинг школы</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">100%</div>
                    <div className="text-sm text-muted-foreground">Практики</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://cdn.poehali.dev/projects/d006fe31-f11a-48d3-ba82-54149e58d318/files/7cddbd50-0847-4321-92b1-f534403d6a21.jpg"
                  alt="Казбек Меретуков"
                  className="rounded-2xl shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Отзывы учеников</h2>
                <p className="text-xl text-muted-foreground">Что говорят о нас наши выпускники</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Icon 
                          key={i} 
                          name="Star" 
                          size={16} 
                          className={i < (review.rating || 5) ? "text-primary fill-primary" : "text-muted"} 
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 line-clamp-4">{review.text}</p>
                    <div className="font-semibold">{review.name}</div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button variant="outline" onClick={() => navigate('/reviews')}>
                  Все отзывы
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