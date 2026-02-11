import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function SitemapPage() {
  const [, setSitemap] = useState('');

  useEffect(() => {
    const generateSitemap = async () => {
      const baseUrl = 'https://xn----7sbdfnbalzedv3az5aq.xn--p1ai';
      const today = new Date().toISOString().split('T')[0];

      const staticPages = [
        { loc: '/', priority: '1.0', changefreq: 'weekly' },
        { loc: '/acting', priority: '0.9', changefreq: 'weekly' },
        { loc: '/oratory', priority: '0.9', changefreq: 'weekly' },
        { loc: '/acting-cards', priority: '0.9', changefreq: 'weekly' },
        { loc: '/teacher', priority: '0.8', changefreq: 'monthly' },
        { loc: '/team', priority: '0.7', changefreq: 'monthly' },
        { loc: '/reviews', priority: '0.7', changefreq: 'weekly' },
        { loc: '/blog', priority: '0.8', changefreq: 'weekly' },
        { loc: '/contacts', priority: '0.6', changefreq: 'monthly' },
        { loc: '/showreel', priority: '0.7', changefreq: 'monthly' },
      ];

      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

      staticPages.forEach(page => {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}${page.loc}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `    <priority>${page.priority}</priority>\n`;
        xml += '  </url>\n';
      });

      try {
        const blogPosts = await api.gallery.getBlog();
        blogPosts.forEach(post => {
          if (post.slug) {
            xml += '  <url>\n';
            xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
            xml += `    <lastmod>${today}</lastmod>\n`;
            xml += `    <changefreq>monthly</changefreq>\n`;
            xml += `    <priority>0.7</priority>\n`;
            xml += '  </url>\n';
          }
        });
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }

      xml += '</urlset>';

      setSitemap(xml);

      const blob = new Blob([xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      window.location.href = url;
    };

    generateSitemap();
  }, []);

  return (
    <div style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', padding: '20px' }}>
      Generating sitemap...
    </div>
  );
}
