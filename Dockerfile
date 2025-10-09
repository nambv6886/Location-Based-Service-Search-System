# Stage 1: Build
FROM node:22-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:22-alpine AS production-stage
WORKDIR /app

RUN apk add --no-cache netcat-openbsd

# Copy only the build artifacts and essential files from the build stage
COPY --from=build-stage /app/dist ./dist
COPY --from=build-stage /app/package*.json ./

# Copy entrypoint script
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Install only production dependencies
RUN npm install --only=production

# Expose the application port
EXPOSE 3000

# Define the command to run the app
CMD ["./entrypoint.sh"]