import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/oratory/HeroSection';
import SkillsSection from '@/components/oratory/SkillsSection';
import ForWhomSection from '@/components/oratory/ForWhomSection';
import AboutSection from '@/components/oratory/AboutSection';
import ProgramSection from '@/components/oratory/ProgramSection';
import GallerySection from '@/components/oratory/GallerySection';
import ReviewsSection from '@/components/oratory/ReviewsSection';
import BlogSection from '@/components/oratory/BlogSection';
import LeadFormSection from '@/components/oratory/LeadFormSection';
import CTASection from '@/components/oratory/CTASection';
import { api, SiteContent, Review, GalleryImage, BlogPost } from '@/lib/api';

export default function OratoryPage() {
  const navigate = useNavigate();
  const [content, setContent] = useState<Record<string, string>>({});
  const [reviews, setReviews] = useState<Review[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [blog, setBlog] = useState<BlogPost[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [contentData, reviewsData, galleryData, blogData] = await Promise.all([
        api.content.getAll(),
        api.gallery.getReviews(),
        api.gallery.getImages(),
        api.gallery.getBlog()
      ]);
      
      const contentMap: Record<string, string> = {};
      contentData.forEach((item: SiteContent) => {
        contentMap[item.key] = item.value;
      });
      setContent(contentMap);
      setReviews(reviewsData);
      setGallery(galleryData);
      setBlog(blogData);
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <SkillsSection />
      <ForWhomSection />
      <AboutSection content={content} />
      <ProgramSection />
      <GallerySection gallery={gallery} />
      <ReviewsSection reviews={reviews} />
      <BlogSection 
        blog={blog} 
        onNavigate={(slug) => navigate(`/blog/${slug}`)}
        onNavigateToBlog={() => navigate('/blog')}
      />
      <LeadFormSection />
      <CTASection />
      <Footer />
    </div>
  );
}
