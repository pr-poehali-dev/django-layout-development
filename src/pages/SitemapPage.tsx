import { useEffect } from 'react';

const SITEMAP_URL = 'https://functions.poehali.dev/61658db6-95ff-425a-9741-d83782aae247?sitemap=true';

export default function SitemapPage() {
  useEffect(() => {
    const fetchAndReplaceSitemap = async () => {
      try {
        const response = await fetch(SITEMAP_URL);
        const xmlText = await response.text();
        
        document.open();
        document.write(xmlText);
        document.close();
      } catch (error) {
        console.error('Error loading sitemap:', error);
        document.open();
        document.write('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://acting-school.poehali.dev/</loc></url></urlset>');
        document.close();
      }
    };
    
    fetchAndReplaceSitemap();
  }, []);

  return null;
}