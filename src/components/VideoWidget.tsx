import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function VideoWidget() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ&controls=0&modestbranding=1";

  const handleUnmute = () => {
    if (isMuted && videoRef.current) {
      const newUrl = videoUrl.replace('mute=1', 'mute=0');
      videoRef.current.src = newUrl;
      setIsMuted(false);
    }
  };

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

  return (
    <div className="fixed bottom-6 left-6 z-50 bg-background rounded-3xl shadow-2xl border-2 border-primary overflow-hidden">
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
        </div>
      </div>
      <div 
        className="relative w-64 h-[28rem] cursor-pointer group"
        onClick={handleUnmute}
      >
        <iframe
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {isMuted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
            <div className="bg-primary text-primary-foreground rounded-full p-4 shadow-lg">
              <Icon name="Volume2" size={32} />
            </div>
            <div className="absolute bottom-8 left-0 right-0 text-center text-white font-semibold text-sm bg-black/50 py-2">
              Нажмите для включения звука
            </div>
          </div>
        )}
      </div>
    </div>
  );
}