FROM alpine:3.4
MAINTAINER Guillaume Cisco <guillaume@rythm.co>

LABEL caddy_version="0.9.5" architecture="amd64"

RUN apk add --no-cache tar curl

RUN curl --silent --show-error --fail --location \
--header "Accept: application/tar+gzip, application/x-gzip, application/octet-stream" -o - \
"https://caddyserver.com/download/linux/amd64?plugins=http.expires" \
| tar --no-same-owner -C /usr/bin/ -xz caddy \
&& chmod 0755 /usr/bin/caddy \
&& /usr/bin/caddy -version

RUN apk del tar curl && rm -rf /var/cache/apk/*

EXPOSE 8000

COPY Caddyfile /etc/Caddyfile
COPY build/frontend /var/www/html
ENTRYPOINT ["/usr/bin/caddy"]
CMD ["--conf", "/etc/Caddyfile", "--log", "stdout"]
