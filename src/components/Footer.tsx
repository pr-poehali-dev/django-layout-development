import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Школа Казбека Меретукова
            </h3>
            <p className="text-muted-foreground mb-4">
              Профессиональное обучение актерскому и ораторскому мастерству в Москве. 
              Преодолейте страх сцены и камеры, станьте уверенным в себе и харизматичным.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition">
                <Icon name="Youtube" size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition">
                <Icon name="Mail" size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Курсы</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-muted-foreground hover:text-primary transition">
                  Актерское мастерство
                </a>
              </li>
              <li>
                <a href="/oratory" className="text-muted-foreground hover:text-primary transition">
                  Ораторское искусство
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">О школе</h4>
            <ul className="space-y-2">
              <li>
                <a href="/team" className="text-muted-foreground hover:text-primary transition">
                  Команда
                </a>
              </li>
              <li>
                <a href="/reviews" className="text-muted-foreground hover:text-primary transition">
                  Отзывы
                </a>
              </li>
              <li>
                <a href="/blog" className="text-muted-foreground hover:text-primary transition">
                  Блог
                </a>
              </li>
              <li>
                <a href="/contacts" className="text-muted-foreground hover:text-primary transition">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Связаться</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Icon name="MapPin" size={18} className="text-primary" />
                <span>Москва</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Phone" size={18} className="text-primary" />
                <a href="tel:+79991234567" className="hover:text-primary transition">
                  +7 (999) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Mail" size={18} className="text-primary" />
                <a href="mailto:info@school.ru" className="hover:text-primary transition">
                  info@school.ru
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Школа Казбека Меретукова. Все права защищены.
          </p>
          <div className="flex gap-4 text-sm">
            <a href="/admin" className="text-muted-foreground hover:text-primary transition">
              Админка
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}