import Icon from '@/components/ui/icon';
import PhoneForm from '@/components/PhoneForm';
import { Button } from '@/components/ui/button';

export default function LeadFormSection() {
  return (
    <section className="py-12 px-4 md:py-20 md:px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-gradient-to-br from-[#2a2416] to-[#1a1410] rounded-2xl md:rounded-3xl p-8 md:p-12 border border-primary/30 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Готовы развить свои <span className="text-primary">навыки?</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-8">
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