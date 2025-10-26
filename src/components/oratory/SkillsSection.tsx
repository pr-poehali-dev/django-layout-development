import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import PhoneForm from '@/components/PhoneForm';

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

export default function SkillsSection() {
  return (
    <section id="skills" className="py-12 px-4 md:py-20 md:px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 md:mb-4">Чему вы научитесь</h2>
        <p className="text-center text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-base">
          Комплексная программа развития навыков публичных выступлений
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {oratorySkills.map((skill, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3 md:mb-4 group-hover:bg-primary/20 transition">
                  <Icon name={skill.icon as any} className="text-primary" size={24} />
                </div>
                <CardTitle className="text-lg md:text-xl">{skill.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm md:text-base">{skill.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-block bg-card/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold mb-3">Готовы развить свои навыки?</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm md:text-base">
              Запишитесь на пробное занятие и узнайте больше о программе курса
            </p>
            <PhoneForm 
              source="skills_oratory"
              course="oratory"
              triggerText="Записаться на пробное занятие"
              triggerSize="lg"
              title="Запись на пробное занятие"
              description="Оставьте номер телефона, и мы пригласим вас на пробное занятие"
            />
          </div>
        </div>
      </div>
    </section>
  );
}