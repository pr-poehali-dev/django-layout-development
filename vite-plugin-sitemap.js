import { writeFileSync } from 'fs';

const GALLERY_API = 'https://functions.poehali.dev/42a4a1c9-5ce7-4d3d-8760-f3ef702ed550';
const BASE_URL = 'https://acting-school.poehali.dev';

export default function sitemapPlugin() {
    return {
        name: 'generate-sitemap',
        async buildEnd() {
            console.log('📡 Generating sitemap...');
            try {
                const response = await fetch(`${GALLERY_API}?resource=blog`);
                if (!response.ok) throw new Error(`API returned ${response.status}`);
                
                const posts = await response.json();
                const today = new Date().toISOString().split('T')[0];
                
                const staticPages = [
                    { loc: `${BASE_URL}/`, priority: '1.0', changefreq: 'weekly', lastmod: '2025-10-27' },
                    { loc: `${BASE_URL}/oratory`, priority: '0.9', changefreq: 'weekly', lastmod: '2025-10-27' },
                    { loc: `${BASE_URL}/team`, priority: '0.7', changefreq: 'monthly', lastmod: '2025-10-27' },
                    { loc: `${BASE_URL}/reviews`, priority: '0.8', changefreq: 'weekly', lastmod: '2025-10-27' },
                    { loc: `${BASE_URL}/blog`, priority: '0.8', changefreq: 'daily', lastmod: today },
                    { loc: `${BASE_URL}/contacts`, priority: '0.6', changefreq: 'monthly', lastmod: today },
                ];
                
                let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;
                
                for (const page of staticPages) {
                    xml += `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
                }
                
                for (const post of posts) {
                    if (!post.slug) continue;
                    
                    const lastmod = post.updated_at || post.created_at || today;
                    const formattedDate = lastmod.split('T')[0];
                    const encodedSlug = encodeURIComponent(post.slug);
                    
                    xml += `  <url>
    <loc>${BASE_URL}/blog/${encodedSlug}</loc>
    <lastmod>${formattedDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>`;
                    
                    if (post.image_url) {
                        const escapedTitle = (post.title || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
                        const escapedCaption = (post.excerpt || post.content?.substring(0, 100) || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
                        xml += `
    <image:image>
      <image:loc>${post.image_url}</image:loc>
      <image:title>${escapedTitle}</image:title>
      <image:caption>${escapedCaption}</image:caption>
    </image:image>`;
                    }
                    
                    xml += `
  </url>
`;
                }
                
                xml += `</urlset>`;
                
                writeFileSync('public/sitemap.xml', xml, 'utf-8');
                console.log(`✅ Sitemap: ${staticPages.length} pages + ${posts.length} blog posts`);
            } catch (error) {
                console.error('❌ Sitemap error:', error.message);
            }
        }
    };
}
