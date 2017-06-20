FROM registry.morpheo.io/caddy

EXPOSE 8000

ADD inject_vars_and_run.sh /inject_vars_and_run.sh
COPY build/frontend /var/www/html

ENTRYPOINT ["/inject_vars_and_run.sh"]
CMD ["--conf", "/etc/Caddyfile", "--log", "stdout"]
