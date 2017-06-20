#!/bin/sh

escaped_orchestrator_password=$(echo $ORCHESTRATOR_PASSWORD | sed 's/\$/\\$/g; s/\\/\\\\/g; s/\//\\\//g; s/\./\\./g; s/\*/\\*/g; s/\[/\\[/g; s/\]/\\]/g;')
escaped_storage_password=$(echo $STORAGE_PASSWORD | sed 's/\$/\\$/g; s/\\/\\\\/g; s/\//\\\//g; s/\./\\./g; s/\*/\\*/g; s/\[/\\[/g; s/\]/\\]/g;')

find /var/www/html -type f -iname '*.js' -exec sed -i 's/__orchestrator_user__/'"$ORCHESTRATOR_USER"'/g' "{}" +;
find /var/www/html -type f -iname '*.js' -exec sed -i 's/__orchestrator_pass__/'"$escaped_orchestrator_password"'/g' "{}" +;

find /var/www/html -type f -iname '*.js' -exec sed -i 's/__storage_user__/'"$STORAGE_USER"'/g' "{}" +;
find /var/www/html -type f -iname '*.js' -exec sed -i 's/__storage_pass__/'"$escaped_storage_password"'/g' "{}" +;


exec "/usr/bin/caddy" "$@"
