# Production Environment Variables

This file lists the required production environment variables for Render + Neon.

## Backend API

Set these on the Render backend Web Service.

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

Notes:

- Do not commit real values.
- `JWT__Key` should be generated specifically for production and rotated if exposed.
- `DemoSeed__Enabled` must be `false` in production.
- `Frontend__BaseUrl` must exactly match the deployed frontend origin, without a trailing path.
- `ConnectionStrings__GulhanDatabase` should include Neon SSL settings.

## Frontend Client

Set this on the Render Static Site.

```text
VITE_API_BASE_URL=https://<backend-service>.onrender.com/api
```

Vite embeds this value at build time, so rebuild the frontend after changing it.

## Local Development Contrast

Local development may use:

```text
VITE_API_BASE_URL=http://localhost:5064/api
```

Local backend secrets belong in `appsettings.Development.json` or user secrets, not in committed production docs.
