# Stage 1 - the build process
FROM node:18 AS build
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
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Build: 
#   docker build -t supermongol/hello-world-k8s-ui .
# Push: 
#   docker push supermongol/hello-world-k8s-ui
# Run local: 
#   docker run -p 80:80 supermongol/hello-world-k8s-ui