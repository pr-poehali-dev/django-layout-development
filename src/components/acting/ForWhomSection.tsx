import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const audiences = [
  {
    icon: 'UserPlus',
    title: 'Новички без опыта',
    description: 'Всегда мечтали об актёрстве, но не знали с чего начать? Мы научим вас всему с нуля',
    emoji: '🎭'
  },
  {
    icon: 'Film',
    title: 'Будущие звёзды кино',
    description: 'Хотите сниматься в кино и на ТВ? Получите профессиональную базу для старта карьеры',
    emoji: '⭐'
  },
  {
    icon: 'TrendingUp',
    title: 'Для личного развития',
    description: 'Развитие уверенности, харизмы и умения выражать эмоции — полезно в любой сфере жизни',
    emoji: '💪'
  },
  {
    icon: 'Users',
    title: 'Публичные выступления',
    description: 'Много общаетесь с людьми или выступаете? Актёрские техники сделают вас убедительнее',
    emoji: '🎤'
  }
];

export default function ForWhomSection() {
  return (
    <section className="py-12 px-4 md:py-20 md:px-4 bg-card/30">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 md:mb-4">
          Кому подойдёт <span className="text-primary">этот курс?</span>
        </h2>
        <p className="text-center text-base md:text-lg text-muted-foreground mb-12 md:mb-16 max-w-3xl mx-auto">
          Неважно, хотите ли вы стать профессиональным актёром или просто развить уверенность — мы поможем достичь вашей цели
        </p>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {audiences.map((audience, index) => (
            <Card key={index} className="hover:shadow-xl transition-all border-primary/20 hover:border-primary/40 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={audience.icon} className="text-primary" size={28} />
                  </div>
                  <span className="text-4xl">{audience.emoji}</span>
                </div>
                <CardTitle className="text-xl md:text-2xl">{audience.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base md:text-lg leading-relaxed">
                  {audience.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-base md:text-lg text-muted-foreground mb-2">
            Узнали себя хотя бы в одном пункте?
          </p>
          <p className="text-xl md:text-2xl font-bold text-primary">
            Тогда этот курс точно для вас! 🎬
          </p>
        </div>
      </div>
    </section>
  );
}