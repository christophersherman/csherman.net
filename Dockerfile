# Dockerfile

# ---- Build Stage ----
# Use an official Node runtime as a parent image.
# Node 20 LTS for longer support.
FROM node:20-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
# This leverages Docker's layer caching. These files change less often than source code.
COPY package*.json ./

# Install project dependencies using 'ci' for consistency and speed in CI/CD environments
RUN npm ci

# Copy the rest of the application's source code
COPY . .

# Build the application for production
# This command typically creates a 'build' or 'dist' folder with static assets.
RUN npm run build

# ---- Production Stage ----
# Use a lightweight Nginx image to serve the static files
FROM nginx:stable-alpine

# Nginx configuration for Single Page Applications (SPA)
# Copy a custom nginx configuration file (we'll create this next)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set the working directory for Nginx
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy the built static files from the 'build' stage to the Nginx html directory
COPY --from=build /app/build .

# Expose port 80 to the outside world
EXPOSE 80

# Command to run nginx in the foreground when the container launches
CMD ["nginx", "-g", "daemon off;"]
