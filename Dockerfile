FROM node:lts

WORKDIR /usr/share/app

COPY package*.json ./

RUN ["npm","ci"]

COPY . .

RUN ["npx" ,"prisma" ,"generate"]

RUN [ "npm","run" ,"build" ]

EXPOSE 3000

CMD ["npm","start"]