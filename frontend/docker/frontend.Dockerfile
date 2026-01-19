FROM node:18-alpine


WORKDIR /app

RUN apk add --no-cache git

# Enable corepack to use pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy frontend source
COPY ai-career-canvas/ ./

# Install and build
RUN pnpm install --frozen-lockfile
RUN pnpm build

# Install a small static server
RUN pnpm add -g serve

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
