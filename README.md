# MongoDB Integration Outline

## 1. Goal
- Replace current browser-local data flow with a MongoDB-backed API.
- Keep existing UI/UX and page routes unchanged as much as possible.

## 2. Target Architecture
- Frontend: existing HTML/CSS/JS pages in this repo.
- Backend: Node.js + Express REST API.
- Database: MongoDB Atlas (cloud) or local MongoDB for development.
- Data access layer: Mongoose models and service functions.

## 3. Core Collections
- `users`: customer accounts, roles (`customer`, `seller`, `admin`), profile info.
- `sellers`: seller metadata, business details, approval status.
- `products`: catalog items, price, stock, category, media, seller reference.
- `carts`: user cart items with quantity, size, and color variants.
- `wishlists`: saved product references by user.
- `orders`: checkout snapshot, totals, status timeline, payment reference.
- `applications`: seller onboarding applications and review notes.

## 4. API Surface (First Pass)
- `POST /auth/register`, `POST /auth/login`
- `GET /products`, `GET /products/:id`
- `POST /products` (seller/admin), `PUT /products/:id`, `DELETE /products/:id`
- `GET /cart`, `POST /cart/items`, `PATCH /cart/items/:itemId`, `DELETE /cart/items/:itemId`
- `GET /wishlist`, `POST /wishlist/items`, `DELETE /wishlist/items/:productId`
- `POST /orders`, `GET /orders/me`, `GET /admin/orders`
- `POST /applications`, `GET /admin/applications`, `PATCH /admin/applications/:id`

## 5. Security and Validation
- JWT-based authentication with refresh strategy.
- Password hashing with bcrypt.
- Role-based access control for seller/admin routes.
- Request validation using `zod` or `joi` before DB operations.
- Rate limiting and basic abuse protection on auth endpoints.

## 6. Migration Plan
- Step 1: Introduce backend project (`/server`) without changing frontend behavior.
- Step 2: Mirror current `DB` operations in API endpoints.
- Step 3: Seed MongoDB with fallback products from `JS/db.js`.
- Step 4: Replace local `Store.get/Store.set` calls with fetch-based API client functions.
- Step 5: Keep temporary local fallback mode behind a feature flag for rollback.
- Step 6: Remove deprecated local-only data logic after endpoint parity is verified.

## 7. Environment and Config
- `MONGODB_URI` for database connection.
- `JWT_SECRET` and `JWT_EXPIRES_IN` for auth.
- `PORT`, `NODE_ENV`, and allowed CORS origins.
- Separate `.env` values for local, staging, and production.

## 8. Testing and Readiness
- Unit tests for models and service logic.
- API tests for auth, products, cart, wishlist, and orders.
- Smoke test all current pages against live API responses.
- Add basic monitoring/logging for DB errors and slow queries.

## 9. Open Decisions
- MongoDB Atlas only vs Atlas + local Docker setup.
- Whether to support guest carts before login.
- Payment provider and order status lifecycle design.
- Image storage strategy (MongoDB URLs vs object storage integration).
