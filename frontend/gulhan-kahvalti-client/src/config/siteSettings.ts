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
      'https://www.google.com/maps/place/G%C3%BClhan+Kahvalt%C4%B1+Salonu/@36.5060489,34.197262,17z/data=!4m6!3m5!1s0x14d88ded265a587f:0x39989cd3e39f268b!8m2!3d36.5055284!4d34.196303!16s%2Fg%2F11k866n15h?entry=ttu&g_ep=EgoyMDI2MDUzMS4wIKXMDSoASAFQAw%3D%3D',
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
