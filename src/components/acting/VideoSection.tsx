interface VideoSectionProps {
  content: Record<string, string>;
}

export default function VideoSection({ content }: VideoSectionProps) {
  return (
    <section className="py-6 px-0 md:py-16 md:px-4 bg-card">
      <div className="container mx-auto md:px-4">
        <div className="aspect-video w-full md:max-w-4xl md:mx-auto md:rounded-xl overflow-hidden shadow-2xl">
          <iframe
            src="https://player.vimeo.com/video/997327815?h=da8107aa0b"
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            allowFullScreen
            title="Видео о курсе"
          ></iframe>
        </div>
      </div>
    </section>
  );
}