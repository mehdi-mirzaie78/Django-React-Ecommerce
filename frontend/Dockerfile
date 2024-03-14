FROM node:21

WORKDIR /app

COPY . .
RUN npm cache clean -force
RUN npm install -force

EXPOSE 3000

CMD ["npm", "run", "build"]
