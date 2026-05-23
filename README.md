# Gulhan Kahvalti MVP

Full-stack restaurant showcase and demo e-commerce/order MVP for Gulhan Kahvalti.

`gulhan.md` is the source of truth for architecture and scope. This project intentionally stays MVP-focused: product/category management, JWT authentication, cart, checkout without payment, stock reduction, order history, and admin order management.

## Architecture

```text
React + TypeScript frontend
        |
        | Axios HTTP requests
        v
ASP.NET Core Web API
        |
        | Entity Framework Core
        v
Neon PostgreSQL
```

## Tech Stack

Backend:

- ASP.NET Core Web API (.NET 8)
- Entity Framework Core
- PostgreSQL / Neon
- JWT authentication
- Role-based authorization
- Repository and service layers
- Swagger in Development only

Frontend:

- React
- TypeScript
- Vite
- TailwindCSS
- Framer Motion
- React Router
- Axios

Deployment target:

- Backend: Render Web Service
- Frontend: Render Static Site or Vercel
- Database: Neon PostgreSQL

## Project Structure

```text
backend/GulhanKahvalti.API      ASP.NET Core API
frontend/gulhan-kahvalti-client React client
docs/                           Setup, smoke test, QA, and deployment docs
gulhan.md                       Technical reference
```

## Local Setup

### Backend

```bash
cd backend/GulhanKahvalti.API
dotnet restore
dotnet run
```

Required local configuration is read from `appsettings.Development.json` or environment variables:

```json
{
  "ConnectionStrings": {
    "GulhanDatabase": "<local or Neon PostgreSQL connection string>"
  },
  "Jwt": {
    "Key": "<local development JWT secret>",
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

`appsettings.Development.json` is ignored by git because it may contain local database credentials.

Swagger is available only in Development:

```text
http://localhost:5064/swagger
```

Health check:

```text
GET /health
```

### Frontend

```bash
cd frontend/gulhan-kahvalti-client
npm install
npm run dev
```

Create `frontend/gulhan-kahvalti-client/.env`:

```text
VITE_API_BASE_URL=http://localhost:5064/api
```

## Neon Database Setup

Create a Neon PostgreSQL database and use the Npgsql connection string format:

```text
Host=<host>;Database=<database>;Username=<user>;Password=<password>;SSL Mode=Require;Trust Server Certificate=true
```

Run migrations:

```bash
cd backend/GulhanKahvalti.API
dotnet ef database update
```

Current migration:

```text
ProductionMvpReadiness
```

See [local-database-setup.md](docs/local-database-setup.md) for detailed local database setup.

## Demo Seed

Development-only seed support creates:

- Sample categories
- Sample products
- A development admin user

Enable locally only:

```json
"DemoSeed": {
  "Enabled": true,
  "AdminEmail": "admin@gulhankahvalti.com",
  "AdminPassword": "<local development password>"
}
```

Production must use:

```text
DemoSeed__Enabled=false
```

The seeded admin account is for local development/demo only. Do not publish real production admin credentials.

## API Overview

Public:

- `POST /api/Auth/register`
- `POST /api/Auth/login`
- `GET /api/Categories`
- `GET /api/Products`
- `GET /api/Products/{id}`

Authenticated user:

- `GET /api/Auth/me`
- `GET /api/Cart`
- `POST /api/Cart/add`
- `PUT /api/Cart/update/{id}`
- `DELETE /api/Cart/remove/{id}`
- `DELETE /api/Cart/clear`
- `POST /api/Orders/checkout`
- `GET /api/Orders/my-orders`
- `GET /api/Orders/{id}`

Admin:

- `POST /api/Categories`
- `PUT /api/Categories/{id}`
- `DELETE /api/Categories/{id}`
- `POST /api/Products`
- `PUT /api/Products/{id}`
- `DELETE /api/Products/{id}`
- `GET /api/Admin/dashboard`
- `GET /api/Admin/orders`
- `PUT /api/Admin/orders/{id}/status`

## Demo Flow

1. Open the frontend home page.
2. Register or login.
3. Browse `/menu`.
4. Open a product detail page.
5. Add a product to cart.
6. View `/cart`.
7. Submit checkout without payment.
8. View `/my-orders`.
9. Login as a development admin.
10. Manage products, categories, and order statuses in `/admin`.

## Render Backend Deployment

Recommended deployment path: Docker Web Service.

- Root directory: `backend/GulhanKahvalti.API`
- Dockerfile: `backend/GulhanKahvalti.API/Dockerfile`
- Health check path: `/health`

Required backend environment variables:

```text
ASPNETCORE_ENVIRONMENT=Production
ASPNETCORE_URLS=http://+:10000
ConnectionStrings__GulhanDatabase=<Neon PostgreSQL connection string>
Jwt__Key=<strong random secret>
Jwt__Issuer=GulhanKahvaltiAPI
Jwt__Audience=GulhanKahvaltiClient
Frontend__BaseUrl=https://<frontend-service>.onrender.com
DemoSeed__Enabled=false
```

Apply migrations before production traffic:

```bash
cd backend/GulhanKahvalti.API
dotnet ef database update
```

See [render-backend-deployment.md](docs/render-backend-deployment.md).

## Render Frontend Deployment

Render Static Site settings:

- Root directory: `frontend/gulhan-kahvalti-client`
- Build command: `npm install && npm run build`
- Publish directory: `dist`

Required frontend environment variable:

```text
VITE_API_BASE_URL=https://<backend-service>.onrender.com/api
```

For React Router browser routes, configure a rewrite:

```text
/*  /index.html  200
```

See [render-frontend-deployment.md](docs/render-frontend-deployment.md).

## Environment Variables

Production variables are documented in [production-env-vars.md](docs/production-env-vars.md).

Never commit:

- Real Neon connection strings
- Production JWT secrets
- Production admin credentials
- `.env`
- `appsettings.Production.json`

## Validation

Backend:

```bash
cd backend/GulhanKahvalti.API
dotnet build
```

Frontend:

```bash
cd frontend/gulhan-kahvalti-client
npm run build
```

Local QA status is documented in [local-qa-report.md](docs/local-qa-report.md).

## Current MVP Status

Implemented:

- JWT login/register
- Admin/User role authorization
- Product and category CRUD
- Public product browsing
- Cart add/update/remove/clear
- Checkout without payment
- Stock reduction during checkout
- User order history
- Admin order status management
- Neon PostgreSQL + EF Core migrations
- Render deployment foundation

Out of scope:

- Real payment processing
- Email notifications
- Coupons
- Analytics
- SaaS multi-tenant architecture
