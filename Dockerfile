FROM nginx:alpine

# Copy custom nginx.conf to the container
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./index.html /usr/share/nginx/html/index.html

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Start Nginx using the custom configuration
CMD ["nginx", "-g", "daemon off;"]

