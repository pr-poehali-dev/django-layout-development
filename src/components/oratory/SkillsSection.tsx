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
    <section id="skills" className="py-12 px-4 md:py-20 md:px-4 bg-gradient-to-b from-background to-card/30 -mt-24 md:-mt-32 pt-24 md:pt-32">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-semibold mb-4 text-sm border border-primary/20">
            <Icon name="Target" size={16} />
            Программа обучения
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
            Чему вы <span className="text-primary">научитесь</span>
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Комплексная программа развития навыков публичных выступлений
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {oratorySkills.map((skill, index) => (
            <div 
              key={index} 
              className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-primary/10 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <Icon name={skill.icon as any} className="text-primary group-hover:text-primary-foreground transition-colors" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{skill.title}</h3>
              <p className="text-muted-foreground">{skill.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 md:p-10 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Готовы развить свои <span className="text-primary">навыки?</span>
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto text-base md:text-lg">
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