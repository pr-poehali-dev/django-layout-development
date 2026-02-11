import { useEffect } from 'react';

export default function SitemapPage() {
  useEffect(() => {
    // Redirect to backend sitemap function
    window.location.href = 'https://functions.poehali.dev/f79990ef-62a3-4eb2-a904-1da4dc946923';
  }, []);

  return null;
}
