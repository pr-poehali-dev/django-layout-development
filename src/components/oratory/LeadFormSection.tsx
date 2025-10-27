import Icon from '@/components/ui/icon';
import PhoneForm from '@/components/PhoneForm';
import { Button } from '@/components/ui/button';

export default function LeadFormSection() {
  return (
    <section className="py-12 px-4 md:py-20 md:px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background"></div>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-2xl relative z-10">
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border border-primary/20 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Готовы развить свои <span className="text-primary">навыки?</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-6">
            Запишитесь на пробное занятие и узнайте больше о программе курса
          </p>
          <PhoneForm 
            source="lead_form_oratory"
            course="oratory"
            triggerText="Записаться на пробное занятие"
            triggerSize="lg"
            triggerClassName="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
}