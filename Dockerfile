# Build stage
FROM oven/bun:1 AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
RUN bunx playwright install --with-deps chromium
COPY . ./
RUN bun run build

# Production stage
FROM debian:bookworm-slim AS runner
WORKDIR /app

COPY --from=builder /usr/lib/x86_64-linux-gnu /usr/lib/x86_64-linux-gnu
COPY --from=builder /lib/x86_64-linux-gnu /lib/x86_64-linux-gnu
COPY --from=builder /root/.cache/ms-playwright /root/.cache/ms-playwright
COPY --from=builder /app/server ./server

RUN chmod +x ./server

ENV NODE_ENV=production
ENV DEBUG_IN_BROWSWE=false
EXPOSE 3000

# Health check (adjust endpoint as needed)
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["./server"]