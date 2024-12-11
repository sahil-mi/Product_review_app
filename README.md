# E-commerce Product Review and Rating Platform
This project is a full-stack web application that uses Django for the backend and ReactJS for the frontend. 

## How to run
You can run this project directly taking clone or can be easily run with Docker.

### 1.With Docker
  backend : 
  ```shell  
  docker pull sahilmullathil/vonnue_backend
  ```
  frontend : 
  ```shell 
  docker pull sahilmullathil/vonnue_frontend
  ```
  Build and Run
  ``` shell 
  docker-compose build
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



