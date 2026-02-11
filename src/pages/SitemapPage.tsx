import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Helmet } from 'react-helmet';

export default function SitemapPage() {
  const [xml, setXml] = useState('');

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

      let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xmlContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

      staticPages.forEach(page => {
        xmlContent += '  <url>\n';
        xmlContent += `    <loc>${baseUrl}${page.loc}</loc>\n`;
        xmlContent += `    <lastmod>${today}</lastmod>\n`;
        xmlContent += `    <changefreq>${page.changefreq}</changefreq>\n`;
        xmlContent += `    <priority>${page.priority}</priority>\n`;
        xmlContent += '  </url>\n';
      });

      try {
        const blogPosts = await api.gallery.getBlog();
        blogPosts.forEach(post => {
          if (post.slug) {
            xmlContent += '  <url>\n';
            xmlContent += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
            xmlContent += `    <lastmod>${today}</lastmod>\n`;
            xmlContent += `    <changefreq>monthly</changefreq>\n`;
            xmlContent += `    <priority>0.7</priority>\n`;
            xmlContent += '  </url>\n';
          }
        });
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }

      xmlContent += '</urlset>';
      setXml(xmlContent);
    };

    generateSitemap();
  }, []);

  if (!xml) {
    return null;
  }

  return (
    <>
      <Helmet>
        <meta httpEquiv="Content-Type" content="application/xml; charset=utf-8" />
      </Helmet>
      <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '12px', whiteSpace: 'pre-wrap' }}>
        {xml}
      </pre>
    </>
  );
}