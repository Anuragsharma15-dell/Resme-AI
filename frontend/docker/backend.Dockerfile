FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache git

# Copy backend source
COPY backned/backend/backend/ ./

# Enable corepack and install dependencies (supports pnpm/npm)
RUN corepack enable && corepack prepare pnpm@latest --activate || true
RUN if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile || true; else npm install || true; fi

EXPOSE 5000
CMD ["node", "index.js"]
