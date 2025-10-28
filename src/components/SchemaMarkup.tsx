import { Helmet } from 'react-helmet';

interface CourseSchema {
  name: string;
  description: string;
  provider: string;
  url: string;
  price?: string;
  duration?: string;
}

interface ReviewSchema {
  author: string;
  rating: number;
  text: string;
  date?: string;
}

interface SchemaMarkupProps {
  type: 'course' | 'organization' | 'reviews' | 'faq';
  courseData?: CourseSchema;
  reviews?: ReviewSchema[];
  faqItems?: Array<{ question: string; answer: string }>;
}

export default function SchemaMarkup({ type, courseData, reviews, faqItems }: SchemaMarkupProps) {
  const renderCourseSchema = () => {
    if (!courseData) return null;

    const schema = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": courseData.name,
      "description": courseData.description,
      "provider": {
        "@type": "Organization",
        "name": courseData.provider,
        "sameAs": "https://acting-school.poehali.dev"
      },
      "url": courseData.url,
      ...(courseData.price && {
        "offers": {
          "@type": "Offer",
          "price": courseData.price,
          "priceCurrency": "RUB"
        }
      }),
      ...(courseData.duration && {
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "onsite",
          "duration": courseData.duration
        }
      })
    };

    return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
  };

  const renderReviewsSchema = () => {
    if (!reviews || reviews.length === 0) return null;

    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Школа актёрского мастерства Казбека Меретукова",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
        "reviewCount": reviews.length,
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": reviews.slice(0, 10).map(review => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": review.author
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.rating,
          "bestRating": "5"
        },
        "reviewBody": review.text,
        ...(review.date && { "datePublished": review.date })
      }))
    };

    return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
  };

  const renderFAQSchema = () => {
    if (!faqItems || faqItems.length === 0) return null;

    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    return <script type="application/ld+json">{JSON.stringify(schema)}</script>;
  };

  return (
    <Helmet>
      {type === 'course' && renderCourseSchema()}
      {type === 'reviews' && renderReviewsSchema()}
      {type === 'faq' && renderFAQSchema()}
    </Helmet>
  );
}
