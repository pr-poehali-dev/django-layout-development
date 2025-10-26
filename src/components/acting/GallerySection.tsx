import Icon from '@/components/ui/icon';
import { GalleryImage } from '@/lib/api';

interface GallerySectionProps {
  gallery: GalleryImage[];
}

export default function GallerySection({ gallery }: GallerySectionProps) {
  return (
    <section className="py-12 px-4 md:py-20 md:px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Галерея</h2>
        {gallery.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {gallery.map((image) => (
              <div key={image.id} className="aspect-square rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src={image.url}
                  alt={image.caption || ''}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-12">
            <Icon name="Image" size={64} className="mx-auto mb-4 opacity-30" />
            <p>Галерея скоро появится</p>
          </div>
        )}
      </div>
    </section>
  );
}
