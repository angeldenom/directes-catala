# Fase de construcció
FROM node:18-alpine AS builder

WORKDIR /app

# Copiem package.json i package-lock.json (si existeix)
COPY package*.json ./

# Instal·lem les dependències
RUN npm install

# Copiem el codi de l'aplicació
COPY . .

# Construïm l'aplicació
RUN npm run build

# Fase de producció
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Copiem les dependències del node_modules des de la fase de construcció
COPY --from=builder /app/node_modules ./node_modules

# Copiem el build de l'aplicació
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 3000

# Executem l'aplicació
CMD ["npm", "start"]
