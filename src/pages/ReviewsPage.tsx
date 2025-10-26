import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PhoneForm from '@/components/PhoneForm';
import { api, Review } from '@/lib/api';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await api.gallery.getReviews();
      setReviews(data);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Icon
        key={index}
        name={index < rating ? 'Star' : 'Star'}
        size={20}
        className={index < rating ? 'text-primary fill-primary' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="pt-32 pb-20 px-6 md:px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Отзывы <span className="text-primary">учеников</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Истории успеха тех, кто прошел наши курсы и изменил свою жизнь
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <Icon name="Loader2" className="animate-spin mx-auto text-primary" size={48} />
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-20">
              <Icon name="MessageSquare" className="mx-auto mb-4 text-muted-foreground" size={64} />
              <p className="text-xl text-muted-foreground mb-8">
                Скоро здесь появятся первые отзывы наших учеников!
              </p>
              <PhoneForm 
                source="reviews_empty"
                triggerText="Стать первым"
                title="Запишитесь первым"
                description="Оставьте номер телефона и станьте одним из первых учеников нашей школы"
              />
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {reviews.map((review) => (
                  <Card key={review.id} className="group hover:shadow-xl transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4 mb-4">
                        {review.photo_url ? (
                          <img 
                            src={review.photo_url} 
                            alt={review.author_name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon name="User" className="text-primary" size={32} />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{review.author_name}</h3>
                          {review.author_role && (
                            <p className="text-sm text-muted-foreground">{review.author_role}</p>
                          )}
                          <div className="flex gap-1 mt-2">
                            {renderStars(review.rating || 5)}
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {review.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-card p-12 rounded-3xl max-w-2xl mx-auto text-center">
                <Icon name="Sparkles" size={48} className="mx-auto mb-4 text-primary" />
                <h2 className="text-3xl font-bold mb-4">Станьте частью истории успеха</h2>
                <p className="text-muted-foreground mb-6">
                  Запишитесь на курс и поделитесь своим опытом
                </p>
                <PhoneForm 
                  source="reviews_cta"
                  triggerText="Записаться на курс"
                  triggerClassName="w-full sm:w-auto"
                />
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
