FROM node:10.15.0

RUN apt-get update || true
RUN mkdir -p /var/www

RUN npm install -g forever

COPY . /var/www
WORKDIR /var/www

RUN npm install --production

EXPOSE 8010
EXPOSE 80