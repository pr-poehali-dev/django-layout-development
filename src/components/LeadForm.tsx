import { useState } from 'react';
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
      <h3 className="text-xl md:text-2xl font-bold mb-2">{title}</h3>
      <p className="text-sm md:text-base text-muted-foreground mb-6">{description}</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor={`phone-${source}`}>Номер телефона</Label>
          <Input
            id={`phone-${source}`}
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (999) 123-45-67"
            required
            className="mt-1"
          />
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
