import { useState } from 'react';
import InputMask from 'react-input-mask';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { api } from '@/lib/api';

interface LeadFormProps {
  source: string;
  title?: string;
  description?: string;
  buttonText?: string;
}

export default function LeadForm({ 
  source, 
  title = "Запись на пробное занятие",
  description = "Оставьте номер телефона, и мы свяжемся с вами",
  buttonText = "Записаться"
}: LeadFormProps) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.leads.create({ phone, source });
      setSubmitted(true);
      setPhone('');
      
      if (typeof window !== 'undefined') {
        const ym = (window as any).ym;
        if (ym) {
          console.log('✅ Отправляем цель в Яндекс.Метрику: trial_lesson');
          ym(104854671, 'reachGoal', 'trial_lesson');
          console.log('✅ Цель trial_lesson отправлена');
        } else {
          console.warn('⚠️ Яндекс.Метрика не загружена (window.ym отсутствует)');
          console.log('Доступные объекты:', Object.keys(window).filter(k => k.includes('ym') || k.includes('ya')));
        }
      }
      
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Произошла ошибка. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
        <Icon name="CheckCircle" className="text-primary mx-auto mb-3" size={48} />
        <h3 className="text-xl font-semibold mb-2">Спасибо!</h3>
        <p className="text-muted-foreground">
          Мы получили вашу заявку и скоро свяжемся с вами
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {title && <h3 className="text-xl md:text-2xl font-bold mb-2">{title}</h3>}
      {description && <p className="text-sm md:text-base text-muted-foreground mb-6">{description}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor={`phone-${source}`}>Номер телефона</Label>
          <InputMask
            mask="+7 (999) 999-99-99"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          >
            {((inputProps: any) => (
              <Input
                {...inputProps}
                id={`phone-${source}`}
                type="tel"
                placeholder="+7 (999) 999-99-99"
                required
                className="mt-1"
              />
            )) as any}
          </InputMask>
        </div>
        
        <Button type="submit" disabled={loading} className="w-full" size="lg">
          {loading ? (
            <>
              <Icon name="Loader" className="animate-spin mr-2" size={18} />
              Отправка...
            </>
          ) : (
            <>
              <Icon name="Phone" className="mr-2" size={18} />
              {buttonText}
            </>
          )}
        </Button>
      </form>
    </div>
  );
}