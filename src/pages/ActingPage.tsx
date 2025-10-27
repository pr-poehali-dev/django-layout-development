import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/acting/HeroSection';
import VideoSection from '@/components/acting/VideoSection';
import ForWhomSection from '@/components/acting/ForWhomSection';
import LeadFormSection from '@/components/acting/LeadFormSection';
import ModulesSection from '@/components/acting/ModulesSection';
import FilmSection from '@/components/acting/FilmSection';
import AboutSection from '@/components/acting/AboutSection';
import GallerySection from '@/components/acting/GallerySection';
import ReviewsSection from '@/components/acting/ReviewsSection';
import TeamSection from '@/components/acting/TeamSection';
import CallToActionSection from '@/components/acting/CallToActionSection';
import BlogSection from '@/components/acting/BlogSection';
import FAQSection from '@/components/acting/FAQSection';
import { api, CourseModule, Review, FAQ, GalleryImage, BlogPost, SiteContent, TeamMember } from '@/lib/api';

export default function ActingPage() {
  const navigate = useNavigate();
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [faq, setFAQ] = useState<FAQ[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [blog, setBlog] = useState<BlogPost[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [modulesData, reviewsData, faqData, galleryData, blogData, teamData, contentData] = await Promise.all([
        api.modules.getByCourse('acting'),
        api.gallery.getReviews(),
        api.gallery.getFAQ(),
        api.gallery.getImages(),
        api.gallery.getBlog(),
        api.gallery.getTeam(),
        api.content.getAll()
      ]);

      setModules(modulesData);
      setReviews(reviewsData);
      setFAQ(faqData);
      setGallery(galleryData);
      setBlog(blogData);
      setTeam(teamData);

      const contentMap: Record<string, string> = {};
      contentData.forEach((item: SiteContent) => {
        contentMap[item.key] = item.value;
      });
      setContent(contentMap);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection content={content} />
      <VideoSection content={content} />
      <ForWhomSection />
      <LeadFormSection />
      <ModulesSection modules={modules} />
      <FilmSection content={content} />
      <AboutSection content={content} team={team} />
      <GallerySection gallery={gallery} />
      <ReviewsSection reviews={reviews} />
      <TeamSection team={team} />
      <CallToActionSection />
      <BlogSection 
        blog={blog} 
        onNavigate={(slug) => navigate(`/blog/${slug}`)}
        onNavigateToBlog={() => navigate('/blog')}
      />
      <FAQSection faq={faq} />
      <Footer />
    </div>
  );
}