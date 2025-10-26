import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Review } from '@/lib/api';

interface ReviewsSectionProps {
  reviews: Review[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <section className="py-12 px-4 md:py-20 md:px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Отзывы наших учеников</h2>
        {reviews.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex items-center gap-3 md:gap-4 mb-4">
                    {review.image_url && (
                      <img src={review.image_url} alt={review.name} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover" />
                    )}
                    <div>
                      <CardTitle className="text-base md:text-lg">{review.name}</CardTitle>
                      <div className="flex gap-0.5 md:gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Icon key={i} name="Star" size={14} className="text-primary fill-primary" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base text-muted-foreground">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-12">
            <Icon name="MessageSquare" size={64} className="mx-auto mb-4 opacity-30" />
            <p>Отзывы скоро появятся</p>
          </div>
        )}
      </div>
    </section>
  );
}
