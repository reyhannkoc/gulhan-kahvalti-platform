# Gülhan Kahvaltı E-Ticaret ve Tanıtım Sitesi Teknik Dosyası

## 1. Proje Özeti

Bu proje, yerel bir işletme olan **Gülhan Kahvaltı** için geliştirilecek modern bir tanıtım ve e-ticaret web uygulamasıdır. Projenin amacı, işletmenin dijital görünürlüğünü artırmak, ürün ve kahvaltı paketlerini online ortamda sergilemek, kullanıcıların ürünleri inceleyebilmesini, sepete ekleyebilmesini ve demo sipariş/checkout akışı gerçekleştirebilmesini sağlamaktır.

Proje hem tanıtım sitesi hem de temel e-ticaret sistemi mantığında çalışacaktır. Kullanıcılar site üzerinden işletme hakkında bilgi alabilecek, menüyü görüntüleyebilecek, ürün detaylarını inceleyebilecek, sepete ürün ekleyebilecek ve sipariş önizleme işlemi yapabilecektir. Admin rolüne sahip kullanıcılar ise ürün, kategori, stok ve sipariş yönetimi yapabilecektir.

---

## 2. Proje Adı

```txt
Gulhan Breakfast E-Commerce & Promotion System
```

Kod tarafında önerilen ana klasör adı:

```txt
gulhan-kahvalti-ecommerce
```

---

## 3. Temel Amaçlar

- Gülhan Kahvaltı için modern, güvenilir ve profesyonel bir web sitesi oluşturmak.
- İşletmenin ürünlerini, kahvaltı tabaklarını, serpme kahvaltı seçeneklerini ve kampanyalarını dijital ortamda sergilemek.
- Kullanıcıların ürünleri kategori bazlı incelemesini sağlamak.
- Sepet sistemi ile demo e-ticaret deneyimi sunmak.
- Admin panel üzerinden ürün, kategori ve sipariş yönetimi sağlamak.
- Mobil uyumlu, hızlı ve kullanıcı dostu bir arayüz oluşturmak.
- Backend tarafında gerçek REST API mimarisi kurmak.
- Neon PostgreSQL üzerinde ilişkisel veritabanı kullanmak.
- Render üzerinden backend deploy sürecini desteklemek.

---

## 4. Kullanılacak Teknolojiler

### 4.1 Frontend

```txt
React
TypeScript
TailwindCSS
Framer Motion
React Router DOM
Axios
Vite
```

Frontend tarafında React component yapısı kullanılacaktır. Arayüz JSX/TSX yapısı ile oluşturulacak, stillendirme için TailwindCSS kullanılacaktır. Sayfa geçişleri, kart animasyonları ve hover efektleri için Framer Motion kullanılacaktır.

### 4.2 Backend

```txt
C#
ASP.NET Core Web API
Entity Framework Core
JWT Authentication
Role-Based Authorization
REST API
DTO yapısı
Service katmanı
Repository katmanı
```

Backend tarafında C# ile ASP.NET Core Web API geliştirilecektir. Entity Framework Core ile PostgreSQL veritabanı bağlantısı sağlanacaktır. Kullanıcı kimlik doğrulama işlemleri JWT ile yapılacaktır.

### 4.3 Database

```txt
Neon PostgreSQL
```

Veritabanı ilişkisel yapıda tasarlanacaktır. Tablolar arası foreign key ilişkileri kurulacaktır.

### 4.4 Deployment

```txt
Frontend: Vercel veya Render Static Site
Backend: Render Web Service
Database: Neon PostgreSQL
```

Backend Render üzerinde çalıştırılacaktır. Gerekirse Dockerfile kullanılacaktır.

---

## 5. Genel Sistem Mimarisi

```txt
Kullanıcı Tarayıcısı
        |
        v
React + TypeScript Frontend
        |
        | HTTP Requests / Axios
        v
ASP.NET Core Web API Backend
        |
        | Entity Framework Core
        v
Neon PostgreSQL Database
```

Sistem üç ana katmandan oluşacaktır:

1. Frontend katmanı
2. Backend API katmanı
3. Database katmanı

---

## 6. Kullanıcı Rolleri

Sistemde iki temel kullanıcı rolü olacaktır.

### 6.1 User

Normal kullanıcıdır.

Yetkileri:

```txt
Ürünleri görüntüleme
Kategoriye göre ürün listeleme
Ürün detayını görüntüleme
Sepete ürün ekleme
Sepetten ürün çıkarma
Sepet miktarı güncelleme
Demo checkout işlemi yapma
Kendi siparişlerini görüntüleme
```

### 6.2 Admin

Yönetici kullanıcıdır.

Yetkileri:

```txt
Ürün ekleme
Ürün düzenleme
Ürün silme
Kategori ekleme
Kategori düzenleme
Kategori silme
Siparişleri görüntüleme
Sipariş durumunu güncelleme
Dashboard istatistiklerini görüntüleme
```

---

## 7. Ana Modüller

### 7.1 Tanıtım Modülü

Bu modül işletmenin vitrini olacaktır.

İçerikler:

```txt
Ana sayfa
İşletme hakkında kısa bilgi
Hero alanı
Öne çıkan kahvaltı ürünleri
Menü önizleme
Kampanya alanı
Galeri alanı
Konum ve iletişim bilgileri
WhatsApp yönlendirme butonu
```

### 7.2 Kullanıcı Modülü

Kullanıcı kayıt ve giriş işlemlerini kapsar.

İşlevler:

```txt
Register
Login
JWT token oluşturma
Kullanıcı bilgisi getirme
Role kontrolü
Logout
```

### 7.3 Ürün Modülü

Ürünlerin yönetildiği ana modüldür.

İşlevler:

```txt
Ürün listeleme
Ürün detay görüntüleme
Kategoriye göre filtreleme
Admin ürün ekleme
Admin ürün güncelleme
Admin ürün silme
Stok takibi
Fiyat bilgisi
Ürün görseli
```

### 7.4 Kategori Modülü

Ürün kategorilerinin yönetimini sağlar.

Örnek kategoriler:

```txt
Serpme Kahvaltı
Kahvaltı Tabakları
Sıcaklar
İçecekler
Tatlılar
Yöresel Ürünler
Paket Kahvaltılar
```

### 7.5 Sepet Modülü

Kullanıcıların ürünleri sepete ekleyebileceği modüldür.

İşlevler:

```txt
Sepete ürün ekleme
Sepet ürünlerini listeleme
Ürün miktarı artırma
Ürün miktarı azaltma
Sepetten ürün silme
Sepeti temizleme
Toplam fiyat hesaplama
```

### 7.6 Sipariş Modülü

Demo checkout ve sipariş kayıt işlemlerini içerir.

İşlevler:

```txt
Checkout demo
Sipariş oluşturma
Sipariş kalemleri oluşturma
Kullanıcı siparişlerini listeleme
Admin tüm siparişleri görüntüleme
Sipariş durumu güncelleme
```

### 7.7 Admin Panel Modülü

Admin kullanıcıların sistemi yönetmesini sağlar.

İçerikler:

```txt
Dashboard kartları
Toplam ürün sayısı
Toplam kategori sayısı
Toplam sipariş sayısı
Toplam kullanıcı sayısı
Ürün yönetimi
Kategori yönetimi
Sipariş yönetimi
```

---

## 8. Veritabanı Tasarımı

Veritabanı ilişkisel olarak tasarlanacaktır. Tablolar arasında primary key ve foreign key ilişkileri bulunacaktır.

Kullanılacak ana tablolar:

```txt
users
categories
products
cart_items
orders
order_items
contact_messages
site_settings
```

---

## 9. Tabloların Detayları

## 9.1 users

Kullanıcı bilgilerini tutar.

```txt
id              UUID / int primary key
full_name       varchar
email           varchar unique
password_hash   text
role            varchar
phone           varchar nullable
created_at      timestamp
updated_at      timestamp nullable
```

Örnek roller:

```txt
Admin
User
```

İlişkiler:

```txt
users 1-N cart_items
users 1-N orders
```

---

## 9.2 categories

Ürün kategorilerini tutar.

```txt
id              UUID / int primary key
name            varchar
slug            varchar unique
description     text nullable
image_url       text nullable
is_active       boolean
created_at      timestamp
updated_at      timestamp nullable
```

İlişkiler:

```txt
categories 1-N products
```

---

## 9.3 products

Ürün bilgilerini tutar.

```txt
id              UUID / int primary key
category_id     foreign key
name            varchar
slug            varchar unique
description     text
price           decimal
stock           int
image_url       text
is_featured     boolean
is_active       boolean
created_at      timestamp
updated_at      timestamp nullable
```

İlişkiler:

```txt
products N-1 categories
products 1-N cart_items
products 1-N order_items
```

---

## 9.4 cart_items

Kullanıcının sepetindeki ürünleri tutar.

```txt
id              UUID / int primary key
user_id         foreign key
product_id      foreign key
quantity        int
created_at      timestamp
updated_at      timestamp nullable
```

İlişkiler:

```txt
cart_items N-1 users
cart_items N-1 products
```

Kural:

```txt
Aynı kullanıcı aynı ürünü sepete ikinci kez eklerse yeni satır açmak yerine quantity artırılmalıdır.
```

---

## 9.5 orders

Sipariş ana bilgisini tutar.

```txt
id              UUID / int primary key
user_id         foreign key
total_price     decimal
status          varchar
customer_name   varchar
customer_phone  varchar
address         text nullable
note            text nullable
created_at      timestamp
updated_at      timestamp nullable
```

Örnek sipariş durumları:

```txt
Pending
Preparing
Completed
Cancelled
```

İlişkiler:

```txt
orders N-1 users
orders 1-N order_items
```

---

## 9.6 order_items

Sipariş içindeki ürünleri tutar.

```txt
id              UUID / int primary key
order_id        foreign key
product_id      foreign key
quantity        int
unit_price      decimal
total_price     decimal
created_at      timestamp
```

İlişkiler:

```txt
order_items N-1 orders
order_items N-1 products
```

---

## 9.7 contact_messages

İletişim formundan gelen mesajları tutar.

```txt
id              UUID / int primary key
full_name       varchar
email           varchar nullable
phone           varchar nullable
message         text
is_read         boolean
created_at      timestamp
```

---

## 9.8 site_settings

İşletmeye ait genel ayarları tutar.

```txt
id                  UUID / int primary key
business_name       varchar
address             text
phone               varchar
whatsapp_number     varchar
instagram_url       text nullable
google_maps_url     text nullable
opening_hours       text nullable
about_text          text nullable
hero_title          varchar nullable
hero_subtitle       text nullable
created_at          timestamp
updated_at          timestamp nullable
```

---

## 10. Veritabanı İlişkileri

### 10.1 users - cart_items

```txt
Bir kullanıcı birden fazla sepet kaydına sahip olabilir.
users.id -> cart_items.user_id
```

İlişki tipi:

```txt
One to Many
```

---

### 10.2 users - orders

```txt
Bir kullanıcı birden fazla sipariş oluşturabilir.
users.id -> orders.user_id
```

İlişki tipi:

```txt
One to Many
```

---

### 10.3 categories - products

```txt
Bir kategoriye birden fazla ürün bağlı olabilir.
categories.id -> products.category_id
```

İlişki tipi:

```txt
One to Many
```

---

### 10.4 products - cart_items

```txt
Bir ürün birden fazla kullanıcının sepetinde bulunabilir.
products.id -> cart_items.product_id
```

İlişki tipi:

```txt
One to Many
```

---

### 10.5 orders - order_items

```txt
Bir sipariş birden fazla sipariş kalemine sahip olabilir.
orders.id -> order_items.order_id
```

İlişki tipi:

```txt
One to Many
```

---

### 10.6 products - order_items

```txt
Bir ürün birden fazla sipariş kaleminde bulunabilir.
products.id -> order_items.product_id
```

İlişki tipi:

```txt
One to Many
```

---

## 11. Entity Framework Core İlişki Mantığı

Backend tarafında ilişkiler Entity Framework Core ile tanımlanacaktır.

Örnek ilişki mantığı:

```csharp
modelBuilder.Entity<Product>()
    .HasOne(p => p.Category)
    .WithMany(c => c.Products)
    .HasForeignKey(p => p.CategoryId);

modelBuilder.Entity<CartItem>()
    .HasOne(c => c.User)
    .WithMany(u => u.CartItems)
    .HasForeignKey(c => c.UserId);

modelBuilder.Entity<OrderItem>()
    .HasOne(oi => oi.Order)
    .WithMany(o => o.OrderItems)
    .HasForeignKey(oi => oi.OrderId);
```

---

## 12. Backend Klasör Yapısı

Önerilen backend klasör yapısı:

```txt
backend/
└── Gulhan.API/
    ├── Controllers/
    │   ├── AuthController.cs
    │   ├── ProductsController.cs
    │   ├── CategoriesController.cs
    │   ├── CartController.cs
    │   ├── OrdersController.cs
    │   ├── ContactController.cs
    │   └── AdminController.cs
    │
    ├── Data/
    │   └── AppDbContext.cs
    │
    ├── DTOs/
    │   ├── Auth/
    │   ├── Product/
    │   ├── Category/
    │   ├── Cart/
    │   ├── Order/
    │   └── Contact/
    │
    ├── Models/
    │   ├── User.cs
    │   ├── Category.cs
    │   ├── Product.cs
    │   ├── CartItem.cs
    │   ├── Order.cs
    │   ├── OrderItem.cs
    │   ├── ContactMessage.cs
    │   └── SiteSetting.cs
    │
    ├── Repositories/
    │   ├── Interfaces/
    │   └── Implementations/
    │
    ├── Services/
    │   ├── Interfaces/
    │   └── Implementations/
    │
    ├── Helpers/
    │   ├── JwtHelper.cs
    │   └── PasswordHelper.cs
    │
    ├── Middleware/
    │   └── ErrorHandlingMiddleware.cs
    │
    ├── Migrations/
    ├── Program.cs
    ├── appsettings.json
    └── Dockerfile
```

---

## 13. Frontend Klasör Yapısı

Önerilen frontend klasör yapısı:

```txt
frontend/
└── gulhan-client/
    ├── src/
    │   ├── api/
    │   │   ├── axiosClient.ts
    │   │   ├── authApi.ts
    │   │   ├── productApi.ts
    │   │   ├── categoryApi.ts
    │   │   ├── cartApi.ts
    │   │   └── orderApi.ts
    │   │
    │   ├── assets/
    │   │   └── images/
    │   │
    │   ├── components/
    │   │   ├── common/
    │   │   │   ├── Button.tsx
    │   │   │   ├── Card.tsx
    │   │   │   ├── Input.tsx
    │   │   │   ├── FormField.tsx
    │   │   │   ├── LoadingSpinner.tsx
    │   │   │   └── Toast.tsx
    │   │   │
    │   │   ├── layout/
    │   │   │   ├── Navbar.tsx
    │   │   │   ├── Footer.tsx
    │   │   │   └── Layout.tsx
    │   │   │
    │   │   ├── product/
    │   │   │   ├── ProductCard.tsx
    │   │   │   ├── ProductGrid.tsx
    │   │   │   └── ProductForm.tsx
    │   │   │
    │   │   └── admin/
    │   │       ├── DashboardCard.tsx
    │   │       └── AdminSidebar.tsx
    │   │
    │   ├── context/
    │   │   ├── AuthContext.tsx
    │   │   └── CartContext.tsx
    │   │
    │   ├── hooks/
    │   │   ├── useAuth.ts
    │   │   └── useCart.ts
    │   │
    │   ├── pages/
    │   │   ├── HomePage.tsx
    │   │   ├── AboutPage.tsx
    │   │   ├── MenuPage.tsx
    │   │   ├── ProductDetailPage.tsx
    │   │   ├── CartPage.tsx
    │   │   ├── CheckoutPage.tsx
    │   │   ├── LoginPage.tsx
    │   │   ├── RegisterPage.tsx
    │   │   ├── ContactPage.tsx
    │   │   └── admin/
    │   │       ├── AdminDashboardPage.tsx
    │   │       ├── ProductManagementPage.tsx
    │   │       ├── CategoryManagementPage.tsx
    │   │       └── OrderManagementPage.tsx
    │   │
    │   ├── routes/
    │   │   ├── AppRoutes.tsx
    │   │   ├── ProtectedRoute.tsx
    │   │   └── AdminRoute.tsx
    │   │
    │   ├── types/
    │   │   ├── auth.types.ts
    │   │   ├── product.types.ts
    │   │   ├── category.types.ts
    │   │   ├── cart.types.ts
    │   │   └── order.types.ts
    │   │
    │   ├── utils/
    │   │   ├── formatPrice.ts
    │   │   └── validation.ts
    │   │
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    │
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.ts
```

---

## 14. API Endpoint Planı

## 14.1 Auth Endpoints

```txt
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
```

### Register Request

```json
{
  "fullName": "Test User",
  "email": "test@example.com",
  "password": "123456",
  "phone": "05555555555"
}
```

### Login Request

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

---

## 14.2 Product Endpoints

```txt
GET     /api/products
GET     /api/products/{id}
GET     /api/products/featured
GET     /api/products/category/{categoryId}
POST    /api/products
PUT     /api/products/{id}
DELETE  /api/products/{id}
```

Admin yetkisi gerektiren endpointler:

```txt
POST /api/products
PUT /api/products/{id}
DELETE /api/products/{id}
```

---

## 14.3 Category Endpoints

```txt
GET     /api/categories
GET     /api/categories/{id}
POST    /api/categories
PUT     /api/categories/{id}
DELETE  /api/categories/{id}
```

Admin yetkisi gerektiren endpointler:

```txt
POST /api/categories
PUT /api/categories/{id}
DELETE /api/categories/{id}
```

---

## 14.4 Cart Endpoints

```txt
GET     /api/cart
POST    /api/cart/add
PUT     /api/cart/update/{cartItemId}
DELETE  /api/cart/remove/{cartItemId}
DELETE  /api/cart/clear
```

---

## 14.5 Order Endpoints

```txt
POST    /api/orders/checkout
GET     /api/orders/my-orders
GET     /api/orders/{id}
GET     /api/orders/admin/all
PUT     /api/orders/admin/status/{id}
```

Admin yetkisi gerektiren endpointler:

```txt
GET /api/orders/admin/all
PUT /api/orders/admin/status/{id}
```

---

## 14.6 Contact Endpoints

```txt
POST    /api/contact
GET     /api/contact/admin/messages
PUT     /api/contact/admin/read/{id}
DELETE  /api/contact/admin/{id}
```

---

## 14.7 Site Settings Endpoints

```txt
GET     /api/site-settings
PUT     /api/site-settings
```

---

## 15. DTO Kullanımı

Entity modelleri doğrudan frontend'e gönderilmemelidir. Bunun yerine DTO yapısı kullanılmalıdır.

Örnek DTO klasörleri:

```txt
DTOs/Auth/RegisterDto.cs
DTOs/Auth/LoginDto.cs
DTOs/Auth/AuthResponseDto.cs
DTOs/Product/ProductCreateDto.cs
DTOs/Product/ProductUpdateDto.cs
DTOs/Product/ProductResponseDto.cs
DTOs/Category/CategoryCreateDto.cs
DTOs/Category/CategoryResponseDto.cs
DTOs/Cart/CartItemResponseDto.cs
DTOs/Order/OrderCreateDto.cs
DTOs/Order/OrderResponseDto.cs
```

---

## 16. JWT Authentication

Login başarılı olduğunda backend JWT token üretmelidir.

Token içinde şu bilgiler bulunabilir:

```txt
UserId
Email
Role
Expiration
```

Frontend tarafında token saklanacak ve API isteklerinde Authorization header ile gönderilecektir.

```txt
Authorization: Bearer TOKEN_VALUE
```

---

## 17. Güvenlik Kuralları

- Şifreler düz metin olarak tutulmayacaktır.
- Şifreler hashlenerek veritabanına kaydedilecektir.
- Admin endpointleri role kontrolü ile korunacaktır.
- JWT expiration süresi olacaktır.
- Kullanıcı sadece kendi sepetini ve kendi siparişlerini görebilecektir.
- Kullanıcıdan gelen inputlar doğrulanacaktır.
- Backend tarafında global error handling kullanılacaktır.
- CORS ayarı frontend domainine göre yapılacaktır.
- `.env`, `appsettings.Production.json` ve connection string bilgileri GitHub'a yüklenmemelidir.

---

## 18. Frontend Sayfaları

### Public Sayfalar

```txt
/
/about
/menu
/products/:id
/contact
/login
/register
```

### User Sayfaları

```txt
/cart
/checkout
/my-orders
```

### Admin Sayfaları

```txt
/admin
/admin/products
/admin/categories
/admin/orders
```

---

## 19. UI Tasarım Prensipleri

Gülhan Kahvaltı sitesi sıcak, doğal ve yerel işletme hissi veren bir tasarıma sahip olmalıdır.

Önerilen tasarım dili:

```txt
Sıcak renkler
Krem tonları
Kahverengi tonları
Doğal yeşil detaylar
Yuvarlak kartlar
Yumuşak gölgeler
Büyük ürün görselleri
Mobil öncelikli tasarım
```

Ana UI bileşenleri:

```txt
Navbar
Hero section
Category cards
Product cards
Featured products
About section
Gallery section
Contact section
Footer
Admin dashboard cards
Forms
Loading skeleton
Toast notifications
```

---

## 20. React Kullanım Gereksinimleri

Projede şu React özellikleri aktif olarak kullanılmalıdır:

```txt
useState
useEffect
props
component yapısı
custom hooks
context API
conditional rendering
map ile listeleme
form state yönetimi
loading state
error state
success state
React Router
```

---

## 21. HTML ve CSS Kullanımı

Frontend React ile geliştirilecektir. React içinde HTML benzeri JSX/TSX yapısı kullanılacaktır.

Kullanılacak HTML/CSS kavramları:

```txt
Semantic HTML
Responsive layout
Flexbox
CSS Grid
Tailwind utility classes
Hover effects
Transition
Animation
Form elements
Button states
Mobile menu
```

Örnek:

```tsx
<section className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <article className="rounded-2xl shadow-md p-4">
    <h2>Serpme Kahvaltı</h2>
    <p>Geleneksel kahvaltı lezzetleri.</p>
  </article>
</section>
```

---

## 22. Render Deployment Planı

Backend Render üzerinde yayınlanacaktır.

Render için temel gereksinimler:

```txt
GitHub repository
Backend Dockerfile
Environment variables
Neon PostgreSQL connection string
ASPNETCORE_ENVIRONMENT=Production
ASPNETCORE_URLS=http://+:8080
```

Örnek Dockerfile:

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "Gulhan.API.dll"]
```

---

## 23. Environment Variables

Backend tarafında hassas bilgiler environment variable olarak tutulmalıdır.

Örnek:

```txt
ConnectionStrings__DefaultConnection=NEON_CONNECTION_STRING
Jwt__Key=SUPER_SECRET_KEY
Jwt__Issuer=GulhanAPI
Jwt__Audience=GulhanClient
Jwt__ExpireMinutes=120
```

Frontend tarafında:

```txt
VITE_API_BASE_URL=https://gulhan-api.onrender.com/api
```

---

## 24. Proje Geliştirme Sırası

### Aşama 1: Backend Kurulumu

```txt
ASP.NET Core Web API projesi oluştur.
Gerekli NuGet paketlerini kur.
AppDbContext oluştur.
Neon PostgreSQL bağlantısını yap.
Entity modellerini oluştur.
Migration al.
Database update işlemini yap.
Swagger üzerinden API çalışıyor mu kontrol et.
```

### Aşama 2: Ana Entity ve CRUD İşlemleri

```txt
Category entity oluştur.
Product entity oluştur.
Category controller yaz.
Product controller yaz.
Product ve Category CRUD işlemlerini test et.
```

### Aşama 3: Auth Sistemi

```txt
User entity oluştur.
Register endpoint yaz.
Login endpoint yaz.
Password hash işlemini ekle.
JWT token üretimini ekle.
Role kontrolünü ekle.
Admin endpointlerini koru.
```

### Aşama 4: Sepet Sistemi

```txt
CartItem entity oluştur.
Sepete ekleme endpointi yaz.
Sepeti listeleme endpointi yaz.
Miktar güncelleme endpointi yaz.
Sepetten silme endpointi yaz.
Sepeti temizleme endpointi yaz.
```

### Aşama 5: Sipariş Sistemi

```txt
Order entity oluştur.
OrderItem entity oluştur.
Checkout endpointi yaz.
Sipariş kalemlerini oluştur.
Toplam fiyat hesapla.
Stok azaltma işlemini ekle.
Kullanıcı siparişlerini listele.
Admin sipariş yönetimini ekle.
```

### Aşama 6: Frontend Kurulumu

```txt
Vite React TypeScript projesi oluştur.
TailwindCSS kur.
React Router kur.
Axios client oluştur.
Layout ve Navbar oluştur.
Ana sayfa tasarımını yap.
Menü sayfasını yap.
Ürün kartlarını oluştur.
```

### Aşama 7: Frontend API Entegrasyonu

```txt
Product API bağlantısını yap.
Category API bağlantısını yap.
Login/register bağlantısını yap.
Token yönetimini yap.
Sepet işlemlerini bağla.
Checkout işlemini bağla.
Admin paneli API ile bağla.
```

### Aşama 8: UI İyileştirme

```txt
Framer Motion animasyonları ekle.
Loading skeleton ekle.
Toast notification ekle.
Responsive tasarımı tamamla.
Mobil navbar ekle.
Hover efektlerini düzenle.
```

### Aşama 9: Deploy

```txt
Backend'i GitHub'a pushla.
Render Web Service oluştur.
Environment variables ekle.
Backend deploy et.
Frontend API URL'ini güncelle.
Frontend'i Vercel veya Render'a deploy et.
Canlı sistem testi yap.
```

### Aşama 10: Teslim Hazırlığı

```txt
README.md hazırla.
Proje raporu hazırla.
API endpointlerini belgele.
Ekran görüntüleri al.
Video anlatımını hazırla.
Final zip dosyasını hazırla.
node_modules, bin, obj ve gizli dosyaları zip'e koyma.
```

---

## 25. README İçeriği

README dosyasında şu başlıklar bulunmalıdır:

```txt
Proje adı
Proje açıklaması
Kullanılan teknolojiler
Kurulum adımları
Backend çalıştırma
Frontend çalıştırma
Environment variables
API endpoint listesi
Veritabanı tabloları
Ekran görüntüleri
Deploy linkleri
Geliştirici bilgisi
```

---

## 26. Kodlama Kuralları

- Dosya ve klasör isimleri anlamlı olmalıdır.
- Component isimleri PascalCase yazılmalıdır.
- Değişken isimleri camelCase yazılmalıdır.
- Backend entity isimleri tekil olmalıdır.
- Controller isimleri çoğul veya modül bazlı tutarlı olmalıdır.
- Her modül mümkün olduğunca ayrı dosyalara bölünmelidir.
- Tek dosyada çok fazla sorumluluk olmamalıdır.
- API response yapıları tutarlı olmalıdır.
- Hata mesajları kullanıcı dostu olmalıdır.

---

## 27. Örnek API Response Formatı

Başarılı response:

```json
{
  "success": true,
  "message": "Products listed successfully.",
  "data": []
}
```

Hatalı response:

```json
{
  "success": false,
  "message": "Product not found.",
  "errors": []
}
```

---

## 28. Minimum MVP Kapsamı

Projenin minimum çalışır versiyonunda mutlaka şu özellikler bulunmalıdır:

```txt
Ana sayfa
Menü/ürün listeleme
Ürün detay sayfası
Login
Register
JWT auth
Admin ürün ekleme
Admin ürün silme
Kategori listeleme
Sepete ekleme
Sepet görüntüleme
Checkout demo
Neon PostgreSQL bağlantısı
Render backend deploy
Responsive tasarım
```

---

## 29. Ekstra Özellikler

Zaman kalırsa eklenebilir:

```txt
Ürün arama
Fiyat filtreleme
Favoriler
Galeri yönetimi
Kampanya yönetimi
WhatsApp sipariş entegrasyonu
Google Maps embed
Admin istatistik grafikleri
Sipariş durum takibi
Mail bildirimi
```

---

## 30. Codex İçin Kullanım Notu

Bu dosya proje boyunca ana teknik referans dosyasıdır. Codex veya başka bir AI kodlama aracı ile çalışırken bu dosya baz alınmalıdır.

Codex'e verilecek örnek yönlendirme:

```txt
Bu projede gulhan.md dosyasındaki teknik mimariyi, veritabanı ilişkilerini, klasör yapısını, endpoint planını ve geliştirme sırasını baz al. Kod üretirken bu dosyaya uygun ilerle. Projenin backend tarafı C# ASP.NET Core Web API, frontend tarafı React TypeScript, database tarafı Neon PostgreSQL olacak.
```

---

## 31. Nihai Teknik Karar

Bu proje için nihai teknik karar şu şekildedir:

```txt
Frontend: React + TypeScript + TailwindCSS + Framer Motion
Backend: C# ASP.NET Core Web API
Database: Neon PostgreSQL
Auth: JWT Login/Register
Authorization: Admin/User Role System
API: REST API
Deploy: Render
Database Design: Relational Database
```

Proje boyunca bu teknik dosya takip edilecektir.
