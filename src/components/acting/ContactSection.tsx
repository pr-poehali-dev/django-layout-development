import Icon from '@/components/ui/icon';
import PhoneForm from '@/components/PhoneForm';

export default function ContactSection() {
  return (
    <section id="contacts" className="py-12 px-4 md:py-20 md:px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Контакты</h2>
          <p className="text-center text-muted-foreground text-sm md:text-base">
            Свяжитесь с нами удобным способом
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-xl border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon name="Phone" className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Телефон</h3>
                  <a href="tel:+79283161248" className="text-muted-foreground hover:text-primary transition">
                    +7 (928) 316-12-48
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon name="MapPin" className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Адрес</h3>
                  <p className="text-muted-foreground">
                    Москва
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-6 rounded-xl border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon name="Clock" className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Режим работы</h3>
                  <p className="text-muted-foreground">
                    Ежедневно: 10:00 - 21:00
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
              <h3 className="font-bold mb-4 text-lg">Запишитесь на пробное занятие</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Оставьте заявку, и мы свяжемся с вами для уточнения деталей
              </p>
              <PhoneForm source="contact_section" triggerText="Оставить заявку" triggerClassName="w-full" />
            </div>
          </div>

          <div className="relative h-[400px] lg:h-full min-h-[400px] rounded-xl overflow-hidden">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A4c7f8e0a8f9a8c8d8e8f8e8f8e8f8e8f&amp;source=constructor"
              width="100%"
              height="100%"
              frameBorder="0"
              className="absolute inset-0"
              title="Карта расположения"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
