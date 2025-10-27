import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const programModules = [
  {
    number: 1,
    title: 'Система Станиславского для оратора',
    description: 'Введение в теорию. Знакомство с актёрскими техниками подготовки публичного выступления',
    topics: [
      'Самопрезентация',
      'Творческие пробы и обратная связь от педагога по ораторскому искусству'
    ],
    result: 'Ты освоил техники и приемы по системе Станиславского, легко применяешь их на практике и чувствуешь себя увереннее'
  },
  {
    number: 2,
    title: 'Логика и структура речи',
    description: 'Основы драматургии. Композиция и структура публичного выступления',
    topics: [
      'Приёмы привлечения и удержания внимания аудитории',
      'Просмотр и разбор известных речей'
    ],
    result: 'Ты научился строить композицию и структуру публичного выступления'
  },
  {
    number: 3,
    title: 'Искусство монолога',
    description: 'Занятия-практикумы. Выступление ученика с подготовленной речью на свободную тему',
    topics: [
      'Работа с объектами внимания',
      'Видеозапись, подробный разбор от педагога ораторского мастерства'
    ],
    result: 'Ты научился структурировать свои мысли и выражать их более четко и уверенно'
  },
  {
    number: 4,
    title: 'Техника речи',
    description: 'Упражнения на подготовку голосового аппарата',
    topics: [
      'Постановка дыхания, совершенствование дикции и тембра',
      'Устранение речевых недостатков'
    ],
    result: 'Ты усовершенствовал дикцию, тембр голоса и свою речь, что сделало твоё выступление четким и приятным для слушателей'
  },
  {
    number: 5,
    title: 'Психологическая свобода',
    description: 'Творческое раскрепощение',
    topics: [
      'Реакции на стресс: блоки, мышечные зажимы и способы их преодоления',
      'Сценическое самочувствие'
    ],
    result: 'Ты повысил осознанность своих эмоций и поведения, научился контролировать свою психологическую свободу'
  },
  {
    number: 6,
    title: 'Речевая импровизация и дебаты',
    description: 'Финальный модуль курса',
    topics: [],
    result: 'Ты готов для публичных выступлений, представляешь себя наилучшим образом перед аудиторией, производишь хорошее впечатление и запоминаешься слушателям'
  }
];

export default function ProgramSection() {
  return (
    <section id="program" className="py-12 px-4 md:py-20 md:px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 md:mb-4">Программа курса</h2>
        <p className="text-center text-muted-foreground mb-8 md:mb-12 text-sm md:text-base">6 модулей от основ до мастерства публичных выступлений</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {programModules.map((module) => (
            <Card key={module.number} className="group hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-6xl font-bold text-primary/30">{module.number}</span>
                </div>
                <CardTitle className="text-lg md:text-xl">{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-sm md:text-base">{module.description}</CardDescription>
                {module.topics.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {module.topics.map((topic, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs md:text-sm">
                        <Icon name="Dot" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-start gap-2 text-xs md:text-sm text-primary bg-primary/5 p-3 rounded-lg mt-4">
                  <Icon name="Target" size={16} className="flex-shrink-0 mt-0.5" />
                  <span className="font-medium">{module.result}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
