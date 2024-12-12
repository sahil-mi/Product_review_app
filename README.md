# E-commerce Product Review and Rating Platform
This project is a full-stack web application that uses Django for the backend and ReactJS for the frontend. 

## How to run
You can run this project directly taking clone or can be easily run with Docker.

### 1.With Docker
  backend : 
  ```shell  
  docker pull sahilmullathil/product_review_backend
  ```
  frontend : 
  ```shell 
  docker pull sahilmullathil/product_review_frontend
  ```
  Build and Run
  ``` shell 
  docker-compose build
  ```
  ```shell 
docker-compose exec backend python manage.py migrate
```

  ```shell 
docker-compose exec backend python manage.py createsuperuser
```


  ``` shell 
  docker-compose up
  ``` 

### 2.Without Docker
  clone the project
  - **Backend**:
      ```shell
      cd backend/
      python3 -m venv venv
      source ./venv/bin/activate
      pip install -r requirements.txt
      python3 manage.py makemigrations
      python3 manage.py migrate
      python3 manage.py createsuperuser 
      python3 manage.py runserver
      ```

  - **Frontend**:
    ```shell
    cd frontend/
    npm install
    npm start
    ```
### 3 Admin Dashboard
- `/admin/` →  Admin Dashboard
### 4.Api endpoints

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


