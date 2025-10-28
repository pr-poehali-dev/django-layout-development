import { useEffect } from 'react';

const SITEMAP_URL = 'https://functions.poehali.dev/61658db6-95ff-425a-9741-d83782aae247?sitemap=true';

export default function SitemapPage() {
  useEffect(() => {
    window.location.replace(SITEMAP_URL);
  }, []);

  return null;
}