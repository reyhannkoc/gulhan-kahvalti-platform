# Local QA Report

Date: 2026-05-23

Scope: local database readiness, Swagger/API validation, frontend runtime validation, and production build checks for the Gülhan Kahvaltı MVP.

## Database Connection Status

- `ConnectionStrings:GulhanDatabase`: configured locally.
- Connection string shape: PostgreSQL/Neon-compatible.
- Placeholder credentials detected: no.
- Real connection string value: intentionally not printed or documented.
- Render/Neon environment variable compatibility: supported through `ConnectionStrings__GulhanDatabase`.

## Migration Status

- Migrations folder exists.
- Current migration present: `ProductionMvpReadiness`.
- Database migration status: applied successfully before this QA pass, per local validation state.
- No destructive database commands were run during this QA pass.
- No additional migration was created because no model changes were required.

## Seed Status

- `DemoSeed:Enabled`: true locally.
- Demo seed is development-only in application startup.
- Seeded admin user exists and login was validated.
- Seeded sample categories/products are available.
- No production secrets were added or exposed.

## Backend Test Status

| Area | Check | Status |
| --- | --- | --- |
| Swagger | `http://localhost:5064/swagger/v1/swagger.json` | Passed |
| Auth | Admin login | Passed |
| Auth | JWT token generation | Passed |
| Admin auth | `GET /api/Admin/dashboard` | Passed |
| Categories | `GET /api/Categories` | Passed |
| Products | `GET /api/Products` | Passed |
| Categories | `POST /api/Categories` as Admin | Passed |
| Products | `POST /api/Products` as Admin | Passed |
| Products | `GET /api/Products/{id}` | Passed |
| User auth | QA user registration | Passed |
| Cart | `POST /api/Cart/add` | Passed |
| Cart | `GET /api/Cart` | Passed |
| Checkout | `POST /api/Orders/checkout` | Passed |
| Orders | `GET /api/Orders/my-orders` | Passed |
| Orders | `GET /api/Orders/{id}` for own order | Passed |
| Admin orders | `GET /api/Admin/orders` | Passed |
| Admin orders | `PUT /api/Admin/orders/{id}/status` | Passed |
| Stock | Stock reduced after checkout | Passed |

## Frontend Test Status

- `.env` existed before QA: no.
- `.env` created with:

```text
VITE_API_BASE_URL=http://localhost:5064/api
```

- Frontend dev server: started successfully after running outside the sandbox.
- SPA route checks returned the app shell:
  - `/`
  - `/menu`
  - `/login`
  - `/products/{id}`
  - `/cart`
  - `/checkout`
  - `/my-orders`
  - `/admin`
  - `/admin/products`
  - `/admin/categories`
  - `/admin/orders`

## Auth/JWT Test Status

- Login endpoint accepts valid seeded admin credentials.
- JWT token is returned by the backend.
- JWT token authorizes protected admin endpoints.
- User registration returns an authenticated user token.
- No token values were printed or documented.

## Admin Authorization Status

- Admin dashboard authorization passed.
- Admin category creation passed.
- Admin product creation passed.
- Admin order listing passed.
- Admin order status update passed.

## Product/Category CRUD Status

- Category list endpoint passed.
- Product list endpoint passed.
- Admin category create endpoint passed.
- Admin product create endpoint passed.
- Product detail endpoint passed.
- Update/delete were not re-run in this QA pass to avoid unnecessary test data churn; they remain covered by the implemented admin UI/API foundation.

## Cart/Checkout Status

- Authenticated user cart add passed.
- Authenticated user cart retrieval passed.
- Checkout created an order successfully.
- Checkout created order items successfully.
- Checkout cleared the user's cart.
- Checkout reduced product stock and prevented negative-stock behavior for the tested path.

## Order Management Status

- User order history returned the created order.
- User order detail returned only the authenticated user's own order.
- Admin order listing returned the created order.
- Admin status update changed the order to an allowed status.

## Build Status

- Backend build: passed with 0 warnings and 0 errors.
- Frontend TypeScript build: passed.
- Frontend Vite production build: passed when run outside the sandbox.
- Sandbox note: Vite dev/build initially failed with Windows `spawn EPERM` while loading `vite.config.ts`. This was an execution-environment restriction, not a project compile error.

## Fixes Applied During QA

- Created `frontend/gulhan-kahvalti-client/.env` with the local backend API URL.

## Known Issues

- Full browser interaction was validated with minimal route/runtime checks, not a complete automated browser test suite.
- Update/delete product and category endpoints were not re-executed in this QA pass to avoid unnecessary local database mutations.
- Demo seed must remain disabled in production.
- Real payment, notifications, analytics, coupons, and SaaS multi-tenant behavior remain intentionally out of scope.

## Next Deployment Steps

1. Set Render backend environment variables:
   - `ASPNETCORE_ENVIRONMENT=Production`
   - `ASPNETCORE_URLS=http://+:10000`
   - `ConnectionStrings__GulhanDatabase`
   - `Jwt__Key`
   - `Jwt__Issuer`
   - `Jwt__Audience`
   - `Frontend__BaseUrl`
   - `DemoSeed__Enabled=false`
2. Deploy the backend using `backend/GulhanKahvalti.API/Dockerfile`.
3. Set the frontend production variable:

```text
VITE_API_BASE_URL=https://<backend-service>.onrender.com/api
```

4. Deploy the frontend to Vercel or Render Static Site.
5. Run the same smoke flow against the deployed URLs.
