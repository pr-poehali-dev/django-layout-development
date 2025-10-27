import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function VideoWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          size="lg"
          className="rounded-full w-16 h-16 shadow-2xl hover:scale-110 transition-transform"
        >
          <Icon name="Play" size={28} />
        </Button>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-background border-2 border-primary rounded-full px-4 py-3 shadow-2xl animate-pulse">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg"
        >
          <Icon name="Play" size={24} />
        </Button>
        <span className="font-semibold text-sm pr-2">Смотреть видео</span>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 bg-background rounded-2xl shadow-2xl border-2 border-primary overflow-hidden">
      <div className="flex items-center justify-between bg-primary text-primary-foreground px-4 py-2">
        <span className="font-semibold text-sm">Видео о нас</span>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsMinimized(true)}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-primary-foreground/20"
          >
            <Icon name="Minimize2" size={16} />
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-primary-foreground/20"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>
      <div className="relative w-80 h-44">
        <iframe
          src={videoUrl}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
