import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

interface SeatsCounterProps {
  trialDate: string;
  maxSeats?: number;
  minSeats?: number;
}

export default function SeatsCounter({ 
  trialDate, 
  maxSeats = 12, 
  minSeats = 2 
}: SeatsCounterProps) {
  const [seatsLeft, setSeatsLeft] = useState(maxSeats);

  useEffect(() => {
    if (!trialDate) return;

    const calculateSeats = () => {
      const now = new Date();
      const trial = new Date(trialDate);
      const totalDays = 30;
      const daysUntilTrial = Math.max(0, Math.ceil((trial.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
      
      if (daysUntilTrial <= 0) {
        return minSeats;
      }

      const progress = Math.max(0, Math.min(1, 1 - (daysUntilTrial / totalDays)));
      const seats = Math.max(
        minSeats,
        Math.round(maxSeats - (progress * (maxSeats - minSeats)))
      );
      
      return seats;
    };

    setSeatsLeft(calculateSeats());

    const interval = setInterval(() => {
      setSeatsLeft(calculateSeats());
    }, 60000);

    return () => clearInterval(interval);
  }, [trialDate, maxSeats, minSeats]);

  const isLowSeats = seatsLeft <= 5;
  const isCritical = seatsLeft <= 3;

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
      isCritical 
        ? 'bg-destructive/20 text-destructive border-2 border-destructive animate-pulse' 
        : isLowSeats 
        ? 'bg-orange-500/20 text-orange-600 dark:text-orange-400 border-2 border-orange-500/50' 
        : 'bg-primary/10 text-primary border-2 border-primary/30'
    }`}>
      <Icon 
        name={isCritical ? "AlertCircle" : "Users"} 
        size={18} 
        className="flex-shrink-0"
      />
      <span>
        {isCritical ? 'Последние' : 'Осталось'} <span className="text-lg font-bold">{seatsLeft}</span> {
          seatsLeft === 1 ? 'место' : seatsLeft < 5 ? 'места' : 'мест'
        }
      </span>
    </div>
  );
}
