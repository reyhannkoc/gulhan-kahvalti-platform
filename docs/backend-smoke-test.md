# Backend Smoke Test

Use this checklist after configuring a real PostgreSQL or Neon connection string and applying migrations.

## 1. Run the Backend

```bash
cd backend/GulhanKahvalti.API
dotnet run
```

Open Swagger at the URL shown in the console, usually:

```text
https://localhost:<port>/swagger
```

or:

```text
http://localhost:<port>/swagger
```

## 2. Register a User

Swagger endpoint:

```text
POST /api/Auth/register
```

Example body:

```json
{
  "fullName": "Test User",
  "email": "test@example.com",
  "password": "Test123*"
}
```

Expected result:

- `201 Created`
- Response includes a JWT token
- Response does not expose `passwordHash`

## 3. Login

Swagger endpoint:

```text
POST /api/Auth/login
```

Example body:

```json
{
  "email": "test@example.com",
  "password": "Test123*"
}
```

Copy the `token` value from the response.

## 4. Authorize Swagger

1. Click `Authorize`.
2. Paste:

```text
Bearer <token>
```

3. Confirm authorization.

## 5. Admin Setup

For admin-only endpoints, use a user whose role is `Admin`.

In local development, you can enable demo seed in `appsettings.Development.json`:

```json
"DemoSeed": {
  "Enabled": true
}
```

Then restart the backend and login with the development admin account created by the seeder. Keep seeded credentials development-only.

## 6. Create Category as Admin

Endpoint:

```text
POST /api/Categories
```

Example:

```json
{
  "name": "Serpme Kahvalti",
  "description": "Paylasimlik kahvalti secenekleri"
}
```

Expected:

- `201 Created`

## 7. Create Product as Admin

Endpoint:

```text
POST /api/Products
```

Example:

```json
{
  "name": "Gulhan Serpme Kahvalti",
  "description": "Klasik serpme kahvalti",
  "price": 450,
  "stock": 20,
  "imageUrl": null,
  "isActive": true,
  "categoryId": 1
}
```

Expected:

- `201 Created`
- Product includes category name when fetched

## 8. Add to Cart

Authorize Swagger as a normal authenticated user.

Endpoint:

```text
POST /api/Cart/add
```

Example:

```json
{
  "productId": 1,
  "quantity": 2
}
```

Expected:

- `200 OK`
- Cart item includes product name, unit price, line total

## 9. View Cart

Endpoint:

```text
GET /api/Cart
```

Expected:

- Current user's cart items only

## 10. Checkout

Endpoint:

```text
POST /api/Orders/checkout
```

Example:

```json
{
  "customerName": "Test User",
  "customerPhone": "05555555555",
  "customerAddress": "Test address",
  "note": "Demo order"
}
```

Expected:

- `200 OK`
- Order status is `Pending`
- Order items are created
- Cart is cleared
- Product stock is reduced

## 11. View My Orders

Endpoint:

```text
GET /api/Orders/my-orders
```

Expected:

- Current user's orders only
- Includes order items, product names, quantities, prices, status, created date

## 12. Admin Updates Order Status

Authorize Swagger as admin.

Endpoint:

```text
PUT /api/Admin/orders/{id}/status
```

Allowed statuses:

- `Pending`
- `Preparing`
- `Completed`
- `Cancelled`

Example:

```json
{
  "status": "Preparing"
}
```

Expected:

- `200 OK`
- Updated order status returned
