FROM registry.morpheo.io/caddy

EXPOSE 8000

COPY build/frontend /var/www/html
