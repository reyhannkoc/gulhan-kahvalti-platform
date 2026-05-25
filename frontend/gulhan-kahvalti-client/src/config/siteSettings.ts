// TODO: Replace this frontend config with Admin Panel/API-managed site settings
// when the backend site_settings infrastructure is implemented.
export const siteSettings = {
  businessName: 'Gülhan Kahvaltı',
  logo: {
    imageUrl: null as string | null,
    alt: 'Gülhan Kahvaltı',
  },
  contact: {
    address: 'Lamos Otel Yanı, Ayaş, Atatürk Cd. No:87A, 33750 Erdemli/Mersin',
    phoneDisplay: '0539 290 39 09',
    phoneHref: 'https://wa.me/905392903909',
    email: 'fgulhanergin@gmail.com',
    emailHref: 'mailto:fgulhanergin@gmail.com',
  },
  social: {
    facebook: 'https://www.facebook.com/share/1MDpJ1LRdt/?mibextid=wwXIfr',
    instagram: 'https://www.instagram.com/gulhankahvalti/',
  },
  footer: {
    followText:
      'Gülhan Kahvaltı duyuruları, günlük lezzetleri ve sıcak paylaşımları için bizi takip edin.',
  },
} as const
