import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { api, SiteContent } from '@/lib/api';

export default function OratoryPage() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const contentData = await api.content.getAll();
      const contentMap: Record<string, string> = {};
      contentData.forEach((item: SiteContent) => {
        contentMap[item.key] = item.value;
      });
      setContent(contentMap);
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent, source: string) => {
    e.preventDefault();
    if (!phone) return;

    setLoading(true);
    try {
      await api.leads.create(phone, `oratory_${source}`);
      alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
      setPhone('');
    } catch (error) {
      alert('Ошибка отправки. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  const oratorySkills = [
    {
      icon: 'Mic',
      title: 'Уверенные выступления',
      description: 'Научитесь выступать перед аудиторией любого размера без страха и волнения'
    },
    {
      icon: 'Volume2',
      title: 'Постановка голоса',
      description: 'Работа с голосом, дикцией, интонациями и речевым дыханием'
    },
    {
      icon: 'MessageSquare',
      title: 'Убедительная речь',
      description: 'Техники аргументации и убеждения для эффективной коммуникации'
    },
    {
      icon: 'Users',
      title: 'Работа с аудиторией',
      description: 'Установление контакта, управление вниманием и реакциями слушателей'
    },
    {
      icon: 'Zap',
      title: 'Харизма и энергия',
      description: 'Развитие личной харизмы и энергетики для запоминающихся выступлений'
    },
    {
      icon: 'BookOpen',
      title: 'Структура речи',
      description: 'Построение логичных и захватывающих выступлений от начала до конца'
    }
  ];

  const benefits = [
    'Карьерный рост и повышение',
    'Успешные презентации и питчи',
    'Уверенность на собеседованиях',
    'Эффективное управление командой',
    'Публичное признание и авторитет',
    'Нетворкинг и деловые связи'
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">Школа Казбека Меретукова</div>
          <nav className="hidden md:flex gap-6">
            <a href="/" className="text-muted-foreground hover:text-primary transition">Актерское мастерство</a>
            <a href="#skills" className="hover:text-primary transition">Навыки</a>
            <a href="#about" className="hover:text-primary transition">О преподавателе</a>
            <a href="#program" className="hover:text-primary transition">Программа</a>
          </nav>
          <Button asChild>
            <a href="#contact">Записаться</a>
          </Button>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold mb-6">
                Курс с Ольгой Штерц
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Ораторское <span className="text-primary">мастерство</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Профессиональный курс публичных выступлений. Научитесь говорить уверенно, убедительно и харизматично.
                Выступайте на сцене, проводите презентации и вдохновляйте людей.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-card p-4 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">8 недель</div>
                  <div className="text-sm text-muted-foreground">Длительность курса</div>
                </div>
                <div className="bg-card p-4 rounded-lg">
                  <div className="text-3xl font-bold text-primary mb-1">24 часа</div>
                  <div className="text-sm text-muted-foreground">Практики и тренингов</div>
                </div>
              </div>
              <form onSubmit={(e) => handleSubmit(e, 'hero')} className="flex gap-2">
                <Input
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="max-w-xs"
                />
                <Button type="submit" disabled={loading}>
                  {loading ? 'Отправка...' : 'Начать обучение'}
                </Button>
              </form>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <img
                src="https://cdn.poehali.dev/projects/d006fe31-f11a-48d3-ba82-54149e58d318/files/829de8e6-6182-458d-9aa3-3afb8faa0acc.jpg"
                alt="Ораторское мастерство"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Чему вы научитесь</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Комплексная программа развития навыков публичных выступлений
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {oratorySkills.map((skill, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                    <Icon name={skill.icon as any} className="text-primary" size={28} />
                  </div>
                  <CardTitle>{skill.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{skill.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Почему это важно?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-background rounded-2xl p-8">
                <Icon name="TrendingUp" className="text-primary mb-4" size={40} />
                <h3 className="text-2xl font-bold mb-4">Карьера и бизнес</h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Icon name="CheckCircle2" className="text-primary" size={20} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-background rounded-2xl p-8">
                <Icon name="Heart" className="text-primary mb-4" size={40} />
                <h3 className="text-2xl font-bold mb-4">Личностный рост</h3>
                <p className="text-muted-foreground mb-4">
                  Развитие ораторских навыков трансформирует не только вашу карьеру, но и личную жизнь:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Icon name="CheckCircle2" className="text-primary" size={20} />
                    <span>Преодоление страха публичных выступлений</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon name="CheckCircle2" className="text-primary" size={20} />
                    <span>Развитие уверенности в себе</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon name="CheckCircle2" className="text-primary" size={20} />
                    <span>Улучшение навыков коммуникации</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Icon name="CheckCircle2" className="text-primary" size={20} />
                    <span>Расширение зоны комфорта</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-4xl font-bold mb-6">Ольга Штерц</h2>
              <div className="text-xl text-primary font-semibold mb-4">
                Эксперт по ораторскому искусству
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                {content.olga_bio || 'Профессиональный тренер по публичным выступлениям с более чем 10-летним опытом. Помогла сотням людей обрести уверенность на сцене и в деловом общении.'}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="Award" className="text-primary" size={24} />
                  <span>Сертифицированный специалист по речевым коммуникациям</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Users" className="text-primary" size={24} />
                  <span>Обучила более 800 студентов</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Sparkles" className="text-primary" size={24} />
                  <span>Авторская методика преподавания</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Briefcase" className="text-primary" size={24} />
                  <span>Консультант крупных компаний и спикеров</span>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Icon name="User" size={120} className="text-primary/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="program" className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Программа курса</h2>
          <div className="space-y-6">
            {[
              {
                week: 'Неделя 1-2',
                title: 'Основы ораторского искусства',
                topics: ['Преодоление страха сцены', 'Постановка голоса', 'Дыхательные техники', 'Артикуляция и дикция']
              },
              {
                week: 'Неделя 3-4',
                title: 'Структура и содержание',
                topics: ['Построение речи', 'Сторителлинг', 'Аргументация', 'Работа с материалом']
              },
              {
                week: 'Неделя 5-6',
                title: 'Харизма и энергетика',
                topics: ['Язык тела', 'Зрительный контакт', 'Жесты и мимика', 'Работа с пространством сцены']
              },
              {
                week: 'Неделя 7-8',
                title: 'Мастерство и практика',
                topics: ['Импровизация', 'Работа с вопросами', 'Управление аудиторией', 'Итоговое выступление']
              }
            ].map((module, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-primary/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-primary font-semibold mb-1">{module.week}</div>
                      <CardTitle className="text-xl">{module.title}</CardTitle>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">{index + 1}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {module.topics.map((topic, topicIndex) => (
                      <div key={topicIndex} className="flex items-center gap-2">
                        <Icon name="Dot" className="text-primary" size={20} />
                        <span className="text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl p-12 max-w-3xl mx-auto text-center">
            <Icon name="Sparkles" size={64} className="mx-auto mb-6 text-primary" />
            <h2 className="text-4xl font-bold mb-4">Начните путь к мастерству</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Запишитесь на курс ораторского искусства и раскройте свой потенциал
            </p>
            <form onSubmit={(e) => handleSubmit(e, 'footer')} className="space-y-4">
              <Input
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="max-w-md mx-auto"
              />
              <Button type="submit" size="lg" disabled={loading}>
                {loading ? 'Отправка...' : 'Записаться на курс'}
              </Button>
            </form>
          </div>
        </div>
      </section>

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
