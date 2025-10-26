import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const benefits = [
  'Карьерный рост и повышение',
  'Успешные презентации и питчи',
  'Уверенность на собеседованиях',
  'Эффективное управление командой',
  'Публичное признание и авторитет',
  'Нетворкинг и деловые связи'
];

export default function ForWhomSection() {
  return (
    <section className="py-12 px-4 md:py-20 md:px-4 bg-card">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 md:mb-4">Для кого этот курс?</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Курс подходит для всех, кто хочет научиться выступать публично, убедительно общаться и влиять на аудиторию
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Icon name="Briefcase" className="text-primary" size={24} />
              </div>
              <CardTitle>Для карьеры</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Руководители, менеджеры, предприниматели — для тех, кто хочет вдохновлять команду и убеждать партнёров
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Icon name="Presentation" className="text-primary" size={24} />
              </div>
              <CardTitle>Для презентаций</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Специалисты, которые проводят презентации, питчи, защищают проекты или выступают на конференциях
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Icon name="Users" className="text-primary" size={24} />
              </div>
              <CardTitle>Побороть страх</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Для тех, кто боится выступать публично и хочет преодолеть волнение перед аудиторией
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Icon name="Star" className="text-primary" size={24} />
              </div>
              <CardTitle>Развить харизму</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Для всех, кто хочет говорить убедительно, ярко и запоминающееся в любой ситуации
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Почему это важно?</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-background rounded-2xl p-6 md:p-8">
              <Icon name="TrendingUp" className="text-primary mb-4" size={32} />
              <h3 className="text-xl md:text-2xl font-bold mb-4">Карьера и бизнес</h3>
              <ul className="space-y-2 md:space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 md:gap-3">
                    <Icon name="CheckCircle2" className="text-primary flex-shrink-0" size={18} />
                    <span className="text-sm md:text-base">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background rounded-2xl p-6 md:p-8">
              <Icon name="Heart" className="text-primary mb-4" size={32} />
              <h3 className="text-xl md:text-2xl font-bold mb-4">Личностный рост</h3>
              <p className="text-sm md:text-base text-muted-foreground mb-4">
                Развитие ораторских навыков трансформирует не только вашу карьеру, но и личную жизнь:
              </p>
              <ul className="space-y-2 md:space-y-3">
                <li className="flex items-center gap-2 md:gap-3">
                  <Icon name="CheckCircle2" className="text-primary flex-shrink-0" size={18} />
                  <span className="text-sm md:text-base">Преодоление страха публичных выступлений</span>
                </li>
                <li className="flex items-center gap-2 md:gap-3">
                  <Icon name="CheckCircle2" className="text-primary flex-shrink-0" size={18} />
                  <span className="text-sm md:text-base">Развитие уверенности в себе</span>
                </li>
                <li className="flex items-center gap-2 md:gap-3">
                  <Icon name="CheckCircle2" className="text-primary flex-shrink-0" size={18} />
                  <span className="text-sm md:text-base">Улучшение навыков коммуникации</span>
                </li>
                <li className="flex items-center gap-2 md:gap-3">
                  <Icon name="CheckCircle2" className="text-primary flex-shrink-0" size={18} />
                  <span className="text-sm md:text-base">Расширение зоны комфорта</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
