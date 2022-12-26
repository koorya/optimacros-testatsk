FROM node:18.10

WORKDIR /app

COPY package*.json .

COPY tsconfig*.json .

RUN npm ci --omit=dev

COPY src .

RUN npm run build

CMD npm start


