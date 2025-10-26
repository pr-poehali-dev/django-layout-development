import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { api, CourseModule, Review, FAQ, GalleryImage, BlogPost, SiteContent } from '@/lib/api';

export default function ActingPage() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [faq, setFAQ] = useState<FAQ[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [blog, setBlog] = useState<BlogPost[]>([]);
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [modulesData, reviewsData, faqData, galleryData, blogData, contentData] = await Promise.all([
        api.modules.getByCourse('acting'),
        api.gallery.getReviews(),
        api.gallery.getFAQ(),
        api.gallery.getImages(),
        api.gallery.getBlog(),
        api.content.getAll()
      ]);

      setModules(modulesData);
      setReviews(reviewsData);
      setFAQ(faqData);
      setGallery(galleryData);
      setBlog(blogData);

      const contentMap: Record<string, string> = {};
      contentData.forEach((item: SiteContent) => {
        contentMap[item.key] = item.value;
      });
      setContent(contentMap);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent, source: string) => {
    e.preventDefault();
    if (!phone) return;

    setLoading(true);
    try {
      await api.leads.create(phone, source);
      alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
      setPhone('');
    } catch (error) {
      alert('Ошибка отправки. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">Школа Казбека Меретукова</div>
          <nav className="hidden md:flex gap-6">
            <a href="#modules" className="hover:text-primary transition">Модули</a>
            <a href="#about" className="hover:text-primary transition">О школе</a>
            <a href="#reviews" className="hover:text-primary transition">Отзывы</a>
            <a href="#blog" className="hover:text-primary transition">Блог</a>
            <a href="/oratory" className="text-muted-foreground hover:text-primary transition">Ораторское искусство</a>
          </nav>
          <Button asChild>
            <a href="#contact">Записаться</a>
          </Button>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4 relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://cdn.poehali.dev/projects/d006fe31-f11a-48d3-ba82-54149e58d318/files/0c090e0f-2880-4f27-8c3e-d4c43afc5fda.jpg"
            alt="Актерское мастерство"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60"></div>
        </div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Станьте <span className="text-primary">звездой</span> своего кино
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              Запишитесь на <span className="text-primary font-semibold">бесплатное пробное занятие</span> по актерскому мастерству
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Профессиональное обучение от режиссера Казбека Меретукова. Преодолейте страх камеры, обретите уверенность и снимите свое настоящее кино с прослушиванием!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Icon name="Calendar" className="text-primary" size={20} />
                <span>Пробное: {content.trial_date || '15 ноября'}</span>
              </div>
              <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Icon name="PlayCircle" className="text-primary" size={20} />
                <span>Старт: {content.course_start_date || '1 декабря'}</span>
              </div>
            </div>
            <form onSubmit={(e) => handleSubmit(e, 'hero')} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="max-w-xs bg-card/90 backdrop-blur-sm"
              />
              <Button type="submit" disabled={loading} size="lg">
                {loading ? 'Отправка...' : 'Записаться на пробный урок'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto">
          <div className="aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src={content.hero_video_url || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Для кого этот курс?</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Курс подходит для всех, кто хочет развить актерские навыки и уверенность в себе
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Users" className="text-primary" size={24} />
                </div>
                <CardTitle>Побороть застенчивость</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Для тех, кто хочет стать более открытым, раскрепощенным и уверенным в общении
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Camera" className="text-primary" size={24} />
                </div>
                <CardTitle>Преодолеть страх камеры</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Научитесь естественно вести себя перед камерой и в кадре
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Sparkles" className="text-primary" size={24} />
                </div>
                <CardTitle>Обрести уверенность</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Поверьте в свои силы и раскройте внутренний потенциал
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          <div className="bg-card p-8 rounded-2xl max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-center">Оставьте заявку</h3>
            <form onSubmit={(e) => handleSubmit(e, 'for_whom')} className="space-y-4">
              <Input
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Отправка...' : 'Записаться на курс'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section id="modules" className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Программа курса</h2>
          <p className="text-center text-muted-foreground mb-12">6 модулей от базы до съемок собственного кино</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <Card key={module.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                    {module.image_url ? (
                      <img src={module.image_url} alt={module.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                        <span className="text-6xl font-bold text-primary/30">{index + 1}</span>
                      </div>
                    )}
                  </div>
                  <CardTitle>{module.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{module.description}</CardDescription>
                  <div className="flex items-start gap-2 text-sm text-primary">
                    <Icon name="CheckCircle2" size={16} className="mt-0.5" />
                    <span className="font-medium">{module.result}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl p-12 text-center">
            <Icon name="Film" size={64} className="mx-auto mb-6 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Снимите свое настоящее кино!</h2>
            <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto">
              Представьте: вы на съемочной площадке. Свет, камера, мотор! 🎬
            </p>
            <p className="text-lg text-muted-foreground mb-4 max-w-2xl mx-auto">
              Это не мечта — это реальность нашего курса! По завершении обучения вы не просто получите сертификат. 
              Вы станете <span className="text-primary font-semibold">главным героем собственного короткометражного фильма</span>.
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Профессиональная съемочная группа, опытный режиссер Казбек Меретуков, настоящая кинокамера и прослушивание — 
              всё по-настоящему, как в большом кино! Вы пройдете кастинг, получите роль и сыграете её перед камерой. 
              А после премьеры сможете с гордостью показать свой фильм друзьям и семье. Это ваш первый шаг к большой сцене!
            </p>
            {content.final_video_url && (
              <div className="aspect-video max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl">
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

      <section id="about" className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <img
                src="https://cdn.poehali.dev/projects/d006fe31-f11a-48d3-ba82-54149e58d318/files/2f9cd495-aad4-4dd8-8ef8-16f99e26b165.jpg"
                alt="Казбек Меретуков"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Казбек Меретуков</h2>
              <p className="text-lg text-muted-foreground mb-6">
                {content.kazbek_bio || 'Российский режиссер и педагог актерского мастерства с многолетним опытом работы в кино и театре.'}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="Award" className="text-primary" size={24} />
                  <span>Режиссер профессиональных кино-проектов</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="GraduationCap" className="text-primary" size={24} />
                  <span>Педагог с опытом обучения более 500 студентов</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Star" className="text-primary" size={24} />
                  <span>Авторская методика преподавания</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-card p-12 rounded-3xl max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Запишитесь на курс</h2>
            <p className="text-muted-foreground mb-8">
              Оставьте номер телефона, и мы свяжемся с вами для записи на пробное занятие
            </p>
            <form onSubmit={(e) => handleSubmit(e, 'footer_form')} className="space-y-4">
              <Input
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="max-w-md mx-auto"
              />
              <Button type="submit" size="lg" disabled={loading}>
                {loading ? 'Отправка...' : 'Записаться сейчас'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Галерея</h2>
          {gallery.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((image) => (
                <div key={image.id} className="aspect-square rounded-lg overflow-hidden group cursor-pointer">
                  <img
                    src={image.url}
                    alt={image.caption || ''}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              <Icon name="Image" size={64} className="mx-auto mb-4 opacity-30" />
              <p>Галерея скоро появится</p>
            </div>
          )}
        </div>
      </section>

      <section id="reviews" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Отзывы наших учеников</h2>
          {reviews.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      {review.image_url && (
                        <img src={review.image_url} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                      )}
                      <div>
                        <CardTitle className="text-lg">{review.name}</CardTitle>
                        <div className="flex gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Icon key={i} name="Star" size={16} className="text-primary fill-primary" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{review.text}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              <Icon name="MessageSquare" size={64} className="mx-auto mb-4 opacity-30" />
              <p>Отзывы скоро появятся</p>
            </div>
          )}
        </div>
      </section>

      <section id="blog" className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Блог</h2>
          {blog.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blog.map((post) => (
                <Card key={post.id} className="group hover:shadow-xl transition">
                  {post.image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              <Icon name="BookOpen" size={64} className="mx-auto mb-4 opacity-30" />
              <p>Статьи скоро появятся</p>
            </div>
          )}
        </div>
      </section>

      {faq.length > 0 && (
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold text-center mb-12">Частые вопросы</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faq.map((item) => (
                <AccordionItem key={item.id} value={`item-${item.id}`} className="bg-card px-6 rounded-lg border-0">
                  <AccordionTrigger className="hover:no-underline">{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      <footer className="py-12 px-4 bg-card border-t border-border">
        <div className="container mx-auto text-center">
          <div className="text-2xl font-bold text-primary mb-4">Школа Казбека Меретукова</div>
          <p className="text-muted-foreground mb-6">Актерское и ораторское мастерство в Москве</p>
          <div className="flex justify-center gap-6">
            <a href="/" className="hover:text-primary transition">Актерское мастерство</a>
            <a href="/oratory" className="hover:text-primary transition">Ораторское искусство</a>
            <a href="/admin" className="text-muted-foreground hover:text-primary transition text-sm">Админка</a>
          </div>
        </div>
      </footer>
    </div>
  );
}