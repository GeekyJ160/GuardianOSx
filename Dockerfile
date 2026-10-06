FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV NITRO_PRESET=node-server
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV NITRO_HOST=0.0.0.0
COPY --from=build /app/.output ./.output
COPY scripts/container-start.mjs ./scripts/container-start.mjs
EXPOSE 8080
CMD ["node", "scripts/container-start.mjs"]
