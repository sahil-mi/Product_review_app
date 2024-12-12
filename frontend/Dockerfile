# Step 1: Use Node.js image to build the React app
FROM node:16-slim as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy the rest of the app's files
COPY frontend/ .

# Build the React app for production
RUN npm run build

# Step 2: Use Nginx to serve the build
FROM nginx:alpine

# Copy the build output from the previous step to the nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the React app
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
