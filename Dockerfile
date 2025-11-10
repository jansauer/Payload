FROM node:24.11.0-slim AS base

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS builder

# Check node version
COPY .node-version ./
RUN grep -q $(node -v | cut -c2-) .node-version

COPY . .

RUN npm ci
RUN npm run build

FROM base AS runner

USER node

COPY --from=builder /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

ENV NODE_ENV=production

ENV PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]
