# Pull official base image
FROM node:14-alpine AS BUILD_IMAGE

# Set working directory
WORKDIR /usr/src/app

# Copy package.json & package-lock.json files
COPY package*.json ./

# Install NPM packages
RUN npm install

# Copy source files
COPY . .

# Build
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Main Image
FROM nginx:alpine 
# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# Copy from build image
COPY --from=BUILD_IMAGE  /usr/src/app/build /usr/share/nginx/html

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh

EXPOSE 80

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]