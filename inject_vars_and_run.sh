#!/bin/sh

find /var/www/html -type f -iname '*.js' -exec sed -i 's/__user__/'"$NOTEBOOK_SERVICES_USER"'/g' "{}" +;
find /var/www/html -type f -iname '*.js' -exec sed -i 's/__pass__/'"$NOTEBOOK_SERVICES_PASSWORD"'/g' "{}" +;

exec "/usr/bin/caddy" "$@"
