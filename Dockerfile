# Build stage
FROM oven/bun:1 AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . ./
RUN bun run build

# Playwright cache stage
FROM oven/bun:1-debian AS playwright-cache
RUN bunx playwright install chromium

# Production stage
FROM oven/bun:1-debian AS runner
WORKDIR /app

COPY --from=builder /app/server ./server
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src/template/assets ./src/template/assets

COPY --from=playwright-cache /root/.cache/ms-playwright /root/.cache/ms-playwright

RUN bunx playwright install-deps chromium

RUN chmod +x ./server

ENV NODE_ENV=production
ENV DEBUG_IN_BROWSER=false
EXPOSE 3000

CMD ["./server"]