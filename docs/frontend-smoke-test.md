# Frontend Smoke Test

Use this checklist after the backend is running and reachable.

## 1. Create Frontend Environment File

Create:

```text
frontend/gulhan-kahvalti-client/.env
```

Set the API URL:

```text
VITE_API_BASE_URL=http://localhost:<backend-port>/api
```

Example:

```text
VITE_API_BASE_URL=http://localhost:5064/api
```

Use the actual backend URL printed by `dotnet run`.

## 2. Run Frontend

```bash
cd frontend/gulhan-kahvalti-client
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

## 3. Test Flow

### Home

Open:

```text
/
```

Verify:

- Page renders
- Navbar is visible
- Menu link works

### Register

Open:

```text
/register
```

Register a test user.

Verify:

- User is redirected after success
- JWT and user session are stored for MVP local testing

### Login

Open:

```text
/login
```

Login with a registered user.

Verify:

- Navbar shows authenticated links
- Cart and My Orders links are visible

### Menu

Open:

```text
/menu
```

Verify:

- Products load from backend
- Empty state appears if no products exist
- Out-of-stock products cannot be added to cart

### Product Detail

Open a product card.

Verify:

- Name, category, description, price, stock status render
- Add-to-cart works for authenticated users

### Cart

Open:

```text
/cart
```

Verify:

- Cart items load
- Quantity update works
- Remove item works
- Clear cart works
- Total price recalculates

### Checkout

Open:

```text
/checkout
```

Submit:

- Name
- Phone
- Address
- Optional note

Verify:

- Checkout creates an order
- Cart becomes empty
- Success state appears

### My Orders

Open:

```text
/my-orders
```

Verify:

- Authenticated user's orders appear
- Order items, status, total, and date are visible

### Admin Pages

Login as an admin user.

Open:

```text
/admin
/admin/products
/admin/categories
/admin/orders
```

Verify:

- Admin route is protected
- Product CRUD works
- Category CRUD works
- Orders list appears
- Status dropdown updates order status

## 4. Production Build Check

```bash
npm run build
```

Expected:

- TypeScript passes
- Vite production build completes
