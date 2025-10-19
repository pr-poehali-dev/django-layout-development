import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    {
      icon: 'Target',
      title: 'Стратегия',
      description: 'Разрабатываем маркетинговую стратегию на основе глубокого анализа вашего бизнеса и рынка'
    },
    {
      icon: 'TrendingUp',
      title: 'Performance',
      description: 'Настраиваем и ведём рекламные кампании с фокусом на измеримые результаты'
    },
    {
      icon: 'Users',
      title: 'SMM',
      description: 'Создаём вовлекающий контент и управляем репутацией в социальных сетях'
    },
    {
      icon: 'BarChart3',
      title: 'Аналитика',
      description: 'Собираем данные, анализируем метрики и даём рекомендации для роста'
    }
  ];

  const cases = [
    {
      company: 'E-commerce Бренд',
      category: 'Performance',
      result: '+340% ROI',
      description: 'Увеличили продажи онлайн-магазина в 4 раза за 6 месяцев через комплексную настройку performance-каналов',
      metrics: [
        { label: 'ROI', value: '+340%' },
        { label: 'Трафик', value: '+215%' },
        { label: 'Конверсия', value: '+87%' }
      ]
    },
    {
      company: 'SaaS Стартап',
      category: 'Стратегия',
      result: '12 000 лидов',
      description: 'Разработали и запустили маркетинговую стратегию выхода на новый рынок с нуля',
      metrics: [
        { label: 'Лиды', value: '12K' },
        { label: 'CPL', value: '-56%' },
        { label: 'Конверсия в продажу', value: '23%' }
      ]
    },
    {
      company: 'Финтех Компания',
      category: 'Комплекс',
      result: '+180% узнаваемость',
      description: 'Построили бренд с нуля: от позиционирования до multi-channel кампании',
      metrics: [
        { label: 'Brand Awareness', value: '+180%' },
        { label: 'Охват', value: '2.5M' },
        { label: 'Engagement', value: '+95%' }
      ]
    }
  ];

  const blogPosts = [
    {
      title: 'Тренды performance-маркетинга в 2024',
      category: 'Аналитика',
      date: '15 октября 2024',
      readTime: '8 мин',
      excerpt: 'Разбираем ключевые изменения в digital-рекламе: от AI-оптимизации до privacy-first подходов'
    },
    {
      title: 'Как мы снизили CAC на 67% для B2B клиента',
      category: 'Кейс',
      date: '8 октября 2024',
      readTime: '12 мин',
      excerpt: 'Пошаговый разбор стратегии оптимизации воронки продаж и рекламных каналов'
    },
    {
      title: 'Attribution models: какую выбрать в 2024',
      category: 'Гайд',
      date: '1 октября 2024',
      readTime: '10 мин',
      excerpt: 'Сравниваем модели атрибуции и даём рекомендации для разных типов бизнеса'
    }
  ];

  const faqs = [
    {
      question: 'Как вы измеряете эффективность маркетинга?',
      answer: 'Мы используем комплексный подход к аналитике: отслеживаем все ключевые метрики от первого касания до конверсии, настраиваем сквозную аналитику и регулярно предоставляем детальные отчёты с инсайтами и рекомендациями.'
    },
    {
      question: 'Какой минимальный бюджет для старта?',
      answer: 'Минимальный бюджет зависит от ваших целей и отрасли. Обычно мы рекомендуем от 150 000 ₽/мес на рекламу + наше агентское вознаграждение. Это позволяет получить достаточно данных для оптимизации.'
    },
    {
      question: 'Сколько времени до первых результатов?',
      answer: 'Первые результаты в performance-каналах видны через 2-4 недели. Для стратегических проектов (SEO, контент-маркетинг, brand awareness) горизонт планирования — 3-6 месяцев.'
    },
    {
      question: 'Работаете ли вы с малым бизнесом?',
      answer: 'Да, мы работаем с компаниями разного размера. Для малого бизнеса предлагаем адаптированные решения с фокусом на быструю отдачу и эффективное использование бюджета.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">MarketPro</div>
            <div className="hidden md:flex items-center gap-8">
              {['Главная', 'О нас', 'Услуги', 'Кейсы', 'Блог', 'FAQ', 'Контакты'].map((item, idx) => {
                const id = ['home', 'about', 'services', 'cases', 'blog', 'faq', 'contact'][idx];
                return (
                  <button
                    key={item}
                    onClick={() => scrollToSection(id)}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      activeSection === id ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
            <Button onClick={() => scrollToSection('contact')}>Связаться</Button>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center animate-fade-in">
            <Badge className="mb-6" variant="secondary">
              Performance Marketing Agency
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Маркетинг, который окупается
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Разрабатываем стратегии и запускаем кампании с фокусом на измеримый рост вашего бизнеса
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => scrollToSection('cases')}>
                <Icon name="Rocket" size={20} className="mr-2" />
                Наши кейсы
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('contact')}>
                Обсудить проект
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center">О нас</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="animate-scale-in hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Award" size={24} className="text-primary" />
                </div>
                <CardTitle>7+ лет опыта</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Работаем с 2017 года, запустили более 200 успешных проектов в разных нишах
                </p>
              </CardContent>
            </Card>
            <Card className="animate-scale-in hover:shadow-lg transition-shadow" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Icon name="LineChart" size={24} className="text-accent" />
                </div>
                <CardTitle>Data-driven подход</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Принимаем решения на основе данных, а не предположений. Каждая гипотеза тестируется
                </p>
              </CardContent>
            </Card>
            <Card className="animate-scale-in hover:shadow-lg transition-shadow" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name="Zap" size={24} className="text-primary" />
                </div>
                <CardTitle>Прозрачность</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Полная отчётность по всем метрикам, еженедельные встречи и доступ к аналитике 24/7
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-4 text-center">Услуги</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Комплексные решения для роста вашего бизнеса
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, idx) => (
              <Card
                key={idx}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon name={service.icon as any} size={28} className="text-white" />
                    </div>
                    <div>
                      <CardTitle className="mb-2">{service.title}</CardTitle>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="cases" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-4 text-center">Кейсы</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Реальные результаты наших клиентов
          </p>
          <div className="grid gap-8">
            {cases.map((caseItem, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge className="mb-3">{caseItem.category}</Badge>
                      <CardTitle className="text-2xl mb-2">{caseItem.company}</CardTitle>
                      <CardDescription className="text-base">{caseItem.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">{caseItem.result}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-3 gap-6">
                    {caseItem.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="text-center">
                        <div className="text-2xl font-bold text-accent mb-1">{metric.value}</div>
                        <div className="text-sm text-muted-foreground">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-4 text-center">Блог</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Аналитика, кейсы и инсайты из мира маркетинга
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post, idx) => (
              <Card key={idx} className="group hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1">
                <CardHeader>
                  <Badge className="w-fit mb-3" variant="secondary">
                    {post.category}
                  </Badge>
                  <CardTitle className="group-hover:text-primary transition-colors mb-3">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-base mb-4">{post.excerpt}</CardDescription>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      {post.readTime}
                    </span>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-4 text-center">Вопросы и ответы</h2>
          <p className="text-muted-foreground text-center mb-12">
            Ответы на частые вопросы о работе с нами
          </p>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Готовы начать?</h2>
            <p className="text-muted-foreground text-lg">
              Оставьте заявку, и мы свяжемся с вами в течение 24 часов
            </p>
          </div>
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Имя</label>
                    <Input placeholder="Ваше имя" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Компания</label>
                    <Input placeholder="Название компании" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Телефон</label>
                  <Input type="tel" placeholder="+7 (___) ___-__-__" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Расскажите о проекте</label>
                  <Textarea placeholder="Опишите ваши цели и задачи..." rows={5} />
                </div>
                <Button size="lg" className="w-full">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">MarketPro</div>
              <p className="text-primary-foreground/80 text-sm">
                Performance-маркетинг с измеримыми результатами
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Услуги</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>Стратегия</li>
                <li>Performance</li>
                <li>SMM</li>
                <li>Аналитика</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li>О нас</li>
                <li>Кейсы</li>
                <li>Блог</li>
                <li>Контакты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  hello@marketpro.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (495) 123-45-67
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
            © 2024 MarketPro. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
