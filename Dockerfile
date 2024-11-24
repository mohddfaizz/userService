
FROM node:22-slim


WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

EXPOSE 3000


CMD ["node", "app.js"]