FROM node:18 AS builder
WORKDIR /app
COPY package.json yarn.lock ./
COPY packages/backend/package.json ./packages/backend/package.json
COPY packages/frontend/package.json ./packages/frontend/package.json
RUN yarn install
COPY . .
RUN yarn prisma generate
RUN yarn build

FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.lock ./
COPY packages/backend/package.json ./packages/backend/package.json
COPY packages/frontend/package.json ./packages/frontend/package.json
COPY prisma ./prisma
RUN yarn install --production
COPY --from=builder /app/build .
CMD yarn prisma migrate deploy; node backend
