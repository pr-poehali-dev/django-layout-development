interface VideoSectionProps {
  content: Record<string, string>;
}

export default function VideoSection({ content }: VideoSectionProps) {
  return (
    <section className="py-6 px-0 md:py-16 md:px-4 bg-card">
      <div className="container mx-auto md:px-4">
        <div className="aspect-video w-full md:max-w-4xl md:mx-auto md:rounded-xl overflow-hidden shadow-2xl">
          <iframe
            src={content.hero_video_url || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}
