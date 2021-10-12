FROM node:latest

WORKDIR /var/www

COPY ./package*.json /var/www/
RUN npm install
COPY . /var/www/

EXPOSE 3000

CMD ["npm", "start"]