# Final Deployment Checklist

Use this checklist for the final GitHub push and manual Render + Neon deployment. Do not commit secrets and do not run destructive database commands.

## 1. GitHub Push Steps

1. Confirm you are in the project folder:

```bash
cd GulhanKahvalti
```

2. If this project is not already its own Git repository, initialize it from the project folder:

```bash
git init
```

3. Confirm ignored files are not staged:

```bash
git status --ignored
```

Do not stage:

- `.env`
- `appsettings.Development.json`
- `appsettings.Production.json`
- `bin/`
- `obj/`
- `node_modules/`
- `dist/`

4. Stage source and documentation:

```bash
git add .
```

5. Review staged files before committing:

```bash
git diff --cached --name-only
```

6. Commit:

```bash
git commit -m "Prepare MVP for Render deployment"
```

7. Create a GitHub repository and push:

```bash
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

## 2. Render Backend Deployment Steps

1. Create a Render Web Service.
2. Connect the GitHub repository.
3. Use Docker deployment.
4. Set root directory:

```text
backend/GulhanKahvalti.API
```

5. Confirm Dockerfile path:

```text
backend/GulhanKahvalti.API/Dockerfile
```

6. Set health check path:

```text
/health
```

7. Add all backend environment variables from this checklist.
8. Deploy the service.
9. Verify logs show the API started in `Production`.

## 3. Render Frontend Deployment Steps

1. Create a Render Static Site.
2. Connect the same GitHub repository.
3. Set root directory:

```text
frontend/gulhan-kahvalti-client
```

4. Set build command:

```bash
npm install && npm run build
```

5. Set publish directory:

```text
dist
```

6. Add the frontend environment variable:

```text
VITE_API_BASE_URL=https://<backend-service>.onrender.com/api
```

7. Configure SPA rewrite:

```text
/*  /index.html  200
```

8. Deploy the static site.

## 4. Neon Production Connection Steps

1. Create or select the Neon production project.
2. Create the production database.
3. Copy the PostgreSQL connection string.
4. Convert it to Npgsql-style format if needed:

```text
Host=<host>;Database=<database>;Username=<user>;Password=<password>;SSL Mode=Require;Trust Server Certificate=true
```

5. Store it only in Render as:

```text
ConnectionStrings__GulhanDatabase=<value>
```

6. Apply migrations before production traffic:

```bash
cd backend/GulhanKahvalti.API
dotnet ef database update
```

Use the production Neon connection string only in a secure local shell or one-off migration environment.

## 5. Required Environment Variables

Backend Render Web Service:

```text
ASPNETCORE_ENVIRONMENT=Production
ASPNETCORE_URLS=http://+:10000
ConnectionStrings__GulhanDatabase=<Neon PostgreSQL connection string>
JWT__Key=<strong random secret, at least 32 characters>
JWT__Issuer=GulhanKahvaltiAPI
JWT__Audience=GulhanKahvaltiClient
Frontend__BaseUrl=https://<frontend-service>.onrender.com
DemoSeed__Enabled=false
```

Frontend Render Static Site:

```text
VITE_API_BASE_URL=https://<backend-service>.onrender.com/api
```

## 6. Health Check Verification

After backend deploy, open:

```text
https://<backend-service>.onrender.com/health
```

Expected response:

```json
{
  "status": "ok"
}
```

If the health check fails, inspect Render logs first for missing environment variables or database connection errors.

## 7. Production Smoke Tests

Run these after both services are live:

1. Open frontend home page.
2. Open `/menu` and confirm products load.
3. Register a test user.
4. Login.
5. Open a product detail page.
6. Add product to cart.
7. Open `/cart`.
8. Submit checkout.
9. Open `/my-orders`.
10. Login as a production admin account.
11. Open `/admin`.
12. Create a category.
13. Create a product.
14. Open `/admin/orders`.
15. Update an order status.

Do not use development seed credentials in production.

## 8. Common Deployment Issues

- `401` on protected endpoints: check `JWT__Key`, `JWT__Issuer`, and `JWT__Audience` match backend configuration.
- Browser CORS error: check backend `Frontend__BaseUrl` exactly matches the frontend origin.
- Frontend calls localhost: check `VITE_API_BASE_URL` and rebuild the frontend.
- Backend fails on startup: check `ConnectionStrings__GulhanDatabase`, JWT variables, and Render logs.
- Direct refresh on `/admin/orders` returns 404: configure the Render static site rewrite to `/* /index.html 200`.
- Database tables missing: apply EF Core migrations to the production Neon database.
- Demo data appears in production: set `DemoSeed__Enabled=false` and verify `ASPNETCORE_ENVIRONMENT=Production`.

## 9. Rollback Guidance

1. In Render, use the previous successful deploy from the service deploy history.
2. Do not roll back database migrations destructively unless you have a tested backup and rollback plan.
3. If a frontend-only issue occurs, roll back the Static Site deploy first.
4. If an API issue occurs, roll back the Web Service deploy and review logs.
5. Rotate secrets immediately if a secret was exposed.

## 10. Final Presentation/Demo Checklist

Before presenting:

- Backend health endpoint returns `ok`.
- Frontend opens on the production URL.
- Public menu loads products.
- Register/login works.
- Cart and checkout work without payment.
- My orders shows the created order.
- Admin routes require admin access.
- Admin can manage categories/products/orders.
- Demo seed is disabled in production.
- Development seed admin password is local configuration only.
- No real secrets appear in GitHub.
- README and docs are visible in the repository.
