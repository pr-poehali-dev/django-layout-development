import Icon from '@/components/ui/icon';
import LeadForm from '@/components/LeadForm';

export default function LeadFormSection() {
  return (
    <section className="py-12 px-4 md:py-20 md:px-4 bg-gradient-to-br from-primary/5 to-background">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-xl border border-primary/10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Icon name="Phone" className="text-primary" size={32} />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Готовы начать?</h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
              Оставьте заявку, и мы расскажем подробнее о курсе и пригласим на бесплатное пробное занятие
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <LeadForm 
              source="for_whom_acting"
              title="Записаться на курс"
              description="Укажите ваше имя и номер телефона"
              buttonText="Отправить заявку"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
