ARG NODE_VERSION=26-alpine3.23

# Install dependencies

FROM node:${NODE_VERSION} AS dependencies

WORKDIR /app

COPY package*.json ./

RUN npm ci --no-audit --no-fund

# Build in standalone mode

FROM node:${NODE_VERSION} AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

ENV NODE_ENV=production

# Values from build args
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_UI_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NEXT_PUBLIC_UI_BASE_URL=${NEXT_PUBLIC_UI_BASE_URL}

RUN npm run build

# Run application

FROM node:${NODE_VERSION} AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY --from=builder --chown=node:node /app/public ./public

RUN mkdir .next
RUN chown node:node .next

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3000

CMD ["node", "server.js"]

# References
# https://docs.docker.com/guides/nextjs
# https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile