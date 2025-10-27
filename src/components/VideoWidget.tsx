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
    <div className="fixed bottom-4 left-4 z-50 rounded-2xl overflow-hidden shadow-xl">
      <div 
        className="relative w-40 h-72 cursor-pointer group"
        onClick={handleUnmute}
      >
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setIsMinimized(true);
          }}
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 z-10 h-7 w-7 p-0 bg-black/50 hover:bg-black/70 text-white rounded-full"
        >
          <Icon name="X" size={14} />
        </Button>
        <iframe
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full rounded-2xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        {isMuted && (
          <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/20 transition-colors rounded-2xl">
            <div className="bg-white/90 text-foreground rounded-full p-3 shadow-lg">
              <Icon name="Volume2" size={24} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}