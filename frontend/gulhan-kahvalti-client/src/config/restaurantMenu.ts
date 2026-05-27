// TODO: Replace this static restaurant menu with Admin Panel/API-managed content
// when editable public menu settings are added to the backend.
export const restaurantMenu = [
  {
    category: 'Kahvaltılar',
    description: 'Güne zengin ve taze bir başlangıç için hazırlanan tabaklar.',
    items: [
      { name: 'Serpme Kahvaltı', description: 'Peynir çeşitleri, zeytin, reçel, bal, kaymak, yumurta ve sıcak lezzetler.', price: '₺450' },
      { name: 'Köy Kahvaltısı', description: 'Yöresel ürünlerle hazırlanan doyurucu kahvaltı seçeneği.', price: '₺360' },
      { name: 'Menemen', description: 'Domates, biber ve yumurta ile günlük hazırlanır.', price: '₺160' },
      { name: 'Sucuklu Yumurta', description: 'Tavada sıcak servis edilir.', price: '₺190' },
    ],
  },
  {
    category: 'Sıcak İçecekler',
    description: 'Kahvaltıya eşlik eden klasik sıcak içecekler.',
    items: [
      { name: 'Çay', description: 'Taze demlenmiş bardak çay.', price: '₺25' },
      { name: 'Türk Kahvesi', description: 'Geleneksel sunumla servis edilir.', price: '₺70' },
      { name: 'Filtre Kahve', description: 'Sade ve dengeli içim.', price: '₺90' },
    ],
  },
  {
    category: 'Soğuk İçecekler',
    description: 'Serin ve ferah seçenekler.',
    items: [
      { name: 'Limonata', description: 'Ev yapımı ferah limonata.', price: '₺85' },
      { name: 'Ayran', description: 'Soğuk servis edilir.', price: '₺45' },
      { name: 'Meşrubat', description: 'Çeşitli soğuk içecekler.', price: '₺60' },
    ],
  },
  {
    category: 'Ekstralar',
    description: 'Kahvaltınızı tamamlayacak ek lezzetler.',
    items: [
      { name: 'Pişi', description: 'Sıcak ve taze servis edilir.', price: '₺95' },
      { name: 'Sigara Böreği', description: 'Çıtır sıcak ara lezzet.', price: '₺110' },
      { name: 'Patates Kızartması', description: 'Paylaşmalık sıcak servis.', price: '₺120' },
    ],
  },
] as const
