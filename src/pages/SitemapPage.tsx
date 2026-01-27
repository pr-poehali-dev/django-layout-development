import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function SitemapPage() {
  const [xml, setXml] = useState<string>('');

  useEffect(() => {
    generateSitemap();
  }, []);

  const generateSitemap = async () => {
    try {
      const blogPosts = await api.gallery.getBlog();
      
      const baseUrl = 'https://acting-school.poehali.dev';
      const now = new Date().toISOString().split('T')[0];
      
      const staticPages = [
        { url: '/', priority: '1.0', changefreq: 'weekly' },
        { url: '/acting', priority: '0.9', changefreq: 'weekly' },
        { url: '/oratory', priority: '0.9', changefreq: 'weekly' },
        { url: '/showreel', priority: '0.7', changefreq: 'monthly' },
        { url: '/team', priority: '0.7', changefreq: 'monthly' },
        { url: '/reviews', priority: '0.8', changefreq: 'weekly' },
        { url: '/blog', priority: '0.8', changefreq: 'daily' },
        { url: '/contacts', priority: '0.9', changefreq: 'monthly' }
      ];

      const blogUrls = blogPosts.map(post => ({
        url: `/blog/${post.slug}`,
        priority: '0.6',
        changefreq: 'monthly',
        lastmod: post.published_at || now
      }));

      const allUrls = [...staticPages, ...blogUrls];

      const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

      setXml(sitemapXml);
      
      const blob = new Blob([sitemapXml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      window.location.href = url;
    } catch (error) {
      console.error('Sitemap generation failed:', error);
    }
  };

  if (!xml) {
    return <div>Generating sitemap...</div>;
  }

  return (
    <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '12px' }}>
      {xml}
    </pre>
  );
}