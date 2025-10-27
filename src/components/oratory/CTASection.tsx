import Icon from '@/components/ui/icon';
import PhoneForm from '@/components/PhoneForm';

export default function CTASection() {
  return (
    <section id="contact" className="py-12 px-4 md:py-20 md:px-4">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 max-w-3xl mx-auto text-center">
          <Icon name="Sparkles" size={48} className="mx-auto mb-4 md:mb-6 text-primary md:w-16 md:h-16" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Ваш голос — ваша сила!</h2>
          <p className="text-base md:text-lg lg:text-xl xl:text-2xl mb-3 md:mb-4">
            Начните говорить так, чтобы вас не только слышали, но и <span className="text-primary font-semibold">слушали с восхищением</span>! 
          </p>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-6 md:mb-8">
            Запишитесь на курс ораторского искусства прямо сейчас и откройте в себе силу убедительного слова. 
            Каждое выступление станет вашим триумфом!
          </p>
          <PhoneForm 
            source="cta_oratory"
            course="oratory"
            triggerText="Записаться на курс"
            triggerSize="lg"
            triggerClassName="w-full max-w-md mx-auto"
            title="Готовы развить свои навыки?"
            description="Оставьте номер телефона, и мы свяжемся с вами для записи на курс ораторского искусства"
          />
        </div>
      </div>
    </section>
  );
}