# Render Frontend Deployment

This guide deploys the React + Vite client as a Render Static Site.

## Static Site Setup

- Render service type: Static Site
- Root directory: `frontend/gulhan-kahvalti-client`
- Build command:

```bash
npm install && npm run build
```

- Publish directory:

```text
dist
```

## Required Environment Variables

Set this in the Render Static Site environment:

```text
VITE_API_BASE_URL=https://<backend-service>.onrender.com/api
```

Do not use localhost in production.

## SPA Routing

React Router uses browser routes such as `/menu`, `/cart`, and `/admin/orders`.

Configure Render rewrites so all non-asset routes serve `index.html`:

```text
/*  /index.html  200
```

Without this rewrite, direct refreshes on nested frontend routes can return 404.

## Deployment Check

After deploy:

1. Open the frontend URL.
2. Confirm public routes load:
   - `/`
   - `/menu`
   - `/products/{id}`
3. Register or login.
4. Confirm protected routes redirect correctly:
   - `/cart`
   - `/checkout`
   - `/my-orders`
5. Login as an admin and confirm:
   - `/admin`
   - `/admin/products`
   - `/admin/categories`
   - `/admin/orders`

If API calls fail, verify `VITE_API_BASE_URL` and backend CORS `Frontend__BaseUrl`.
