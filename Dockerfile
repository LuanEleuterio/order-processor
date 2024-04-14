
FROM node:18-alpine
RUN if ! command -v yarn &> /dev/null; then \
    npm install -g yarn; \
fi
RUN yarn global add @nestjs/cli
WORKDIR /app
COPY . .
RUN yarn install --production
EXPOSE 3000
CMD ["yarn", "start"]
