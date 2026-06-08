# Gülhan Kahvaltı

Gülhan Kahvaltı için geliştirilen modern tanıtım, menü gösterimi ve MVP e-ticaret/sipariş uygulaması.

Proje; sahil atmosferini, ev yapımı ürünleri ve kahvaltı menüsünü tanıtan public bir restoran sitesi ile kullanıcıların ürünleri sepete ekleyip ödeme entegrasyonu olmadan sipariş oluşturabildiği temel bir sipariş akışını birleştirir. Admin kullanıcıları ürün, kategori ve sipariş yönetimi yapabilir.

`gulhan.md` proje mimarisi ve kapsamı için ana teknik referanstır.

## Öne Çıkan Özellikler

- React + TypeScript + Vite frontend
- ASP.NET Core Web API backend
- Neon PostgreSQL veritabanı
- Entity Framework Core migration yapısı
- JWT login/register
- Admin/User rol tabanlı yetkilendirme
- Ürün ve kategori CRUD
- Sepet, checkout ve sipariş geçmişi
- Admin sipariş yönetimi ve sipariş durumu güncelleme
- Checkout sırasında stok azaltma
- Türkçe/İngilizce dil desteği
- Light/Dark tema desteği
- Render uyumlu HashRouter routing
- Render + Neon production deployment hazırlığı
- Responsive sahil/restoran temalı public UI

## Mimari

```text
React + TypeScript Frontend
        |
        | Axios
        v
ASP.NET Core Web API
        |
        | Entity Framework Core
        v
Neon PostgreSQL
```

## Teknoloji Stack

Backend:

- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- Npgsql PostgreSQL Provider
- JWT Bearer Authentication
- BCrypt password hashing
- Repository + Service katmanları
- Swagger, yalnızca Development ortamında

Frontend:

- React 19
- TypeScript
- Vite
- TailwindCSS
- React Router
- Axios
- Framer Motion
- Context API

Deployment:

- Backend: Render Web Service
- Frontend: Render Static Site
- Database: Neon PostgreSQL

## Proje Yapısı

```text
.
├── backend/
│   └── GulhanKahvalti.API/
│       ├── Controllers/
│       ├── Data/
│       ├── DTOs/
│       ├── Helpers/
│       ├── Middleware/
│       ├── Models/
│       ├── Repositories/
│       ├── Services/
│       ├── Migrations/
│       ├── Program.cs
│       └── Dockerfile
│
├── frontend/
│   └── gulhan-kahvalti-client/
│       ├── src/
│       │   ├── assets/
│       │   ├── components/
│       │   ├── config/
│       │   ├── context/
│       │   ├── hooks/
│       │   ├── layouts/
│       │   ├── pages/
│       │   ├── routes/
│       │   ├── services/
│       │   ├── types/
│       │   └── utils/
│       └── package.json
│
├── docs/
├── gulhan.md
└── README.md
```

## Public Site Yapısı

HashRouter kullanıldığı için production URL’leri `/#/` formatındadır.

- `/#/` Ana sayfa
- `/#/menu` Bilgilendirici restoran menüsü, sepete ekleme yok
- `/#/products` Sipariş verilebilir ürünler
- `/#/products/:id` Ürün detay sayfası
- `/#/about` Hakkımızda
- `/#/contact` İletişim
- `/#/login` Giriş
- `/#/register` Kayıt

Menü ve Ürünlerimiz bilinçli olarak ayrılmıştır:

- Menü: restorandaki menü ve fiyatları tanıtan bilgilendirici sayfa
- Ürünlerimiz: backend ürünlerinden gelen sipariş/e-ticaret akışı

## Kullanıcı Sayfaları

Giriş yapan normal kullanıcılar:

- `/#/cart`
- `/#/checkout`
- `/#/my-orders`
- `/#/account`
- `/#/settings`

Admin kullanıcıları bu kullanıcı akışlarına yönlendirilmez; admin paneline yönlendirilir.

## Admin Sayfaları

Admin rolü gerektirir:

- `/#/admin`
- `/#/admin/products`
- `/#/admin/categories`
- `/#/admin/orders`

Admin panelde ürün, kategori ve sipariş yönetimi yapılır. Sipariş durumları MVP kapsamında şu değerlerle yönetilir:

- `Pending`
- `Preparing`
- `Completed`
- `Cancelled`

## Backend API Özeti

Public:

```text
POST   /api/Auth/register
POST   /api/Auth/login
GET    /api/Categories
GET    /api/Products
GET    /api/Products/{id}
GET    /health
```

Authenticated User:

```text
GET    /api/Auth/me
GET    /api/Cart
POST   /api/Cart/add
PUT    /api/Cart/update/{id}
DELETE /api/Cart/remove/{id}
DELETE /api/Cart/clear
POST   /api/Orders/checkout
GET    /api/Orders/my-orders
GET    /api/Orders/{id}
```

Admin:

```text
GET    /api/Admin/dashboard
GET    /api/Admin/orders
PUT    /api/Admin/orders/{id}/status
GET    /api/health/config
POST   /api/Categories
PUT    /api/Categories/{id}
DELETE /api/Categories/{id}
POST   /api/Products
PUT    /api/Products/{id}
DELETE /api/Products/{id}
```

Not: Swagger sadece Development ortamında açıktır.

## Lokal Backend Kurulumu

```bash
cd backend/GulhanKahvalti.API
dotnet restore
dotnet run
```

Development için `backend/GulhanKahvalti.API/appsettings.Development.json` dosyasında veya environment variable olarak şu değerler gerekir:

```json
{
  "ConnectionStrings": {
    "GulhanDatabase": "<Neon veya lokal PostgreSQL connection string>"
  },
  "Jwt": {
    "Key": "<en az 32 byte geliştirme secret değeri>",
    "Issuer": "GulhanKahvaltiAPI",
    "Audience": "GulhanKahvaltiClient"
  },
  "Frontend": {
    "BaseUrl": "http://localhost:5173"
  },
  "DemoSeed": {
    "Enabled": true
  }
}
```

`appsettings.Development.json` gerçek credential içerebileceği için Git’e eklenmemelidir.

Swagger:

```text
http://localhost:5064/swagger
```

Health check:

```text
http://localhost:5064/health
```

## Lokal Frontend Kurulumu

```bash
cd frontend/gulhan-kahvalti-client
npm install
npm run dev
```

`frontend/gulhan-kahvalti-client/.env`:

```text
VITE_API_BASE_URL=http://localhost:5064/api
```

Frontend varsayılan olarak:

```text
http://localhost:5173
```

## Veritabanı ve Migration

Neon PostgreSQL connection string örneği:

```text
Host=<host>;Database=<database>;Username=<user>;Password=<password>;SSL Mode=Require;Trust Server Certificate=true
```

Migration çalıştırma:

```bash
cd backend/GulhanKahvalti.API
dotnet ef database update
```

Veritabanı kurulumu için detaylı doküman:

```text
docs/local-database-setup.md
```

## Demo Seed

Demo seed yalnızca Development ortamında kullanılmalıdır.

Seed desteği:

- Demo kategoriler
- Demo ürünler
- Development admin kullanıcısı

Production ortamında:

```text
DemoSeed__Enabled=false
```

Production admin credential bilgileri README veya GitHub üzerinde paylaşılmamalıdır.

## Environment Variables

Backend production:

```text
ASPNETCORE_ENVIRONMENT=Production
ASPNETCORE_URLS=http://+:10000
ConnectionStrings__GulhanDatabase=<Neon PostgreSQL connection string>
Jwt__Key=<strong random secret, at least 32 bytes>
Jwt__Issuer=GulhanKahvaltiAPI
Jwt__Audience=GulhanKahvaltiClient
Frontend__BaseUrl=https://<frontend-service>.onrender.com
DemoSeed__Enabled=false
```

Frontend production:

```text
VITE_API_BASE_URL=https://<backend-service>.onrender.com/api
```

Detaylı production env dokümanı:

```text
docs/production-env-vars.md
```

## Render Deployment

Backend Render Web Service:

- Root directory: `backend/GulhanKahvalti.API`
- Dockerfile: `backend/GulhanKahvalti.API/Dockerfile`
- Health check path: `/health`
- Environment: `Production`

Frontend Render Static Site:

- Root directory: `frontend/gulhan-kahvalti-client`
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Router: HashRouter, bu yüzden deep refresh için URL’ler `/#/route` formatındadır.

Deployment dokümanları:

```text
docs/render-backend-deployment.md
docs/render-frontend-deployment.md
docs/final-deployment-checklist.md
```

## İşletme Bilgileri

Gülhan Kahvaltı public UI’da kullanılan işletme bilgileri frontend tarafında yapılandırılmıştır:

```text
frontend/gulhan-kahvalti-client/src/config/siteSettings.ts
```

Mevcut bilgiler:

- Adres: Lamos Otel Yanı, Ayaş, Atatürk Cd. No:87A, 33750 Erdemli/Mersin
- WhatsApp: `https://wa.me/905392903909`
- E-posta: `mailto:fgulhanergin@gmail.com?subject=Gülhan%20Kahvaltı%20İletişim`
- Facebook: `https://www.facebook.com/share/1MDpJ1LRdt/?mibextid=wwXIfr`
- Instagram: `https://www.instagram.com/gulhankahvalti/`
- Google Maps: Gülhan Kahvaltı Salonu konum bağlantısı

Bu alanlar ileride admin panel/API üzerinden yönetilebilir hale getirilebilir.

## Güvenlik Notları

- Şifreler BCrypt ile hashlenir.
- Plain text şifre saklanmaz.
- JWT token API isteklerinde `Authorization: Bearer <token>` olarak gönderilir.
- Admin endpointleri rol kontrolü ile korunur.
- Kullanıcı sadece kendi sepetini ve siparişlerini görebilir.
- Production client response’ları genel hata mesajı döndürür; detaylar server loglarında tutulur.
- Gerçek connection string, JWT secret ve production credential bilgileri commitlenmemelidir.

## Doğrulama Komutları

Backend build:

```bash
cd backend/GulhanKahvalti.API
dotnet build
```

Frontend build:

```bash
cd frontend/gulhan-kahvalti-client
npm run build
```

Frontend lint:

```bash
cd frontend/gulhan-kahvalti-client
npm run lint
```

## Manuel Test Akışı

Public:

1. `/#/` ana sayfa açılır.
2. `/#/menu` bilgilendirici menüde sepet butonu olmadığı kontrol edilir.
3. `/#/products` backend ürünlerini yükler.
4. `/#/products/:id` ürün detayını açar.
5. Footer WhatsApp, e-posta, Facebook, Instagram ve Google Maps linkleri çalışır.

Kullanıcı:

1. Kayıt olunur veya giriş yapılır.
2. Ürün sepete eklenir.
3. Sepet miktarı güncellenir.
4. Checkout formu gönderilir.
5. `/#/my-orders` üzerinde sipariş görünür.

Admin:

1. Admin kullanıcı ile giriş yapılır.
2. `/#/admin` dashboard açılır.
3. Ürün oluşturma/güncelleme/silme test edilir.
4. Kategori oluşturma/güncelleme/silme test edilir.
5. Sipariş durumu güncellenir.

UI:

1. Mobil navbar açılıp kapanır.
2. Tema butonu light/dark arasında geçiş yapar.
3. TR/EN dil değişimi çalışır.
4. 320px, 375px, 768px ve desktop genişliklerde yatay taşma olmadığı kontrol edilir.

## Mevcut MVP Durumu

Tamamlandı:

- Backend domain modeli
- EF Core DbContext ve migration yapısı
- JWT auth
- Admin/User authorization
- Product CRUD
- Category CRUD
- Cart sistemi
- Checkout MVP
- Stock reduction
- User order history
- Admin order management
- Global exception middleware
- Render/Neon deployment hazırlığı
- Responsive public UI
- HashRouter production routing
- Türkçe/İngilizce dil desteği
- Light/Dark tema desteği

Kapsam dışı:

- Gerçek ödeme entegrasyonu
- E-posta bildirimi
- Kupon sistemi
- Analytics
- SaaS/multi-tenant yapı
- Gelişmiş stok/raporlama sistemi

## Faydalı Dokümanlar

```text
docs/local-database-setup.md
docs/backend-smoke-test.md
docs/frontend-smoke-test.md
docs/local-qa-report.md
docs/render-backend-deployment.md
docs/render-frontend-deployment.md
docs/production-env-vars.md
docs/final-deployment-checklist.md
```

## Lisans / Kullanım

Bu proje Gülhan Kahvaltı MVP tanıtım ve sipariş sistemi için hazırlanmıştır. Gerçek production kullanımında gizli environment variable değerleri, admin credential bilgileri ve veritabanı bağlantıları repository dışında tutulmalıdır.
