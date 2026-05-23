# Local Database Setup

This project uses Entity Framework Core with PostgreSQL and is compatible with Neon PostgreSQL.

## 1. Create a Neon PostgreSQL Database

1. Go to Neon and create a new project.
2. Create or select a database for this MVP, for example `gulhan_kahvalti`.
3. Copy the pooled or direct PostgreSQL connection string.
4. Keep the connection string private. Do not commit it.

Neon connection strings usually look like this:

```text
Host=<host>;Database=<database>;Username=<user>;Password=<password>;SSL Mode=Require;Trust Server Certificate=true
```

## 2. Configure the Backend Locally

Open:

```text
backend/GulhanKahvalti.API/appsettings.Development.json
```

Set:

```json
"ConnectionStrings": {
  "GulhanDatabase": "<your PostgreSQL or Neon connection string>"
}
```

The application reads this exact key:

```text
ConnectionStrings:GulhanDatabase
```

For Render or other environment-variable based hosting, use:

```text
ConnectionStrings__GulhanDatabase=<your Neon connection string>
```

## 3. Run Migrations

From the backend project folder:

```bash
cd backend/GulhanKahvalti.API
dotnet ef database update
```

This applies the existing migration:

```text
ProductionMvpReadiness
```

Do not run destructive commands like `database drop` unless you intentionally want to delete the database.

## 4. Enable Demo Seed Locally

Demo seed is disabled by default.

To enable it locally only, set:

```json
"DemoSeed": {
  "Enabled": true,
  "AdminEmail": "admin@gulhankahvalti.com",
  "AdminPassword": "<local development password>"
}
```

Then run the backend:

```bash
dotnet run
```

The seed creates:

- Sample categories
- Sample products
- A development admin user

Do not enable demo seed in production.

## 5. Verify Tables

After `dotnet ef database update`, verify that these tables exist:

- `Users`
- `Categories`
- `Products`
- `CartItems`
- `Orders`
- `OrderItems`
- `__EFMigrationsHistory`

You can verify with a SQL client or Neon SQL editor:

```sql
select table_name
from information_schema.tables
where table_schema = 'public'
order by table_name;
```

Verify applied migrations:

```sql
select * from "__EFMigrationsHistory";
```
