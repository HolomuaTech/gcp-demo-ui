# Stage 1 - the build process
FROM node:18 AS build
ARG REACT_APP_API_BAS
ENV REACT_APP_API_BASE=$REACT_APP_API_BASE
WORKDIR /usr/src/app
COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm npm install
COPY public ./public
COPY src ./src
COPY tsconfig.json .
RUN npm run build

# Stage 2 - the production environment
FROM nginx:1.17.9-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Add the custom Nginx config to make it listen on port 8080
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 instead of 80
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
