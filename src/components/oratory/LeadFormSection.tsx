import Icon from '@/components/ui/icon';
import PhoneForm from '@/components/PhoneForm';
import { Button } from '@/components/ui/button';

export default function LeadFormSection() {
  return (
    <section className="py-12 px-4 md:py-20 md:px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="bg-gradient-to-br from-card/95 via-card/90 to-card/95 backdrop-blur-xl rounded-3xl p-8 md:p-16 border border-primary/20 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Icon name="Sparkles" className="text-primary" size={32} />
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Готовы развить свои <span className="text-primary">навыки?</span>
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Запишитесь на пробное занятие и узнайте больше о программе курса
            </p>
            
            <PhoneForm 
              source="lead_form_oratory"
              course="oratory"
              triggerText="Записаться на пробное занятие"
              triggerSize="lg"
              triggerClassName="w-full max-w-md mx-auto text-lg py-6"
            />
            
            <p className="text-sm text-muted-foreground mt-6 flex items-center justify-center gap-2">
              <Icon name="Shield" size={16} />
              Ваши данные в безопасности
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}