import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dan Siam Amulets',
    short_name: 'Dan Siam',
    description: 'Authentic Thai amulets from sacred temples',
    start_url: '/',
    display: 'standalone',
    background_color: '#F7F0E3',
    theme_color: '#1A1208',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
