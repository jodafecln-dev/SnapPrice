# Multi-stage Dockerfile for SnapPrice MX Full-Stack (Vite + Express)
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json* bun.lock* ./

# Install all dependencies
RUN npm install

# Copy source files
COPY . .

# Build Vite client bundles
RUN npm run build

# Production runtime stage
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy manifests and install production dependencies only
COPY package.json ./
RUN npm install --omit=dev

# Copy built frontend assets and server source
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/metadata.json ./
COPY --from=builder /app/firebase-applet-config.json ./
COPY --from=builder /app/src/firebase-config.json ./src/firebase-config.json

EXPOSE 3000

CMD ["npx", "tsx", "server.ts"]
