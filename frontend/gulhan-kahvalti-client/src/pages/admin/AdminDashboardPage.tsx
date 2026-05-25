import { Link } from 'react-router-dom'

const quickLinks = [
  {
    title: 'Manage Products',
    description: 'Urunleri ekle, duzenle ve stok durumunu kontrol et.',
    to: '/admin/products',
  },
  {
    title: 'Manage Categories',
    description: 'Menu kategorilerini duzenle.',
    to: '/admin/categories',
  },
  {
    title: 'Manage Orders',
    description: 'Siparisleri goruntule ve durumlarini guncelle.',
    to: '/admin/orders',
  },
]

export function AdminDashboardPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-950">Admin Dashboard</h1>
        <p className="mt-2 text-stone-600">
          Gecis yapmak istediginiz yonetim alanini secin.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {quickLinks.map((link) => (
          <Link
            className="rounded-lg border border-stone-200 bg-stone-50 p-4 transition hover:border-emerald-300 hover:bg-emerald-50"
            key={link.to}
            to={link.to}
          >
            <h2 className="font-semibold text-stone-950">{link.title}</h2>
            <p className="mt-2 text-sm text-stone-600">{link.description}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
