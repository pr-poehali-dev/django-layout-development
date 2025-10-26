import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import PhoneForm from './PhoneForm';
import { useLocation } from 'react-router-dom';
import { api } from '@/lib/api';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState('+7 (999) 123-45-67');
  const location = useLocation();

  useEffect(() => {
    api.content.getAll().then((data) => {
      const phoneContent = data.find((item) => item.key === 'phone');
      if (phoneContent) setPhone(phoneContent.value);
    }).catch(() => {});
  }, []);

  const menuItems = [
    { href: '/', label: 'Актерское мастерство' },
    { href: '/oratory', label: 'Ораторское искусство' },
    { href: '/team', label: 'Команда' },
    { href: '/reviews', label: 'Отзывы' },
    { href: '/blog', label: 'Блог' },
    { href: '/contacts', label: 'Контакты' }
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between">
        <a href="/" className="flex items-center hover:opacity-80 transition">
          <img 
            src="https://i.1.creatium.io/disk2/c6/65/76/a52e2f86d1891f143cdb23e60a4460b61f/184x67/w_logo_text.svg" 
            alt="Школа Казбека Меретукова" 
            className="h-8 sm:h-10 md:h-12"
          />
        </a>

        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm lg:text-base hover:text-primary transition ${
                location.pathname === item.href ? 'text-primary font-semibold' : ''
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a 
            href={`tel:${phone.replace(/\D/g, '')}`} 
            className="hidden lg:flex items-center gap-2 text-sm font-medium hover:text-primary transition"
          >
            <Icon name="Phone" size={16} />
            <span className="text-xs lg:text-sm">{phone}</span>
          </a>
          <PhoneForm 
            source="header" 
            triggerText="Записаться"
            triggerClassName="hidden sm:flex text-sm"
          />
          
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Icon name="Menu" size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`text-lg hover:text-primary transition p-3 rounded-lg hover:bg-muted ${
                      location.pathname === item.href ? 'text-primary font-semibold bg-muted' : ''
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="mt-4 pt-4 border-t border-border">
                  <PhoneForm 
                    source="mobile_menu" 
                    triggerText="Записаться на курс"
                    triggerClassName="w-full"
                  />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}