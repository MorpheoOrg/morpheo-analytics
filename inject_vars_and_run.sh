#!/bin/sh

escaped_password=$(echo $NOTEBOOK_SERVICES_PASSWORD | sed 's/\$/\\$/g; s/\\/\\\\/g; s/\//\\\//g; s/\./\\./g; s/\*/\\*/g; s/\[/\\[/g; s/\]/\\]/g;')

find /usr/src/app -type f -iname '*.js' -exec sed -i 's/__user__/'"$NOTEBOOK_SERVICES_USER"'/g' "{}" +;
find /usr/src/app -type f -iname '*.js' -exec sed -i 's/__pass__/'"$escaped_password"'/g' "{}" +;

exec "$@"
