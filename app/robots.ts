import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/cart', '/checkout', '/orders'],
    },
    sitemap: 'https://dansiamamulet.vercel.app/sitemap.xml',
  };
}
