// TODO: Replace this frontend config with Admin Panel/API-managed site settings
// when the backend site_settings infrastructure is implemented.
export const siteSettings = {
  businessName: 'Gülhan Kahvaltı',
  slogan: 'Güne Lezzetle Başla',
  description:
    'Deniz kokusu, ev yapımı lezzetler ve sıcak kahvaltı sofralarıyla Ayaş’ta güne güzel bir başlangıç.',
  logo: {
    imageUrl: null as string | null,
    alt: 'Gülhan Kahvaltı',
  },
  contact: {
    address: 'Lamos Otel Yanı, Ayaş, Atatürk Cd. No:87A, 33750 Erdemli/Mersin',
    phoneDisplay: '0539 290 39 09',
    phoneHref: 'https://wa.me/905392903909',
    email: 'fgulhanergin@gmail.com',
    emailHref: 'mailto:fgulhanergin@gmail.com?subject=Gülhan%20Kahvaltı%20İletişim',
    mapsHref:
      'https://www.google.com/maps/search/?api=1&query=Lamos%20Otel%20Yan%C4%B1%2C%20Aya%C5%9F%2C%20Atat%C3%BCrk%20Cd.%20No%3A87A%2C%2033750%20Erdemli%2FMersin',
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
