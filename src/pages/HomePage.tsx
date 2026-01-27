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

        {/* Courses */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Направления обучения</h2>
              <p className="text-muted-foreground">Профессиональные курсы для начинающих и практикующих</p>
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
              <div 
                className="bg-card p-8 rounded-2xl border hover:border-primary cursor-pointer transition-all"
                onClick={() => navigate('/acting')}
              >
                <Icon name="Drama" size={40} className="text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">Актёрское мастерство</h3>
                <p className="text-muted-foreground mb-6">
                  Работа на камеру, съёмка короткометражки, система Станиславского
                </p>
                <Button variant="outline" className="w-full">Подробнее</Button>
              </div>

              <div 
                className="bg-card p-8 rounded-2xl border hover:border-primary cursor-pointer transition-all"
                onClick={() => navigate('/oratory')}
              >
                <Icon name="Mic2" size={40} className="text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">Ораторское искусство</h3>
                <p className="text-muted-foreground mb-6">
                  Техники речи, работа с аудиторией, уверенность в себе
                </p>
                <Button variant="outline" className="w-full">Подробнее</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <section id="lead-form" className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Бесплатное пробное занятие</h2>
                <p className="text-muted-foreground">Оставьте заявку и мы свяжемся с вами</p>
              </div>

              <div className="bg-card p-8 rounded-2xl border">
                <LeadForm 
                  source="home_page"
                  title=""
                  description=""
                  buttonText="Записаться"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <p className="text-sm text-muted-foreground">Лет опыта</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <p className="text-sm text-muted-foreground">Выпускников</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{averageRating}</div>
                <p className="text-sm text-muted-foreground">Рейтинг</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <p className="text-sm text-muted-foreground">Практика</p>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Казбек Меретуков</h2>
                <p className="text-muted-foreground mb-6">
                  Режиссёр телесериалов, победитель премии ТЕФИ-2012. 
                  Более 15 лет опыта в киноиндустрии и обучении актёрскому мастерству.
                </p>
                <Button onClick={() => navigate('/about')}>
                  Подробнее
                </Button>
              </div>
              <div>
                <img 
                  src="https://cdn.poehali.dev/projects/d006fe31-f11a-48d3-ba82-54149e58d318/files/7cddbd50-0847-4321-92b1-f534403d6a21.jpg"
                  alt="Казбек Меретуков"
                  className="rounded-2xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        {reviews.length > 0 && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Отзывы учеников</h2>
              </div>
              
              <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
                {reviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="bg-card p-6 rounded-2xl border">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Icon 
                          key={i} 
                          name="Star" 
                          size={16} 
                          className={i < (review.rating || 5) ? "text-primary fill-primary" : "text-muted"} 
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-4">{review.text}</p>
                    <p className="font-medium">{review.name}</p>
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

        <Footer />
      </div>
    </>
  );
}
