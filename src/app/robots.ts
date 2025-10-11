import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/auth/',
          '/account/',
          '/login',
          '/register'
        ],
      },
    ],
    sitemap: 'https://calcfort.com/sitemap.xml',
  };
}