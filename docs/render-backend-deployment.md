# Render Backend Deployment

This guide prepares the ASP.NET Core API for Render using Neon PostgreSQL.

## Service Setup

- Render service type: Web Service
- Runtime option: Docker
- Root directory: `backend/GulhanKahvalti.API`
- Dockerfile path: `backend/GulhanKahvalti.API/Dockerfile`
- Health check path: `/health`
- Public port: Render should use the `PORT`/URL binding from `ASPNETCORE_URLS`

The Dockerfile publishes the API and exposes port `10000`.

## Required Environment Variables

Set these in Render. Do not commit real values.

```text
ASPNETCORE_ENVIRONMENT=Production
ASPNETCORE_URLS=http://+:10000
ConnectionStrings__GulhanDatabase=<Neon PostgreSQL connection string>
Jwt__Key=<strong random secret, at least 32 characters>
Jwt__Issuer=GulhanKahvaltiAPI
Jwt__Audience=GulhanKahvaltiClient
Frontend__BaseUrl=https://<frontend-service>.onrender.com
DemoSeed__Enabled=false
```

`JWT__Key`, `JWT__Issuer`, and `JWT__Audience` are also accepted by .NET configuration because configuration keys are matched case-insensitively. Use one naming style consistently.

## Build and Start

When using Docker, Render builds from the Dockerfile, so no custom build command is required.

If using Render native .NET instead of Docker:

```bash
dotnet restore
dotnet publish -c Release -o publish
```

Start command:

```bash
dotnet publish/GulhanKahvalti.API.dll
```

Docker is the recommended path for this project.

## Neon Connection String

Use the Neon PostgreSQL connection string in .NET/Npgsql format:

```text
Host=<host>;Database=<database>;Username=<user>;Password=<password>;SSL Mode=Require;Trust Server Certificate=true
```

Store it only in Render environment variables as:

```text
ConnectionStrings__GulhanDatabase=<value>
```

## Migrations

Apply migrations before production traffic.

Recommended options:

1. Run from a local trusted machine using the production Neon connection string temporarily set in the shell.
2. Run a one-off migration job from a secure environment.

Command:

```bash
cd backend/GulhanKahvalti.API
dotnet ef database update
```

Do not run destructive EF commands against production.

## Production Safety Checks

- Swagger is enabled only in Development.
- Demo seed only runs in Development and must remain disabled in Render.
- API fails startup if production JWT or frontend CORS config is missing.
- `/health` returns a simple health response for Render checks.
