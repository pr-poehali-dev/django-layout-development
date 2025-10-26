import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PhoneForm from '@/components/PhoneForm';
import { api, SiteContent } from '@/lib/api';

export default function ContactsPage() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await api.content.getAll();
      const contentMap: Record<string, string> = {};
      data.forEach((item: SiteContent) => {
        contentMap[item.key] = item.value;
      });
      setContent(contentMap);
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: 'MapPin',
      title: 'Адрес',
      value: content.address || 'г. Москва, ул. Примерная, д. 1',
      link: null
    },
    {
      icon: 'Phone',
      title: 'Телефон',
      value: content.phone || '+7 (999) 123-45-67',
      link: `tel:${(content.phone || '+7 (999) 123-45-67').replace(/\D/g, '')}`
    },
    {
      icon: 'Mail',
      title: 'Email',
      value: content.email || 'info@school.ru',
      link: `mailto:${content.email || 'info@school.ru'}`
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="pt-20 pb-12 px-4 md:pt-32 md:pb-20 md:px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4">
              <span className="text-primary">Контакты</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              Свяжитесь с нами удобным для вас способом
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12 md:py-20">
              <Icon name="Loader2" className="animate-spin mx-auto text-primary" size={48} />
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Как нас найти</h2>
                
                <div className="grid gap-4 md:gap-6">
                  {contactInfo.map((item, index) => (
                    <Card key={index} className="group hover:shadow-lg transition">
                      <CardContent className="p-4 md:p-6 flex items-start gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name={item.icon as any} className="text-primary" size={20} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1 text-sm md:text-base">{item.title}</h3>
                          {item.link ? (
                            <a 
                              href={item.link} 
                              className="text-sm md:text-base text-muted-foreground hover:text-primary transition"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-sm md:text-base text-muted-foreground">{item.value}</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
                  <CardContent className="p-6 md:p-8 text-center">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Запишитесь на курс</h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6">
                      Оставьте номер телефона, и мы свяжемся с вами в ближайшее время
                    </p>
                    <PhoneForm 
                      source="contacts_cta"
                      triggerText="Оставить заявку"
                      triggerClassName="w-full"
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Мы на карте</h2>
                
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  {content.map_embed ? (
                    <iframe
                      src={content.map_embed}
                      className="w-full h-full"
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <div className="text-center">
                        <Icon name="MapPin" className="mx-auto mb-4 text-muted-foreground" size={64} />
                        <p className="text-muted-foreground">Карта будет добавлена в ближайшее время</p>
                      </div>
                    </div>
                  )}
                </div>

                <Card>
                  <CardContent className="p-4 md:p-6">
                    <h3 className="font-semibold mb-3 md:mb-4 flex items-center gap-2 text-sm md:text-base">
                      <Icon name="Clock" className="text-primary" size={20} />
                      Режим работы
                    </h3>
                    <div className="space-y-2 text-sm md:text-base text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Понедельник - Пятница</span>
                        <span className="font-semibold">10:00 - 20:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Суббота - Воскресенье</span>
                        <span className="font-semibold">11:00 - 18:00</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}