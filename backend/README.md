
### Admin Dashboard
- `/admin/` →  Admin Dashboard

### Api Endpoints

  ## Admin Product Endpoints
- `/admin/product/product/` → Product List
- `/admin/product/product/<path:object_id>/` → Product view
- `/admin/product/product/<path:object_id>/change/` → Change Product
- `/admin/product/product/<path:object_id>/delete/` → Delete Product
- `/admin/product/product/<path:object_id>/history/` → Product History
- `/admin/product/product/add/` → Add Product

  ## Signup Endpoint
- `/signup/` → User Signup

  ## Token Endpoints
- `/api/token/` → Obtain Token
- `/api/token/refresh/` → Refresh Token


  ## Product Endpoints
- `/api/product/` → List Products
- `/api/product/<pk>/` → Product Detail


  ## Rating and Review Endpoints
- `/api/rating-and-review/` → List Reviews
- `/api/rating-and-review/create/` → Create Review
- `/api/rating-and-review/delete/<int:pk>/` → Delete Review
- `/api/rating-and-review/update/<int:pk>/` → Update Review


