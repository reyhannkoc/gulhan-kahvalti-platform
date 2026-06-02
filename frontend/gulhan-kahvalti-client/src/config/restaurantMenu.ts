// TODO: Replace this static restaurant menu with Admin Panel/API-managed content
// when editable public menu settings are added to the backend.
export const restaurantMenu = [
  {
    category: 'Kahvaltılar',
    description: 'Güne taze, doyurucu ve sıcak bir başlangıç.',
    items: [
      { name: 'Serpme Kahvaltı', description: 'Peynir çeşitleri, zeytin, reçel, bal, kaymak, yumurta ve sıcak lezzetler.', price: '₺450' },
      { name: 'Köy Kahvaltısı', description: 'Yöresel ürünlerle hazırlanan doyurucu kahvaltı seçeneği.', price: '₺360' },
      { name: 'Kahvaltı Tabağı', description: 'Pratik ve lezzetli tek kişilik kahvaltı tabağı.', price: '₺280' },
    ],
  },
  {
    category: 'Sıkmalar',
    description: 'Sıcak, taze ve elde hazırlanan yöresel lezzetler.',
    items: [
      { name: 'Peynirli Sıkma', description: 'Sıcak servis edilir.', price: '₺120' },
      { name: 'Patatesli Sıkma', description: 'Ev usulü patates harcıyla hazırlanır.', price: '₺120' },
      { name: 'Karışık Sıkma', description: 'Doyurucu karışık iç harç.', price: '₺140' },
    ],
  },
  {
    category: 'Ekstralar',
    description: 'Kahvaltınızı tamamlayan sıcak ve paylaşmalık seçenekler.',
    items: [
      { name: 'Pişi', description: 'Sıcak ve taze servis edilir.', price: '₺95' },
      { name: 'Sigara Böreği', description: 'Çıtır sıcak ara lezzet.', price: '₺110' },
      { name: 'Patates Kızartması', description: 'Paylaşmalık sıcak servis.', price: '₺120' },
    ],
  },
  {
    category: 'Yumurta Çeşitleri',
    description: 'Kahvaltı sofralarının klasik sıcakları.',
    items: [
      { name: 'Menemen', description: 'Domates, biber ve yumurta ile günlük hazırlanır.', price: '₺160' },
      { name: 'Sucuklu Yumurta', description: 'Tavada sıcak servis edilir.', price: '₺190' },
      { name: 'Sahanda Yumurta', description: 'Sade ve sıcak servis.', price: '₺130' },
    ],
  },
  {
    category: 'Gözlemeler',
    description: 'Geleneksel, sıcak ve doyurucu seçenekler.',
    items: [
      { name: 'Peynirli Gözleme', description: 'Sıcak servis edilir.', price: '₺150' },
      { name: 'Patatesli Gözleme', description: 'Ev usulü harçla hazırlanır.', price: '₺150' },
      { name: 'Karışık Gözleme', description: 'Doyurucu karışık seçenek.', price: '₺170' },
    ],
  },
  {
    category: 'İçecekler',
    description: 'Kahvaltıya eşlik eden sıcak ve soğuk içecekler.',
    items: [
      { name: 'Çay', description: 'Taze demlenmiş bardak çay.', price: '₺25' },
      { name: 'Türk Kahvesi', description: 'Geleneksel sunumla servis edilir.', price: '₺70' },
      { name: 'Limonata', description: 'Ferah soğuk içecek.', price: '₺85' },
    ],
  },
  {
    category: 'Yemekler',
    description: 'Günün sıcak ve doyurucu seçenekleri.',
    items: [
      { name: 'Ev Yemeği', description: 'Günlük hazırlanan sıcak yemek.', price: 'Sorunuz' },
      { name: 'Izgara Seçenekleri', description: 'Mevcut günlük seçenekler için bilgi alınız.', price: 'Sorunuz' },
    ],
  },
] as const
