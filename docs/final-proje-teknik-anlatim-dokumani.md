# Gulhan Kahvalti Final Projesi Teknik Anlatim Dokumani

Bu dokuman, Gulhan Kahvalti projesinin 1 saatlik teknik anlatim videosu ve final proje raporu icin hazirlanmistir. Amaci, projeyi anlatacak kisinin mimariyi, kod organizasyonunu, veri modelini, API akisini, frontend ekranlarini, guvenlik yapisini, kurulum adimlarini ve demo senaryosunu tek dosyadan takip edebilmesidir.

## 1. Projenin Kisa Ozeti

Gulhan Kahvalti, bir restoran/tanitim sitesi ile temel e-ticaret ve siparis akisini birlestiren full-stack bir web uygulamasidir. Public tarafta isletmenin ana sayfasi, hakkimizda, iletisim, menu ve urun sayfalari bulunur. Kullanici girisi yapan kisiler urunleri sepete ekleyebilir, sepetini yonetebilir ve odeme entegrasyonu olmadan siparis olusturabilir. Admin rolundeki kullanicilar kategori, urun ve siparis yonetimi yapabilir.

Proje iki ana parcadan olusur:

- Backend: ASP.NET Core Web API, Entity Framework Core, PostgreSQL, JWT authentication.
- Frontend: React, TypeScript, Vite, TailwindCSS, Axios, React Router.

Veritabani olarak PostgreSQL kullanilir. Production hedefi Render uzerinde backend web service, frontend static site ve Neon PostgreSQL veritabanidir.

## 2. Projenin Amaci ve Kapsami

Projenin temel amaci, Gulhan Kahvalti icin hem tanitim hem de MVP seviyesinde siparis alma sistemi sunmaktir. Uygulama restoranin atmosferini, kahvalti menusunu ve satilabilir ev yapimi urunlerini tanitir. Ayni zamanda kullanicinin sepete urun eklemesi, checkout formu doldurmasi ve siparis gecmisini gormesi saglanir.

MVP kapsaminda bulunan ana ozellikler:

- Public restoran sitesi.
- Menu ve urun sayfalarinin ayrilmasi.
- Kullanici kayit ve giris sistemi.
- JWT tabanli kimlik dogrulama.
- User/Admin rol ayrimi.
- Urun listeleme ve urun detay sayfasi.
- Sepet ekleme, guncelleme, silme ve temizleme.
- Checkout ile siparis olusturma.
- Siparis olustururken stok azaltma.
- Kullanici siparis gecmisi.
- Admin urun, kategori ve siparis yonetimi.
- Siparis durumu guncelleme.
- Light/Dark tema destegi.
- Turkce/Ingilizce dil destegi.
- Responsive frontend tasarimi.

MVP disinda birakilan ozellikler:

- Gercek odeme entegrasyonu.
- E-posta/SMS bildirimi.
- Kargo takip sistemi.
- Kupon/indirim sistemi.
- Detayli raporlama ve analytics.
- Coklu sube veya multi-tenant yapi.

## 3. Teknoloji Stack

Backend teknolojileri:

- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- Npgsql PostgreSQL provider
- JWT Bearer Authentication
- BCrypt.Net-Next
- Swagger/Swashbuckle
- Repository + Service mimarisi
- Global exception middleware

Frontend teknolojileri:

- React 19
- TypeScript
- Vite
- TailwindCSS
- React Router DOM
- Axios
- Framer Motion
- Context API

Deployment teknolojileri:

- Render Web Service: Backend icin.
- Render Static Site: Frontend icin.
- Neon PostgreSQL: Cloud PostgreSQL veritabani icin.

## 4. Genel Mimari

Proje klasik client-server mimarisiyle calisir.

```text
Kullanici Tarayicisi
        |
        | React + Axios
        v
ASP.NET Core Web API
        |
        | Entity Framework Core
        v
PostgreSQL / Neon Database
```

Frontend kullanicidan gelen etkilesimleri yonetir, API'ye Axios ile HTTP istekleri atar ve donen veriyi ekranda gosterir. Backend is kurallarini uygular, yetkilendirme kontrollerini yapar, veriyi DTO'lar ile tasir ve Entity Framework Core uzerinden PostgreSQL veritabanina erisir.

## 5. Klasor Yapisi

Kok dizin:

```text
.
├── backend/
│   └── GulhanKahvalti.API/
├── frontend/
│   └── gulhan-kahvalti-client/
├── docs/
├── README.md
└── gulhan.md
```

Backend ana klasorleri:

```text
backend/GulhanKahvalti.API/
├── Controllers/       API endpointleri
├── Data/              DbContext ve database seed islemleri
├── DTOs/              Request/response veri tasima modelleri
├── Helpers/           JWT ve sifre hash yardimcilari
├── Middleware/        Global hata yakalama katmani
├── Models/            Entity modelleri
├── Repositories/      Veritabani erisim soyutlamalari
├── Services/          Is kurallari ve uygulama servisleri
├── Migrations/        EF Core migration dosyalari
├── Program.cs         Uygulama baslangic ve DI konfigrasyonu
└── Dockerfile         Render/Docker deployment icin
```

Frontend ana klasorleri:

```text
frontend/gulhan-kahvalti-client/src/
├── assets/            Gorseller ve marka varliklari
├── components/        Tekrar kullanilabilir UI/layout/product bilesenleri
├── config/            Site ayarlari, restoran menu verileri, marka gorselleri
├── context/           Auth, Theme ve Language contextleri
├── hooks/             Custom React hooklari
├── layouts/           MainLayout ve AdminLayout
├── pages/             Public, user ve admin sayfalari
├── routes/            Route tanimlari ve route guard yapilari
├── services/          API servis katmani
├── types/             TypeScript tipleri
└── utils/             Yardimci fonksiyonlar
```

## 6. Backend Mimarisi

Backend katmanli olarak yazilmistir. Controller sadece HTTP request/response akisini yonetir. Service katmani is kurallarini uygular. Repository katmani veritabani islemlerini soyutlar. Model katmani veritabani entity'lerini temsil eder. DTO katmani API'ye giren ve API'den cikan veriyi netlestirir.

Temel backend akisi:

```text
Controller -> Service -> Repository -> AppDbContext -> PostgreSQL
```

Ornek: Bir kullanici checkout yaptiginda:

1. Frontend `POST /api/Orders/checkout` istegi atar.
2. `OrdersController` kullanici kimligini JWT token icinden okur.
3. `OrderService.CreateAsync` cagrilir.
4. Servis, kullanicinin sepetini repository uzerinden alir.
5. Sepetin bos olup olmadigi, miktarlarin gecerli olup olmadigi ve stok yeterliligi kontrol edilir.
6. `Order` ve `OrderItem` kayitlari olusturulur.
7. Urun stoklari azaltılır.
8. Siparis kaydedilir ve sepet temizlenir.
9. Siparis response DTO olarak frontend'e doner.

## 7. Program.cs ve Uygulama Baslangici

Backend uygulamasinin merkezi dosyasi:

```text
backend/GulhanKahvalti.API/Program.cs
```

Bu dosyada yapilan temel islemler:

- Controller servisleri eklenir.
- Model validation response formati ozellestirilir.
- Swagger konfigrasyonu yapilir.
- PostgreSQL connection string okunur.
- `AppDbContext` Entity Framework Core ile kaydedilir.
- Repository ve service siniflari Dependency Injection container'a eklenir.
- JWT ayarlari okunur ve dogrulanir.
- JWT key uzunlugu kontrol edilir.
- CORS policy tanimlanir.
- Global exception middleware pipeline'a eklenir.
- Development ortaminda Swagger ve demo seed acilir.
- Production ortaminda HSTS kullanilir.
- Authentication ve Authorization middleware'leri calistirilir.
- Controller endpointleri map edilir.
- `/health` ve admin korumali `/health/config` endpointleri eklenir.

Bu dosya video anlatiminda backend'in kalbi olarak gosterilebilir.

## 8. Veri Modeli ve Iliskiler

Veritabani entity'leri `backend/GulhanKahvalti.API/Models` klasorundedir.

Ana entity'ler:

- `User`: Sisteme kayitli kullanicilari temsil eder.
- `Category`: Urun kategorilerini temsil eder.
- `Product`: Satilabilir urunleri temsil eder.
- `CartItem`: Kullanici sepetindeki urunleri temsil eder.
- `Order`: Siparis ust bilgisini temsil eder.
- `OrderItem`: Siparis icindeki urun satirlarini temsil eder.

Iliskiler:

```text
User 1 - N CartItem
User 1 - N Order
Category 1 - N Product
Product 1 - N CartItem
Product 1 - N OrderItem
Order 1 - N OrderItem
```

`AppDbContext` icinde onemli ayarlar:

- User email alani unique index ile korunur.
- Product price, Order total price ve OrderItem unit price decimal precision ile tanimlanir.
- Category-Product iliskisinde restrict delete kullanilir.
- Product-CartItem ve Product-OrderItem iliskilerinde restrict delete kullanilir.
- Order silindiginde OrderItem kayitlari cascade olarak silinir.

Bu iliskiler raporda ER diagram olarak da cizilebilir.

## 9. Backend Entity Detaylari

`User`:

- `Id`
- `FullName`
- `Email`
- `PasswordHash`
- `Role`
- `CreatedAt`
- `UpdatedAt`
- `CartItems`
- `Orders`

`Product`:

- `Id`
- `Name`
- `Description`
- `Price`
- `Stock`
- `ImageUrl`
- `IsActive`
- `CategoryId`
- `CreatedAt`
- `UpdatedAt`

`Order`:

- `Id`
- `UserId`
- `CustomerName`
- `CustomerPhone`
- `CustomerAddress`
- `Note`
- `TotalPrice`
- `Status`
- `CreatedAt`
- `UpdatedAt`
- `OrderItems`

`OrderItem`:

- `Id`
- `OrderId`
- `ProductId`
- `Quantity`
- `UnitPrice`
- `CreatedAt`

`CartItem`:

- `Id`
- `UserId`
- `ProductId`
- `Quantity`
- `CreatedAt`
- `UpdatedAt`

`Category`:

- `Id`
- `Name`
- `Description`
- `CreatedAt`
- `UpdatedAt`

## 10. API Endpointleri

Public endpointler:

```text
POST   /api/Auth/register
POST   /api/Auth/login
GET    /api/Categories
GET    /api/Categories/{id}
GET    /api/Products
GET    /api/Products/{id}
GET    /health
```

Login olmus kullanici endpointleri:

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

Admin endpointleri:

```text
GET    /api/Admin/dashboard
GET    /api/Admin/orders
PUT    /api/Admin/orders/{id}/status
GET    /api/Orders/admin/all
POST   /api/Categories
PUT    /api/Categories/{id}
DELETE /api/Categories/{id}
POST   /api/Products
PUT    /api/Products/{id}
DELETE /api/Products/{id}
GET    /health/config
```

Siparis durumlari:

```text
Pending
Preparing
Completed
Cancelled
```

## 11. Kimlik Dogrulama ve Yetkilendirme

Sistemde JWT Bearer Authentication kullanilir.

Kayit akisi:

1. Kullanici register formunu doldurur.
2. Frontend `POST /api/Auth/register` istegi atar.
3. Backend email'in daha once kullanilip kullanilmadigini kontrol eder.
4. Sifre BCrypt ile hashlenir.
5. Kullanici veritabanina kaydedilir.
6. JWT token ve kullanici bilgisi frontend'e doner.

Login akisi:

1. Kullanici email ve sifre girer.
2. Backend kullaniciyi email ile bulur.
3. Girilen sifre BCrypt ile dogrulanir.
4. Basariliysa JWT token uretilir.
5. Frontend token'i local storage yardimci fonksiyonlariyla saklar.
6. Axios request interceptor her istege `Authorization: Bearer <token>` header'i ekler.

Rol kontrolu:

- Normal kullanici role degeri: `User`
- Admin kullanici role degeri: `Admin`
- Admin controller ve admin CRUD endpointleri `[Authorize(Roles = "Admin")]` ile korunur.
- User endpointleri `[Authorize]` ile korunur.

Gosterilecek onemli dosyalar:

```text
backend/GulhanKahvalti.API/Helpers/JwtTokenGenerator.cs
backend/GulhanKahvalti.API/Helpers/PasswordHasher.cs
backend/GulhanKahvalti.API/Controllers/AuthController.cs
frontend/gulhan-kahvalti-client/src/services/api.ts
frontend/gulhan-kahvalti-client/src/context/AuthContext.tsx
frontend/gulhan-kahvalti-client/src/routes/ProtectedRoute.tsx
frontend/gulhan-kahvalti-client/src/routes/AdminRoute.tsx
```

## 12. Frontend Mimarisi

Frontend React + TypeScript ile yazilmistir. Vite proje gelistirme ve build aracidir. UI tasariminda TailwindCSS kullanilir. Frontend'de API ile iletisim `services` klasorunde toplanmistir.

Frontend ana akisi:

```text
Page Component -> Service Function -> Axios Client -> Backend API
```

Uygulama route yapisi `src/routes/AppRoutes.tsx` icindedir.

Public route'lar:

```text
/
/about
/contact
/menu
/products
/products/:id
/login
/register
```

Login gerektiren route'lar:

```text
/cart
/checkout
/my-orders
/account
/settings
```

Admin route'lar:

```text
/admin
/admin/products
/admin/categories
/admin/orders
```

Frontend'de HashRouter kullanildigi icin production URL yapisi genelde su sekildedir:

```text
/#/
/#/products
/#/admin/orders
```

## 13. Frontend Context ve State Yonetimi

Projede global durumlar React Context API ile yonetilir.

`AuthContext`:

- Login/register islemleri.
- Kullanici bilgisini saklama.
- Token saklama ve cikis yapma.
- Auth expired event'ini dinleme.

`ThemeContext`:

- Light/Dark tema bilgisini tutar.
- Kullanici tercihinin uygulanmasini saglar.

`LanguageContext`:

- Turkce/Ingilizce dil secimini yonetir.
- UI metinlerinde ceviri kullanilmasini saglar.

Ek hook'lar:

- `useAuth`
- `useTheme`
- `useLanguage`
- `useCartCount`

## 14. API Servis Katmani

Frontend API istemcisi:

```text
frontend/gulhan-kahvalti-client/src/services/api.ts
```

Bu dosyanin sorumluluklari:

- `VITE_API_BASE_URL` degerini okumak.
- API base URL'ini normalize etmek.
- Axios instance olusturmak.
- Request timeout ayarlamak.
- JWT token varsa Authorization header eklemek.
- 401 response geldiginde token ve user bilgisini temizlemek.
- Network/API hata mesajlarini kullaniciya uygun hale getirmek.

Servis dosyalari:

```text
authService.ts
productService.ts
categoryService.ts
cartService.ts
orderService.ts
```

Bu ayrim sayesinde sayfa componentleri dogrudan endpoint detaylariyla kirlenmez.

## 15. Temel Kullanici Akislari

### 15.1 Public Ziyaretci Akisi

1. Kullanici ana sayfayi acar.
2. Isletme atmosferini ve marka bilgilerini gorur.
3. Menu sayfasinda restorandaki menu ve fiyatlari inceler.
4. Urunler sayfasinda siparis verilebilir urunleri gorur.
5. Hakkimizda ve iletisim sayfalarindan isletme bilgilerine ulasir.

Bu akista login zorunlu degildir.

### 15.2 Kayit ve Login Akisi

1. Kullanici register sayfasinda hesap olusturur.
2. Backend sifreyi hashleyerek kullaniciyi kaydeder.
3. Kullanici login olur.
4. Frontend JWT token'i saklar.
5. Korumali sayfalara erisim acilir.

### 15.3 Sepet ve Checkout Akisi

1. Kullanici urunler sayfasindan urun secer.
2. Urunu sepete ekler.
3. Sepet sayfasinda miktar gunceller veya urun siler.
4. Checkout sayfasina gider.
5. Musteri adi, telefon, adres ve not bilgisi girer.
6. Backend sepeti siparise donusturur.
7. Stok dusurulur.
8. Sepet temizlenir.
9. Kullanici siparis gecmisinde siparisi gorur.

### 15.4 Admin Akisi

1. Admin kullanici login olur.
2. `/admin` paneline yonlendirilir.
3. Urunleri listeler, ekler, gunceller veya siler.
4. Kategorileri listeler, ekler, gunceller veya siler.
5. Siparisleri gorur.
6. Siparis durumunu `Pending`, `Preparing`, `Completed` veya `Cancelled` olarak gunceller.

## 16. Backend Is Kurallari

Onemli is kurallari:

- Ayni email ile tekrar kullanici olusturulamaz.
- Sifreler plain text saklanmaz, BCrypt hash olarak saklanir.
- Login olmadan sepet ve siparis endpointlerine erisilemez.
- Admin olmayan kullanici admin endpointlerine erisemez.
- Pasif urun sepete eklenemez.
- Sepete eklenen miktar stoktan fazla olamaz.
- Checkout sirasinda sepet bos olamaz.
- Checkout sirasinda urun stoklari tekrar kontrol edilir.
- Siparis olustugunda urun stoklari azaltilir.
- Siparis olustuktan sonra sepet temizlenir.
- Siparis durumu sadece izin verilen durum degerlerinden biri olabilir.
- Kullanici sadece kendi siparisini gorebilir.

## 17. Hata Yonetimi

Backend tarafinda global exception middleware bulunur:

```text
backend/GulhanKahvalti.API/Middleware/ExceptionHandlingMiddleware.cs
```

Bu middleware beklenmeyen hatalari yakalar. Production ortaminda kullaniciya detayli exception bilgisi donmek yerine genel hata mesaji donmek daha guvenlidir. Validation hatalari `Program.cs` icinde ozellestirilmis model state response ile doner.

Frontend tarafinda hata mesajlari `getApiErrorMessage` fonksiyonu ile standart hale getirilir. Axios 401 hatasi geldiginde auth bilgisi temizlenir ve uygulama auth expired event'i yayar.

## 18. Veritabani ve Migration

Proje Entity Framework Core migration yapisini kullanir.

DbContext:

```text
backend/GulhanKahvalti.API/Data/AppDbContext.cs
```

Migration klasoru:

```text
backend/GulhanKahvalti.API/Migrations
```

Lokal migration calistirma:

```bash
cd backend/GulhanKahvalti.API
dotnet ef database update
```

Connection string formati:

```text
Host=<host>;Database=<database>;Username=<user>;Password=<password>;SSL Mode=Require;Trust Server Certificate=true
```

## 19. Kurulum ve Calistirma

Backend calistirma:

```bash
cd backend/GulhanKahvalti.API
dotnet restore
dotnet run
```

Backend varsayilan local adres:

```text
http://localhost:5064
```

Swagger:

```text
http://localhost:5064/swagger
```

Health check:

```text
http://localhost:5064/health
```

Frontend calistirma:

```bash
cd frontend/gulhan-kahvalti-client
npm install
npm run dev
```

Frontend varsayilan local adres:

```text
http://localhost:5173
```

Frontend `.env` ornegi:

```text
VITE_API_BASE_URL=http://localhost:5064/api
```

## 20. Environment Variables

Backend production environment variable'lari:

```text
ASPNETCORE_ENVIRONMENT=Production
ASPNETCORE_URLS=http://+:10000
ConnectionStrings__GulhanDatabase=<PostgreSQL connection string>
Jwt__Key=<en az 32 byte guclu secret>
Jwt__Issuer=GulhanKahvaltiAPI
Jwt__Audience=GulhanKahvaltiClient
Frontend__BaseUrl=https://<frontend-service>.onrender.com
DemoSeed__Enabled=false
```

Frontend production environment variable'i:

```text
VITE_API_BASE_URL=https://<backend-service>.onrender.com/api
```

Guvenlik geregi connection string, JWT secret ve admin credential bilgileri repository icine yazilmamalidir.

## 21. Deployment Yapisi

Backend deployment:

- Platform: Render Web Service.
- Root directory: `backend/GulhanKahvalti.API`.
- Dockerfile: `backend/GulhanKahvalti.API/Dockerfile`.
- Health check path: `/health`.
- Environment: Production.

Frontend deployment:

- Platform: Render Static Site.
- Root directory: `frontend/gulhan-kahvalti-client`.
- Build command: `npm install && npm run build`.
- Publish directory: `dist`.
- Routing: HashRouter.

Database:

- Platform: Neon PostgreSQL.
- Backend connection string environment variable ile verilir.

## 22. Guvenlik Degerlendirmesi

Projede uygulanan guvenlik onlemleri:

- Sifreler BCrypt ile hashlenir.
- JWT token kullanilir.
- Token suresi ve issuer/audience dogrulamasi yapilir.
- JWT key minimum 32 byte olmalidir.
- Production ortaminda placeholder JWT key kabul edilmez.
- Admin endpointleri role-based authorization ile korunur.
- Kullanici verisi user id uzerinden filtrelenir.
- CORS sadece frontend base URL icin acilir.
- Secret bilgiler environment variable olarak tutulur.

Gelismeye acik guvenlik alanlari:

- Refresh token mekanizmasi eklenebilir.
- Rate limiting eklenebilir.
- Email verification eklenebilir.
- Admin islemleri icin audit log tutulabilir.
- Daha detayli input sanitization ve logging yapisi eklenebilir.

## 23. Test ve Dogrulama

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

Manuel test senaryolari:

- Ana sayfa aciliyor mu?
- Menu sayfasi bilgilendirici sekilde calisiyor mu?
- Products sayfasi backend'den urun cekiyor mu?
- Register ve login calisiyor mu?
- Token ile korumali sayfalara erisim saglaniyor mu?
- Sepete urun ekleniyor mu?
- Sepette miktar guncelleniyor mu?
- Checkout siparis olusturuyor mu?
- Siparis gecmisi gorunuyor mu?
- Admin urun CRUD calisiyor mu?
- Admin kategori CRUD calisiyor mu?
- Admin siparis durumu guncelliyor mu?
- Light/Dark tema degisiyor mu?
- TR/EN dil degisimi calisiyor mu?
- Mobil ekranda navbar ve layout bozulmuyor mu?

## 24. 1 Saatlik Teknik Anlatim Video Plani

Asagidaki akis 60 dakikalik bir teknik video icin uygundur.

### 0-5 Dakika: Proje Tanitimi

Anlatilacaklar:

- Projenin adi ve amaci.
- Restoran tanitim sitesi + MVP siparis sistemi oldugu.
- Kullanici, admin ve public ziyaretci rolleri.
- Kullanilan ana teknolojiler.

Gosterilecek yerler:

- README.md
- Ana sayfa
- Menu ve products sayfalari

### 5-10 Dakika: Genel Mimari

Anlatilacaklar:

- Frontend ve backend ayrimi.
- React istemcinin API ile haberlesmesi.
- Backend'in PostgreSQL ile calismasi.
- Katmanli backend mimarisi.

Gosterilecek yerler:

- Proje klasor yapisi.
- `backend/GulhanKahvalti.API`
- `frontend/gulhan-kahvalti-client`

### 10-18 Dakika: Backend Baslangic ve Konfigurasyon

Anlatilacaklar:

- `Program.cs` dosyasinin rolu.
- DI kayitlari.
- JWT ayarlari.
- CORS ayarlari.
- Swagger ve health endpointleri.
- Production/Development ayrimi.

Gosterilecek yerler:

- `backend/GulhanKahvalti.API/Program.cs`
- `backend/GulhanKahvalti.API/appsettings.json`

### 18-27 Dakika: Veritabani Modeli

Anlatilacaklar:

- User, Product, Category, CartItem, Order, OrderItem entity'leri.
- Iliskiler.
- DbContext konfigurasyonu.
- Migration yapisi.

Gosterilecek yerler:

- `Models` klasoru.
- `Data/AppDbContext.cs`
- `Migrations` klasoru.

### 27-36 Dakika: API ve Is Kurallari

Anlatilacaklar:

- Controller-Service-Repository akisi.
- Auth endpointleri.
- Product/Category endpointleri.
- Cart endpointleri.
- Checkout ve siparis olusturma.
- Admin siparis durumu guncelleme.

Gosterilecek yerler:

- `Controllers/AuthController.cs`
- `Controllers/ProductsController.cs`
- `Controllers/CartController.cs`
- `Controllers/OrdersController.cs`
- `Controllers/AdminController.cs`
- `Services/Implementations/OrderService.cs`
- `Services/Implementations/CartService.cs`

### 36-45 Dakika: Frontend Yapisi

Anlatilacaklar:

- React + TypeScript + Vite yapisi.
- Route yapisi.
- Public, protected ve admin sayfalar.
- Layout kullanimi.
- Context API kullanimi.
- API servis katmani.

Gosterilecek yerler:

- `src/routes/AppRoutes.tsx`
- `src/layouts/MainLayout.tsx`
- `src/layouts/AdminLayout.tsx`
- `src/context/AuthContext.tsx`
- `src/services/api.ts`
- `src/services/productService.ts`
- `src/services/orderService.ts`

### 45-53 Dakika: Canli Demo

Demo sirasi:

1. Ana sayfayi ac.
2. Menu sayfasini goster.
3. Products sayfasini ac.
4. Bir urun detayina gir.
5. Login/register akisini goster.
6. Sepete urun ekle.
7. Sepette miktar guncelle.
8. Checkout yap.
9. My orders sayfasinda siparisi goster.
10. Admin paneline gec.
11. Urun/kategori yonetimini goster.
12. Siparis durumunu guncelle.

### 53-58 Dakika: Deployment ve Production Hazirligi

Anlatilacaklar:

- Render backend deployment.
- Render frontend deployment.
- Neon PostgreSQL.
- Environment variable'lar.
- HashRouter kullaniminin sebebi.
- Secret bilgilerin repo disinda tutulmasi.

Gosterilecek yerler:

- `docs/render-backend-deployment.md`
- `docs/render-frontend-deployment.md`
- `docs/production-env-vars.md`
- `backend/GulhanKahvalti.API/Dockerfile`
- `frontend/gulhan-kahvalti-client/public/_redirects`

### 58-60 Dakika: Sonuc ve Gelistirme Onerileri

Anlatilacaklar:

- Projenin tamamlanan MVP kapsami.
- Guvenlik ve mimari kazanımlar.
- Gelecekte eklenebilecek ozellikler.

Gelistirme onerileri:

- Odeme entegrasyonu.
- E-posta bildirimi.
- Admin raporlama paneli.
- Refresh token.
- Siparis bildirim sistemi.
- Unit/integration test kapsamının artirilmasi.

## 25. Rapor Icin Onerilen Basliklar

Final proje raporunda su basliklar kullanilabilir:

1. Giriş
2. Projenin Amacı
3. Problem Tanımı
4. Kullanılan Teknolojiler
5. Sistem Mimarisi
6. Veritabanı Tasarımı
7. Backend Geliştirme Süreci
8. Frontend Geliştirme Süreci
9. Kimlik Doğrulama ve Yetkilendirme
10. API Endpointleri
11. Kullanıcı Arayüzü ve Sayfalar
12. Admin Paneli
13. Sipariş ve Sepet Akışı
14. Deployment Süreci
15. Test ve Doğrulama
16. Güvenlik Değerlendirmesi
17. Sonuç
18. Gelecek Geliştirmeler

## 26. Rapor Icin Kisa Metin Taslagi

Bu proje, Gulhan Kahvalti isletmesi icin gelistirilmis full-stack bir web uygulamasidir. Uygulama, restoranin tanitimini yapan public bir web sitesi ile temel siparis alma surecini birlestirir. Kullanici tarafinda urun listeleme, sepet yonetimi, checkout ve siparis gecmisi ozellikleri bulunur. Admin tarafinda ise urun, kategori ve siparis yonetimi yapilabilir.

Backend ASP.NET Core Web API ile gelistirilmis, veritabani islemleri Entity Framework Core uzerinden PostgreSQL ile saglanmistir. Kimlik dogrulama JWT token mekanizmasi ile yapilmis, sifreler BCrypt algoritmasi ile hashlenerek saklanmistir. Uygulamada repository ve service katmanlari kullanilarak controller'larin sade kalmasi ve is kurallarinin merkezi sekilde yonetilmesi saglanmistir.

Frontend React, TypeScript ve Vite ile gelistirilmistir. Sayfa yonlendirmeleri React Router ile, API haberlesmesi Axios ile, global durum yonetimi ise Context API ile saglanmistir. Uygulama responsive tasarlanmis, light/dark tema ve Turkce/Ingilizce dil destegi eklenmistir.

Proje production kullanima hazir olacak sekilde Render ve Neon PostgreSQL hedeflenerek yapilandirilmistir. Backend icin Dockerfile, health check endpointleri ve environment variable tabanli konfigurasyon bulunur. Frontend tarafinda API adresi `VITE_API_BASE_URL` ile disaridan verilir.

## 27. Sunumda Vurgulanacak Teknik Noktalar

- Proje full-stack mimariye sahiptir.
- Backend ve frontend birbirinden ayridir.
- Backend katmanli mimariyle yazilmistir.
- Veritabani iliskileri Entity Framework Core ile modellenmistir.
- JWT authentication ve role-based authorization vardir.
- Admin ve normal kullanici akislari ayridir.
- Checkout sirasinda stok kontrolu ve stok dusme islemi yapilir.
- Frontend servis katmani API detaylarini componentlerden ayirir.
- Environment variable kullanimi production guvenligi icin onemlidir.
- Deployment dokumanlari ve smoke test dokumanlari proje icinde mevcuttur.

## 28. Muhtemel Soru-Cevap Hazirligi

Soru: Neden frontend ve backend ayrildi?

Cevap: Bu ayrim sayesinde frontend React ile kullanici arayuzune odaklanirken backend API is kurallarini, veritabani islemlerini ve guvenligi yonetir. Bu yapi deployment ve bakim acisindan daha esnektir.

Soru: Neden JWT kullanildi?

Cevap: JWT stateless bir kimlik dogrulama yontemidir. Frontend token'i saklar ve API isteklerinde Authorization header ile gonderir. Backend bu token'i dogrulayarak kullanicinin kimligini ve rolunu belirler.

Soru: Sifreler nasil korunuyor?

Cevap: Sifreler veritabaninda plain text olarak tutulmaz. BCrypt ile hashlenir. Login sirasinda kullanicinin girdigi sifre hash ile karsilastirilir.

Soru: Admin yetkisi nasil kontrol ediliyor?

Cevap: JWT token icinde kullanicinin rol bilgisi bulunur. Backend'de admin endpointleri `[Authorize(Roles = "Admin")]` attribute'u ile korunur.

Soru: Siparis olusturulurken stok nasil yonetiliyor?

Cevap: Checkout sirasinda sepet urunleri okunur. Her urun icin aktiflik ve stok kontrolu yapilir. Siparis kaydi olusturulduktan sonra ilgili urunlerin stoklari siparis miktari kadar azaltılır ve sepet temizlenir.

Soru: Neden DTO kullanildi?

Cevap: DTO'lar API'ye giren ve cikan veriyi entity modellerinden ayirir. Boylece gereksiz veya hassas alanlar disari acilmaz, API sozlesmesi daha kontrollu olur.

Soru: Neden Repository ve Service katmani var?

Cevap: Repository veritabani erisimini soyutlar. Service katmani is kurallarini toplar. Controller sadece HTTP akisini yonetir. Bu ayrim kodun okunabilirligini ve test edilebilirligini artirir.

Soru: Proje production ortaminda nasil calisir?

Cevap: Backend Render Web Service olarak, frontend Render Static Site olarak, veritabani Neon PostgreSQL olarak calisir. Secret bilgiler environment variable ile verilir.

Soru: HashRouter neden kullanildi?

Cevap: Static site deployment ortamlarinda direkt route refresh sorunlarini azaltmak icin HashRouter tercih edilmistir. Bu yuzden production route'lari `/#/products` gibi gorunur.

## 29. Demo Oncesi Kontrol Listesi

Video cekmeden once:

- Backend calisiyor mu?
- Frontend calisiyor mu?
- `.env` icinde `VITE_API_BASE_URL` dogru mu?
- Veritabani baglantisi dogru mu?
- Swagger aciliyor mu?
- Public sayfalar aciliyor mu?
- Register/login calisiyor mu?
- Sepete urun ekleniyor mu?
- Checkout siparis olusturuyor mu?
- Admin hesabi hazir mi?
- Admin paneli aciliyor mu?
- Urun/kategori/siparis ekranlari calisiyor mu?
- Mobil gorunum hizlica kontrol edildi mi?
- Production credential veya gizli bilgi ekranda gorunmuyor mu?

## 30. Kodda Ozellikle Gosterilecek Dosyalar

Backend:

```text
backend/GulhanKahvalti.API/Program.cs
backend/GulhanKahvalti.API/Data/AppDbContext.cs
backend/GulhanKahvalti.API/Models/User.cs
backend/GulhanKahvalti.API/Models/Product.cs
backend/GulhanKahvalti.API/Models/Order.cs
backend/GulhanKahvalti.API/Controllers/AuthController.cs
backend/GulhanKahvalti.API/Controllers/ProductsController.cs
backend/GulhanKahvalti.API/Controllers/CartController.cs
backend/GulhanKahvalti.API/Controllers/OrdersController.cs
backend/GulhanKahvalti.API/Controllers/AdminController.cs
backend/GulhanKahvalti.API/Services/Implementations/AuthService.cs
backend/GulhanKahvalti.API/Services/Implementations/CartService.cs
backend/GulhanKahvalti.API/Services/Implementations/OrderService.cs
backend/GulhanKahvalti.API/Helpers/JwtTokenGenerator.cs
backend/GulhanKahvalti.API/Middleware/ExceptionHandlingMiddleware.cs
```

Frontend:

```text
frontend/gulhan-kahvalti-client/src/main.tsx
frontend/gulhan-kahvalti-client/src/App.tsx
frontend/gulhan-kahvalti-client/src/routes/AppRoutes.tsx
frontend/gulhan-kahvalti-client/src/routes/ProtectedRoute.tsx
frontend/gulhan-kahvalti-client/src/routes/AdminRoute.tsx
frontend/gulhan-kahvalti-client/src/services/api.ts
frontend/gulhan-kahvalti-client/src/context/AuthContext.tsx
frontend/gulhan-kahvalti-client/src/pages/ProductsPage.tsx
frontend/gulhan-kahvalti-client/src/pages/CartPage.tsx
frontend/gulhan-kahvalti-client/src/pages/CheckoutPage.tsx
frontend/gulhan-kahvalti-client/src/pages/admin/AdminProductsPage.tsx
frontend/gulhan-kahvalti-client/src/pages/admin/AdminOrdersPage.tsx
```

Dokumanlar:

```text
README.md
gulhan.md
docs/local-database-setup.md
docs/backend-smoke-test.md
docs/frontend-smoke-test.md
docs/render-backend-deployment.md
docs/render-frontend-deployment.md
docs/production-env-vars.md
docs/final-deployment-checklist.md
```

## 31. Sonuc

Gulhan Kahvalti projesi, modern web teknolojileriyle gelistirilmis, backend ve frontend ayrimi net olan, kullanici ve admin rollerini destekleyen, temel siparis surecini ucundan ucuna calistiran bir final projesidir. Proje sadece arayuzden ibaret degildir; veritabani modeli, authentication, authorization, sepet, checkout, stok dusme, admin yonetimi, deployment hazirligi ve teknik dokumantasyon gibi gercek bir web uygulamasinda beklenen bircok parcayi icerir.

Final video anlatiminda en onemli nokta, projeyi sadece sayfalar uzerinden degil, kullanici aksiyonunun backend'de hangi controller, service, repository ve veritabani islemlerine donustugunu gostererek anlatmaktir. Bu sekilde proje hem teknik hem de fonksiyonel olarak net sekilde aktarilabilir.
