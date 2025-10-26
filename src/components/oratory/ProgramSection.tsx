import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const programModules = [
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
];

export default function ProgramSection() {
  return (
    <section id="program" className="py-12 px-4 md:py-20 md:px-4 bg-card">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Программа курса</h2>
        <div className="space-y-4 md:space-y-6">
          {programModules.map((module, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="bg-primary/5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs md:text-sm text-primary font-semibold mb-1">{module.week}</div>
                    <CardTitle className="text-base md:text-lg lg:text-xl">{module.title}</CardTitle>
                  </div>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl md:text-2xl font-bold text-primary">{index + 1}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 md:pt-6">
                <div className="grid sm:grid-cols-2 gap-2 md:gap-3">
                  {module.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center gap-1.5 md:gap-2">
                      <Icon name="Dot" className="text-primary flex-shrink-0" size={20} />
                      <span className="text-xs md:text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
